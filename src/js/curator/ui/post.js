
import EventBus from '../core/bus';
import SocialFacebook from "../social/facebook";
import SocialTwitter from "../social/twitter";
import Logger from "../core/logger";
import Events from "../core/events";
import Templating from "../core/templating";
import z from "../core/lib";

/**
* ==================================================================
* Post
* ==================================================================
*/


class Post extends EventBus {
    constructor (postJson, options, widget) {
        super();

        this.options = options;
        this.widget = widget;

        let templateId = this.widget.options.templatePost;

        this.json = postJson;
        this.$el = Templating.renderTemplate(templateId, postJson);

        this.$postC = this.$el.find('.crt-post-c');
        this.$image = this.$el.find('.crt-post-image');
        this.$imageContainer = this.$el.find('.crt-image-c');

        this.$el.find('.crt-share-facebook').click(this.onShareFacebookClick.bind(this));
        this.$el.find('.crt-share-twitter').click(this.onShareTwitterClick.bind(this));
        // this.$el.find('.crt-hitarea').click(this.onPostClick.bind(this));
        this.$el.find('.crt-post-read-more-button').click(this.onReadMoreClick.bind(this));
        // this.$el.on('click','.crt-post-text-body a',this.onLinkClick.bind(this));

        this.$postC.click(this.onPostClick.bind(this));

        this.$image.css({opacity:0});

        if (this.json.image) {
            this.$image.on('load', this.onImageLoaded.bind(this));
            this.$image.on('error', this.onImageError.bind(this));
        } else {
            // no image ... call this.onImageLoaded
            window.setTimeout(() => {
                this.setHeight();
            },100);
        }

        if (this.json.image_width > 0) {
            let p = (this.json.image_height/this.json.image_width)*100;
            this.$imageContainer.addClass('crt-image-responsive')
                .css('padding-bottom',p+'%');
        }

        if (this.json.url.indexOf('http') !== 0) {
            this.$el.find('.crt-post-share').hide ();
        }

        this.$image.data('dims',this.json.image_width+':'+this.json.image_height);

        if (this.json.video) {
            this.$el.addClass('crt-post-has-video');
        }

        if (this.json.images && this.json.images.length > 0) {
            this.$el.addClass('crt-has-image-carousel');
        }
    }

    onShareFacebookClick (ev) {
        ev.preventDefault();
        SocialFacebook.share(this.json);
        this.widget.track('share:facebook');
        return false;
    }

    onShareTwitterClick (ev) {
        ev.preventDefault();
        SocialTwitter.share(this.json);
        this.widget.track('share:twitter');
        return false;
    }

    onPostClick (ev) {
        Logger.log('Post->click');
        let target = z(ev.target);

        if (target.is('a') && target.attr('href') !== '#') {
            this.widget.track('click:link');
        } else {
            ev.preventDefault();
            this.trigger(Events.POST_CLICK, this, this.json, ev);
        }

    }

    onImageLoaded () {
        this.$image.animate({opacity:1});

        this.setHeight();

        this.trigger(Events.POST_IMAGE_LOADED, this);
    }

    onImageError () {
        // Unable to load image!!!
        this.$image.hide();

        this.setHeight();
    }

    setHeight () {
        let height = this.$postC.height();
        if (this.options.maxHeight && this.options.maxHeight > 0 && height > this.options.maxHeight) {
            this.$postC
                .css({maxHeight: this.options.maxHeight});
            this.$el.addClass('crt-post-max-height');
        }

        this.layout();
    }

    layout () {
        // Logger.log("Post->layout");
        this.layoutFooter();
    }

    layoutFooter () {
        // Logger.log("Post->layoutFooter");
        let $userName = this.$el.find('.crt-post-username');
        let $date = this.$el.find('.crt-date');
        let $footer = this.$el.find('.crt-post-footer');
        let $share = this.$el.find('.crt-post-share');
        let $userImage = this.$el.find('.crt-post-userimage');

        let footerWidth = $footer.width();
        let padding = 40;
        let elementsWidth = $userName.width() + $date.width() + $share.width() + $userImage.width() + padding;

        if (elementsWidth > footerWidth) {
            $userName.hide();
        }
    }

    onReadMoreClick (ev) {
        ev.preventDefault();
        this.widget.track('click:read-more');
        this.trigger(Events.POST_CLICK_READ_MORE, this, this.json, ev);
    }
}

export default Post;