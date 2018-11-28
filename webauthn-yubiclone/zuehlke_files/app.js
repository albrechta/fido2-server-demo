// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();
$(document).ready(function () {

    /* Sticky contact
    -------------------------------------------------------------------*/

    // Top space on desktop
    var stickyHeadroom = 90,
        $stickyPlaceholder = $('#sticky-only-placeholder');

    if ($('html').hasClass('is-phone')) {
        // Top space on mobile
        stickyHeadroom = 50;
        console.log('html has class is-iphone');
    }

    $(document).on('scroll', function (e) {
        if ($(document).scrollTop() >= stickyHeadroom) {
            $(".zue-contact-sticky-container").addClass('is-fixed');
            $stickyPlaceholder.css('height', '50px');
        } else if ($(document).scrollTop() < stickyHeadroom) {
            $(".zue-contact-sticky-container").removeClass('is-fixed');
            $stickyPlaceholder.css('height', '0');
        }
    });


    /* Mobile navigation toggle
    -------------------------------------------------------------------*/
//    $('#mob-nav-toggler').on('click', function() {
//        $('#top-bar').slideToggle(100);
//    });

    /* Dropdownnavigation Desktop
    -------------------------------------------------------------------*/

    var $dropdownTriggers = $('#zue-main-nav > ul > li, #side-nav > ul > li'),

        // Hides all dropdownNavigations
        hideAll = function () {
            $dropdownTriggers.find('ul:visible').each(function () {
                $(this).parent().trigger('click');
            });
        };

    if ($dropdownTriggers.length > 0) {
        $dropdownTriggers.each(function () {
            var $dropdown = $(this).find('ul'),
                $this = $(this);

            // Check if Subnav exists
            if ($dropdown.length > 0) {

                // Add a class to show this item has a subnavigation
                $(this).addClass('has-subnav');

                // Disable first-level-link
                $(this).find('> a').on('click', function (e) {
                    e.preventDefault();
                });

                var show = function () {
                        $this.addClass('open');
                        $dropdown.stop(true, true).slideDown(200);
                    },
                    hide = function () {
                        $this.removeClass('open');
                        $dropdown.stop(true, true).slideUp(200);
                    };


                $(this).on('click', function (e) {

                    // only allow click for touch input
                    if (whatInput.ask('loose') !== 'touch') {
                        return;
                    }

                    if ($dropdown.is(':visible') && (e.target === this || e.target.parentNode === this)) {
                        hide();
                    } else if (!$dropdown.is(':visible')) {
                        hideAll();
                        show();
                    }
                });

                $(this).on('mouseenter', function () {

                    // dont allow mouseenter for touch input
                    if (whatInput.ask('loose') === 'touch') {
                        return;
                    }
                    show();
                }).on('mouseleave', function () {

                    // dont allow mouseenter for touch input
                    if (whatInput.ask('loose') === 'touch') {
                        return;
                    }
                    hide();
                });
            }
        });

        $('body').on('click', function (e) {

            var $closest = $(e.target).closest('#zue-main-nav > ul > li, #side-nav > ul > li');

            if ($closest.length < 1) {
                hideAll();
            }
        });
    }


    /* Slider
    -------------------------------------------------------------------*/
    var zueSlider = $('.zue-slider').bxSlider({
        mode: 'horizontal',
        pager: true,
        controls: false,
        pause: 7000,
        auto: true
    });

    zueSlider.hover(
        function () {
            zueSlider.stopAuto();
        },
        function () {
            zueSlider.startAuto();
        });

    /* Equalize boxes (only for tablet and desktop)
    -------------------------------------------------------------------*/
    var equalizeBoxes = function () {

            // When lower than $medium breakpoint, which is 40.063em (~641px), don't equalize and remove heights set on elements.
            if ($(window).width() <= 641) {
                $('.zue-boxes-container > *').height('auto');
                return;
            }

            if ($('body').hasClass('is-tablet') || $('body').hasClass('is-desktop')) {
                $.fn.equalize('.zue-boxes-container > *');
            }
        },

        equalizeMediumBoxes = function () {
            $.fn.equalize('.zue-teaser-medium-boxes ul > li');
        };

    $(window).resize(debounce(equalizeBoxes, 100));
    $(window).resize(debounce(equalizeMediumBoxes, 100));

    // Initial state
    equalizeBoxes();
    equalizeMediumBoxes();

    /* Toggle Sub navigation dropdowns
    -------------------------------------------------------------------*/
    $('.sub-dropdown-trigger').on('click touchstart', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).next('.sub-dropdown').toggle();
    });

    $('body').on('click touchstart', function (e) {
        if (!$(e.target).hasClass('dropdown-link')) {
            $('.sub-dropdown').hide();
        }
    });

    /* Lightbox
    -------------------------------------------------------------------*/
    $('.lightbox-video').magnificPopup({
        type: 'iframe'
    });
});

