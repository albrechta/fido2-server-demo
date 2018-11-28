$('document').ready(function(){

    (function(){
        var root = document.getElementsByTagName('BODY')[0];

        // Check if element has class
        function hasClass(ele, cls) {
            return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }

        // Add class to element
        function addClass(ele, cls) {
            if (!hasClass(ele, cls)) ele.className += " " + cls;
        }

        // Remove class from element
        function removeClass(ele, cls) {
            if (hasClass(ele, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                ele.className = ele.className.replace(reg, ' ');
            }
        }

        // Set mobile class
        //if (WURFL.is_mobile) {
        //    addClass(root, 'is-mobile');
        //} else {
        //    removeClass(root, 'is-mobile');
        //}

        // Set phone class
        //if (WURFL.form_factor == 'Smartphone') {
        //    addClass(root, 'is-phone');
        //} else {
        //    removeClass(root, 'is-phone');
        //}

        // Set tablet class
        //if (WURFL.form_factor == 'Tablet') {
        //    addClass(root, 'is-tablet');
        //} else {
        //    removeClass(root, 'is-tablet');
        //}

        // Set desktop class
        //if (WURFL.form_factor == 'Desktop') {
        //    addClass(root, 'is-desktop');
        //} else {
        //    removeClass(root, 'is-desktop');
        //}

        // (Not perfect problem solution!) If device is a tablet but should have styles like the desktop version
        // Plus additional 'desktop-tablet' class to preserve some specific tablet styles!
        if ($('body').hasClass('is-tablet') && $(window).width() > 1024) {
            removeClass(root, 'is-tablet');
            addClass(root, 'is-desktop');
            addClass(root, 'is-desktop-tablet');
        }
    })();

});
