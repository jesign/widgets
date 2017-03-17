
Curator.Config.Waterfall = $.extend({}, Curator.Config.Defaults, {
    scroll:'more',
    waterfall: {
        gridWidth:250,
        animate:true,
        animateSpeed:400
    }
});


class Waterfall extends Curator.Client {

    constructor (options) {
        super ();

        this.setOptions (options,  Curator.Config.Waterfall);

        Curator.log("Waterfall->init with options:");
        Curator.log(this.options);

        if (this.init (this)) {
            this.$scroll = $('<div class="crt-feed-scroll"></div>').appendTo(this.$container);
            this.$feed = $('<div class="crt-feed"></div>').appendTo(this.$scroll);
            this.$container.addClass('crt-feed-container');

            if (this.options.scroll=='continuous') {
                $(this.$scroll).scroll(() => {
                    let height = this.$scroll.height();
                    let cHeight = this.$feed.height();
                    let scrollTop = this.$scroll.scrollTop();
                    if (scrollTop >= cHeight - height) {
                        this.loadMorePosts();
                    }
                });
            } else if (this.options.scroll=='none') {
                // no scroll - use javascript to trigger loading
            } else {
                // default to more
                this.$more = $('<div class="crt-feed-more"><a href="#"><span>Load more</span></a></div>').appendTo(this.$scroll);
                this.$more.find('a').on('click',(ev) => {
                    ev.preventDefault();
                    this.loadMorePosts();
                });
            }

            this.$feed.waterfall({
                selector:'.crt-post-c',
                gutter:0,
                width:this.options.waterfall.gridWidth,
                animate:this.options.waterfall.animate,
                animationOptions: {
                    speed: (this.options.waterfall.animateSpeed/2),
                    duration: this.options.waterfall.animateSpeed
                }
            });

            Curator.EventBus.on('crt:filter:change', event => {
                this.$feed.find('.crt-post-c').remove();
            });

            // Load first set of posts
            this.loadPosts(0);
        }
    }

    loadPosts  (page, clear) {
        Curator.log('Waterfall->loadPage');
        if (clear) {
            this.$feed.find('.crt-post-c').remove();
        }
        this.feed.loadPosts(page);
    }

    loadMorePosts  () {
        Curator.log('Waterfall->loadMorePosts');

        this.feed.loadPosts(this.feed.currentPage+1);
    }

    onPostsLoaded (posts) {
        Curator.log("Waterfall->onPostsLoaded");

        let postElements = this.createPostElements (posts);

        //this.$feed.append(postElements);
        this.$feed.waterfall('append', postElements);

        let that = this;
        $.each(postElements,function (i) {
            let post = this;
            if (that.options.waterfall.showReadMore) {
                post.find('.crt-post')
                    .addClass('crt-post-show-read-more');
            }
        });

        this.popupManager.setPosts(posts);

        this.loading = false;
        this.options.onPostsLoaded (this, posts);
    }

    onPostsFailed (data) {
        this.loading = false;
        this.$feed.html('<p style="text-align: center">'+data.message+'</p>');
    }

    destroy  () {
        //this.$feed.slick('unslick');
        this.$feed.remove();
        this.$scroll.remove();
        if (this.$more) {
            this.$more.remove();
        }
        this.$container.removeClass('crt-feed-container');

        delete this.$feed;
        delete this.$scroll;
        delete this.$container;
        delete this.options ;
        delete this.totalPostsLoaded;
        delete this.loading;
        delete this.allLoaded;

        // TODO add code to cascade destroy down to Feed & Posts
        // unregistering events etc
        delete this.feed;
    }
}


Curator.Waterfall = Waterfall;