/* Event tracking
-------------------------------------------------------------------*/
$(function () {
    $('body').on('click', function (e) {
        // Get the relevant link element. It might be the element that
        // was clicked or one of the parents.
        var target = null;
        if (hasClass(e.target, 'track')) {
            target = e.target;
        }
        else {
            target = $(e.target).parents('.track').get(0);
        }

        if (target) {

            var dataLayerDict = {};

            // Call to action tracking
            if (hasClass(target, 'track-cta')) {

                dataLayerDict.event = 'Call to action';
                dataLayerDict.teaserTitle = target.getAttribute('data-teaser-title');
                dataLayerDict.teaserType = target.getAttribute('data-teaser-type');

                if (hasClass(target, 'track-button')) {
                    dataLayerDict.action = 'Call to action button';
                }


                else if (hasClass(target, 'track-title')) {
                    dataLayerDict.action = 'Call to action title';
                }


                else if (hasClass(target, 'track-image')) {
                    dataLayerDict.action = 'Call to action image';
                }


                else if (hasClass(target, 'track-tile')) {
                    dataLayerDict.action = 'Call to action Tile';
                }


                else if (hasClass(target, 'track-slide')) {
                    dataLayerDict.action = 'Call to action Slide';
                }


            }

            // File download tracking
            else if (hasClass(target, 'track-download')) {

                dataLayerDict.event = 'Download';
                dataLayerDict.teaserTitle = target.getAttribute('data-teaser-title');
                dataLayerDict.teaserType = target.getAttribute('data-teaser-type');
                dataLayerDict.fileName = target.getAttribute('data-file-name');

                if (hasClass(target, 'track-file')) {
                    dataLayerDict.action = target.getAttribute('data-file-name');
                }
            }

            // Contact intro tracking according to
            // https://notch-interactive.atlassian.net/browse/ZM-131
            else if (hasClass(target, 'track-form')) {
                dataLayerDict.event = 'Contact form';
                dataLayerDict.person = $(target).parents('.box-padding-large').find('h2').text();

                if (hasClass(target, 'track-link')) {
                    dataLayerDict.action = 'Social link ' + target.getAttribute('title');
                }

                else if (hasClass(target, 'track-email')) {
                    dataLayerDict.action = 'Email link';
                }

                else if (hasClass(target, 'track-tel')) {
                    dataLayerDict.action = 'Telephone link';
                }
            }

            // Contact person tracking
            else if (hasClass(target, 'track-contact')) {

                dataLayerDict.person = $(target).parents('.box-padding-large').find('h2').text();
                dataLayerDict.event = 'Contact person';

                if (hasClass(target, 'track-link')) {
                    dataLayerDict.action = 'Social link ' + target.getAttribute('title');
                }

                else if (hasClass(target, 'track-email')) {
                    dataLayerDict.action = 'Email link';
                }

                else if (hasClass(target, 'track-tel')) {
                    dataLayerDict.action = 'Telephone link';
                }

            }

            else if (hasClass(target, 'track-social-media')) {
                dataLayerDict.event = 'Social Media';
                dataLayerDict.type = jQuery(target).data('social-type');
            }

            // Only track if a match was found
            if (dataLayerDict) {
                window.dataLayer = window.dataLayer || [];
                dataLayer.push(dataLayerDict);
            }
        }
    });
});

/* Masonry Helper
   Responsible that the Masonry Plugin gets triggered again, after all images are loaded
-------------------------------------------------------------------*/
function update_masonry() {
    $('[data-masonry]').each(function () {
        $(this).masonry();
    });
}

$(window).load(function () {
    update_masonry();
});

// small hack to execute masonry on structure/content switch in frontend editing mode
$(document).ready(function () {
    $(document).on('focus', '.cms-toolbar-item-cms-mode-switcher a', function () {
        window.setTimeout(function () {
            update_masonry();
        }, 500);
    });
});

/* Helpers
-------------------------------------------------------------------*/
function hasClass(el, sel) {
    return el.classList.contains(sel);
}
