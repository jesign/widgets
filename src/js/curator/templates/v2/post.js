

const v2PostTemplate = ` 
<div class="crt-post-v2 crt-post crt-post-<%=this.networkIcon()%> <%=this.contentTextClasses()%>  <%=this.contentImageClasses()%>" data-post="<%=id%>"> 
    <div class="crt-post-border">
        <div class="crt-post-c">
            <div class="crt-post-content">
                <div class="crt-image crt-hitarea crt-post-content-image" > 
                    <div class="crt-image-c"><img src="<%=image%>" class="crt-post-image" /></div> 
                    <span class="crt-play"><i class="crt-play-icon"></i></span> 
                    <div class="crt-image-carousel"><i class="crt-icon-image-carousel"></i></div> 
                </div> 
                <div class="crt-post-header"> 
                    <span class="crt-social-icon"><i class="crt-icon-<%=this.networkIcon()%>"></i></span> 
                    <div class="crt-post-fullname"><a href="<%=this.userUrl()%>" target="_blank"><%=user_full_name%></a></div>
                </div> 
                <div class="text crt-post-content-text"> 
                    <%=this.parseText(text)%> 
                </div> 
                <div class="crt-post-read-more"><a href="#" class="crt-post-read-more-button"><%=this._t("read-more")%></a> </div> 
            </div> 
            <div class="crt-post-footer">
                <img class="crt-post-userimage" src="<%=user_image%>" /> 
                <span class="crt-post-username"><a href="<%=this.userUrl()%>" target="_blank">@<%=user_screen_name%></a></span>
                <span class="crt-date"><%=this.prettyDate(source_created_at)%></span> 
                <div class="crt-post-share"><span class="ctr-share-hint"></span><a href="#" class="crt-share-facebook"><i class="crt-icon-facebook"></i></a>  <a href="#" class="crt-share-twitter"><i class="crt-icon-twitter"></i></a></div>
            </div> 
        </div> 
    </div> 
</div>`;

export default v2PostTemplate;