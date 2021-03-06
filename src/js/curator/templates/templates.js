

import popupUnderlayTemplate from "./general/popup_underlay";
import popupWrapperTemplate from "./general/popup_wrapper";
import popupTemplate from "./general/popup";
import filterTemplate from "./general/filter";

import v1gridPostTemplate from "./v1/grid_post";
import postTemplateV1 from "./v1/post";

import postTemplateV2 from "./v2/post";
import gridPostTemplateV2 from "./v2/grid_post";
import gridFeedTempleV2 from "./v2/grid_feed";

let Templates = {
    'filter'                : filterTemplate,
    'popup'                 : popupTemplate,
    'popup-underlay'        : popupUnderlayTemplate,
    'popup-wrapper'         : popupWrapperTemplate,

    // V1
    'post-v1'               : postTemplateV1,
    'grid-post-v1'          : v1gridPostTemplate,

    // V2
    'post-v2'               : postTemplateV2,
    'grid-post-v2'          : gridPostTemplateV2,
    'grid-feed-v2'          : gridFeedTempleV2,
};

export default Templates;




