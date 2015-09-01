;
(function($) {

    /*Menu function object*/

    $.gooeymenu = function(el, settings) {
        var gooey = $(el);
        gooey.addClass("navimenu");
        var base = this;
        var options = base.options = $.extend({}, $.gooeymenu.defaults, settings); // user options object

        /*References of key elements*/

        base.els = {
            item: gooey.find(".gooey-menu-item"),
            checkbox: gooey.find(".menu-open"),
            button: gooey.find(".open-button")
        };

        /* Gooey methods*/

        base.methods = {

            //Setup margins and bounce size options
            setup: function() {
                var marginOpts = {
                    small: 1.4,
                    medium: 1.8,
                    large: 2.1
                };
                var bounceOpts = {
                    small: 1.3,
                    medium: 1.6,
                    large: 2.1
                };
                for (var margin in marginOpts) options.margin === margin ? (options.margin = marginOpts[margin]) : null;
                for (var bounce in bounceOpts) options.bounceLength === bounce ? (options.bounceLength = bounceOpts[bounce]) : null;

                // Mobile and tablet styles
                base.methods.responsiveStyles();

                base.els.item.hover(function() {
                    options.currentBg = base.els.item.css("background-color");
                    $(this).css("background-color", options.hover);
                }, function() {
                    $(this).css("background-color", options.currentBg);
                });
                if (options.bounce === true) {
                    base.methods.bounce();
                };
            },

            //Create custom events ("open" and "close")

            setEvents: function() {
                var events = ["open","close"];
                events.forEach(function(ev,i) {
                    gooey.on(ev, function() {
                        if (options[ev]) {
                            options[ev].apply(this, arguments);
                        };
                    });
                });
            },

            //Bounce function
            bounce: function() {
                if (options.bounce === true) {
                    var initTransitionState = base.els.item.css("transition-timing-function");
                    base.els.checkbox.on("change", function() {
                        if (!$(this).is(":checked")) {
                            base.els.item.css({
                                "transition-timing-function": initTransitionState,
                                "-moz-transition-timing-function": initTransitionState,
                                "-o-transition-timing-function": initTransitionState,
                                "-webkit-transition-timing-function": initTransitionState
                            });
                        } else {
                            base.els.item.css({
                                "transition-timing-function": "cubic-bezier(0.8, 0.84, 0.44, " + "\u0020" + options.bounceLength + ")",
                                "-o-transition-timing-function": "cubic-bezier(0.8, 0.84, 0.44, " + "\u0020" + options.bounceLength + ")",
                                "-moz-transition-timing-function": "cubic-bezier(0.8, 0.84, 0.44, " + "\u0020" + options.bounceLength + ")",
                                "-webkit-transition-timing-function": "cubic-bezier(0.8, 0.84, 0.44, " + "\u0020" + options.bounceLength + ")",
                                "-ms-transition-timing-function": "cubic-bezier(0.8, 0.84, 0.44, " + "\u0020" + options.bounceLength + ")"
                            });
                        }
                    });
                    
                }
            },
            // Controls "circle" style menus
            circle: function() {
                gooey.trigger("open");
                var radian, radius, cos, xAxis, yAxis, periodX, periodY,
                    number = base.els.item.length,
                    transition = options.transitionStep,
                    pi = Math.PI,
                    initialDegreeStep = 360 / number,
                    degreeStep = initialDegreeStep = 360 / number;
                radius = options.circle.radius;
                base.els.item.each(function() {
                    if (base.els.checkbox.is(":checked")) {
                        radian = pi * degreeStep / 180;
                        cos = Math.abs(Math.cos(radian));
                        xAxis = radius * cos;
                        yAxis = Math.sqrt((radius * radius) - (xAxis * xAxis));
                        periodX = base.methods.periodCalc(degreeStep).x;
                        periodY = base.methods.periodCalc(degreeStep).y;
                        $(this).css({
                            "transform": "translate3d(" + periodX + xAxis + "px," + periodY + yAxis + "px,0)",
                            "-o-transform": "translate3d(" + periodX + xAxis + "px," + periodY + yAxis + "px,0)",
                            "-webkit-transform": "translate3d(" + periodX + xAxis + "px," + periodY + yAxis + "px,0)",
                            "-moz-transform": "translate3d(" + periodX + xAxis + "px," + periodY + yAxis + "px,0)",
                            "-ms-transform": "translate3d(" + periodX + xAxis + "px," + periodY + yAxis + "px,0)",
                            "transition-duration": transition + "ms",
                            "-o-transition-duration": transition + "ms",
                            "-webkit-transition-duration": transition + "ms",
                            "-moz-transition-duration": transition + "ms"
                        });
                        degreeStep += initialDegreeStep;
                        transition += options.transitionStep;
                    } else {
                        base.els.item.css({
                            "transform": "translate3d(0, 0, 0)",
                            "-moz-transform": "translate3d(0, 0, 0)",
                            "-webkit-transform": "translate3d(0, 0, 0)",
                            "-ms-transform": "translate3d(0, 0, 0)",
                            "-o-transform": "translate3d(0, 0, 0)"
                        });
                        degreeStep = 360 / number;
                        transition = options.transitionStep;
                        gooey.trigger("close");
                    }
                });
            },
            periodCalc: function(degree) {
                var period = {
                    x: (degree < 90) || (degree > 270) ? "" : "-",
                    y: (degree > 180) ? "" : "-"
                };
                return period;
            },
            // Controls "linear" style menus: horizontal and vertical
            linear: function(positions) {
                gooey.trigger("open");
                var positionStyle = (options.style === "horizontal") ? options.horizontal.menuItemPosition : options.vertical.menuItemPosition,
                    position = positions[positionStyle].init,
                    transition = options.transitionStep;
                base.els.item.each(function() {
                    if (base.els.checkbox.is(":checked")) {
                        if (options.style === "horizontal") {
                            $(this).css({
                                "transform": "translate3d(" + position + "px, 0, 0)",
                                "-ms-transform": "translate3d(" + position + "px, 0, 0)",
                                "-o-transform": "translate3d(" + position + "px, 0, 0)",
                                "-moz-transform": "translate3d(" + position + "px, 0, 0)",
                                "-webkit-transform": "translate3d(" + position + "px, 0, 0)",
                                "transition-duration": transition + "ms",
                                "-o-transition-duration": transition + "ms",
                                "-webkit-transition-duration": transition + "ms",
                                "-moz-transition-duration": transition + "ms"

                            });
                            position += positions[positionStyle].init;
                            transition += options.transitionStep;
                        } else if (options.style === "vertical") {
                            $(this).css({
                                "transition-duration": transition + "ms",
                                "-moz-transition-duration": transition + "ms",
                                "-o-transition-duration": transition + "ms",
                                "-webkit-transition-duration": transition + "ms"
                            });
                            if (options.vertical.direction === "down") {
                                $(this).css({
                                    "transform": "translate3d(0, " + position + "px, 0)",
                                    "-moz-transform": "translate3d(0, " + position + "px, 0)",
                                    "-o-transform": "translate3d(0, " + position + "px, 0)",
                                    "-webkit-transform": "translate3d(0, " + position + "px, 0)",
                                    "-ms-transform": "translate3d(0, " + position + "px, 0)"
                                });
                            } else if (options.vertical.direction === "up") {
                                $(this).css({
                                    "transform": "translate3d(0,-" + position + "px, 0)",
                                    "-moz-transform": "translate3d(0,-" + position + "px, 0)",
                                    "-webkit-transform": "translate3d(0,-" + position + "px, 0)",
                                    "-o-transform": "translate3d(0,-" + position + "px, 0)",
                                    "-ms-transform": "translate3d(0,-" + position + "px, 0)"
                                });
                            }
                            position += positions[positionStyle].init;
                            transition += options.transitionStep;
                        }

                    } else {
                        base.els.item.css({
                            "transform": "translate3d(0, 0, 0)",
                            "-moz-transform": "translate3d(0, 0, 0)",
                            "-webkit-transform": "translate3d(0, 0, 0)",
                            "-ms-transform": "translate3d(0, 0, 0)",
                            "-o-transform": "translate3d(0, 0, 0)"
                        });
                        position = positions[positionStyle].init;
                        transition = options.transitionStep;
                        gooey.trigger("close");
                    }
                });
            },
            // Launches menu items translation
            translate: function() {
                var positions = {
                    "glue": {
                        "init": options.size
                    },
                    "spaced": {
                        "init": options.size * options.margin
                    }
                };

                base.els.checkbox.on("change", function() {
                    base._callbacks[options.style](positions);
            });
        },
            // Utility function for adding SVG filters to HTML

            createOn: function(root, name, attrs, text) {
                var namespaceURI = "http://www.w3.org/2000/svg";
                var el = document.createElementNS(namespaceURI, name);
                for (var a in attrs) {
                    if (!attrs.hasOwnProperty(a)) continue;
                    el.setAttribute(a, attrs[a]);
                }
                if (text) el.appendChild(document.createTextNode(text));
                return root.appendChild(el);
            },
            responsiveStyles: function() {
                var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                if (width >= 320 && width <= 480) {
                    options.size = options.size / 1.4;
                    options.circle.radius /= 1.2;
                } else if (width > 480 && width <= 768) {
                    options.size /= 1.2;
                } else if (width > 780 && width <= 1024) {
                    options.circle.radius /= 1.2;
                    options.size /= 1.1;
                }

                base.els.item.css({
                    "width": options.size + "px",
                    "height": options.size + "px",
                    "color": options.contentColor,
                    "background-color": options.bgColor,
                    "line-height": options.size + "px"
                });
                base.els.button.css({
                    "width": options.size + "px",
                    "height": options.size + "px",
                    "background-color": options.bgColor,
                    "line-height": options.size + "px"
                });

                gooey.find(".burger").css({
                    "font-size": ".8em",
                    "width": options.size / 2 + "px",
                    "height": "3px",
                    "left": options.size / 4 + "px"
                });
            }
        };
        // Register functions called for various menu styles
        base._callbacks = {
            "vertical": base.methods.linear,
            "horizontal": base.methods.linear,
            "circle": base.methods.circle
        };
        base.init = function() {
            
            var ns = "http://www.w3.org/2000/svg";
            var svg = document.createElementNS(ns, "svg");
            var index = $(".navimenu").index(gooey);
            svg.setAttribute("id", "gooeySVG" + index);
            svg.setAttribute("class","gooeySVG");
            gooey.append(svg);
            var gooeySVG = document.getElementById("gooeySVG" + index);
            base.methods.createOn(gooeySVG, "defs", {
                id: "defs" + index
            });
            var defs = document.getElementById("defs" + index);
            base.methods.createOn(defs, "filter", {
                id: "goo-shadow" + index,
                overflow:"hidden"
                
            });
            var filterGoo = document.getElementById("goo-shadow" + index);
            base.methods.createOn(filterGoo, "feGaussianBlur", { in : "SourceGraphic",
                result: "blur",
                    stdDeviation: "10"
            });

            base.methods.createOn(filterGoo, "feColorMatrix", { in : "blur",
                mode: "matrix",
                    values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8",
                    result: "goo"
            });

            base.methods.createOn(filterGoo, "feGaussianBlur", { in : "goo",
                stdDeviation: "2",
                    result: "shadow"
            });
            base.methods.createOn(filterGoo, "feColorMatrix", { in : "shadow",
                mode: "matrix",
                    values: "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 0",
                    result: "shadow"
            });
            base.methods.createOn(filterGoo, "feOffset", { in : "shadow",
                dx: "1",
                    dy: "1",
                    result: "shadow"
            });
            base.methods.createOn(filterGoo, "feComposite", {
                in2: "shadow",
                in : "goo",
                result: "goo"
            });
            base.methods.createOn(filterGoo, "feComposite", {
                in2: "goo",
                in : "SourceGraphic",
                result: "mix"
            });
            base.methods.createOn(defs, "filter", {
                id: "goo" + index
            });
            var filterGoo2 = document.getElementById("goo" + index);
            base.methods.createOn(filterGoo2, "feGaussianBlur", { in : "SourceGraphic",
                result: "blur",
                    stdDeviation: "10"
            });
            base.methods.createOn(filterGoo2, "feColorMatrix", { in : "blur",
                mode: "matrix",
                    values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7",
                    result: "goo"
            });
            base.methods.createOn(filterGoo2, "feComposite", {
                in2: "goo",
                in : "SourceGraphic",
                result: "mix"
            });
            gooey.css({
                "-webkit-filter": "url('#goo-shadow" + index + "')",
                "filter": "url('#goo-shadow" + index + "')",
                "-ms-filter": "url('#goo-shadow" + index + "')",
                "-o-filter": "url('#goo-shadow" + index + "')"
            });
            base.methods.setEvents();
            base.methods.setup();
            base.methods.translate.apply(this, arguments);
        };
        base.init();

    };

    $.gooeymenu.defaults = {
        style: "horizontal", // {String} Sets gooey menu style. Accepted values: "horizontal","vertical","circle"
        size: 70, // {Integer} Sets a menu item's size in pixels;
        margin: "medium", //  {String} Sets margin between menu items. Acts only if "spaced" option of  "horizontal" or "vertical" style is selected. Accepted values: "small","medium" and "large"
        bgColor: "steelblue", // {String} Sets background-color of a menu item element; 
        contentColor: "white", // {String} Sets font color of a menu item's content;
        transitionStep: 100, // {Integer}  Sets a speed rate at which menu items unfold in milliseconds
        bounce: false, // {Boolean}  Turns "bounce" effect off if {false} and on if {true}
        bounceLength: "medium", // {String}   Sets bounce length, if bounce effect is enabled. Accepted values: "small", "medium" and "large"
        hover: "white", // {String} Sets menu items' color on hover

        // Style-specific settings
        circle: {
            radius: 80 // {Integer} Sets a menu circle's radius when a menu is opened (in pixels)
        },
        horizontal: {
            menuItemPosition: "glue" // {String} "Spaced" option sets the spacing of menu items by a specified margin. "Glue" option makes items stacked.
        },
        vertical: {
            menuItemPosition: "spaced", // {String} "Spaced" option sets the spacing of menu items by specified margin. "Glue" option makes items stacked.
            direction: "up" // {String} Values: "up" or "down". A direction in which vertical menu unfolds
        },
        //Callback API
        open: function() {}, // {function} Fires when a gooey menu is opened
        close: function() {} // {function} Fires when a gooey menu is closed
    };
    $.fn.gooeymenu = function(options) {
        if (options === undefined) options = {};
        if (options && typeof options === "object") {
            return this.each(function() {
                new $.gooeymenu(this, options);
            });
        };
    };
})(jQuery);