var OffCanvas = function () {

    var instance = {

        options: {
            'trigger_event_type': 'click touch',
            'trigger_data_attribute': 'data-offcanvas-trigger-class'
        },

        initialize: function (navigation_container_selector, overlay_selector, options) {
            this.navigation_container = document.querySelector(navigation_container_selector);
            this.overlay = document.querySelector(overlay_selector);
            this.options = $.extend(true, this.options, options);

            this.current_trigger_class = null;

            this.attach_events();
            return this;
        },

        attach_events: function () {
            $(document).on(this.options.trigger_event_type, '[' + this.options.trigger_data_attribute + ']', function (event) {
                event.preventDefault();
                this.toggle($(event.currentTarget).attr(this.options.trigger_data_attribute));
            }.bind(this));

            $(this.overlay).on(this.options.trigger_event_type, function (event) {
                event.preventDefault();
                this.close();
            }.bind(this));

            // Prevents body from scrolling on iOS when offcanvas is open
            $(this.navigation_container).on('touchstart', function (event) {
                if (this.navigation_container.scrollTop === 0) {
                    this.navigation_container.scrollTop = 1;
                } else if (this.navigation_container.scrollHeight === this.navigation_container.scrollTop + this.navigation_container.offsetHeight) {
                    this.navigation_container.scrollTop -= 1;
                }
            }.bind(this));

            $(this.navigation_container).on('touchmove', function (event) {
                if (this.navigation_container.scrollHeight > $(this.navigation_container).innerHeight()) {
                    event.stopPropagation();
                }
            }.bind(this));

            //$(window).on('resize', function () {
            //    this.close();
            //}.bind(this));
        },

        toggle: function (css_class) {
            if (this.current_trigger_class != null) {
                this.close();
            } else {
                this.open(css_class);
            }
        },

        open: function (css_class) {
            this.current_trigger_class = css_class;
            $('body').addClass(this.current_trigger_class);
            $(document).on('mousewheel.offcanvas', function (event) { event.preventDefault(); });
            $(document).on('touchmove.offcanvas', function (event) { event.preventDefault(); });
        },

        close: function () {
            $(document).off('mousewheel.offcanvas');
            $(document).off('touchmove.offcanvas');
            $('body').removeClass(this.current_trigger_class);
            this.current_trigger_class = null;
        }

    };

    return instance.initialize.apply(instance, arguments);

};