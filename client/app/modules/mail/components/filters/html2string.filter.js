(function() {
    "use strict";

    function html2StringFilter() {
        return function(text) {
            return text ? String(text).replace(/<[^>]+>/gm, '') : '';
        };
    }

    module.exports = html2StringFilter;
}());