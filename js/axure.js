// Add this to the beginning of the axurerp_pagescript.js file found in:
// C:\Program Files (x86)\Axure\Axure RP Pro 6.5\DefaultSettings\Prototype_Files\resources\scripts\
$(document).ready(function () {
    // add class names from labels
    $('[data-label]').each(function (ind, ele) {
        var $ele = $(ele), cls = $ele.attr('data-label');
        $ele.addClass(cls);
    });

    // hide panels
    $('.js_code, .js_link, .css_link').hide();

    // add class name to html tag that matches the page name
    $('html').addClass(window.location.href.replace(/[\s\S]*\/([\s\S]*)\.[\s\S]*/, '$1'));

    // add links to external js files
    $('.css_link *:not(:has("*"))').each(function (ind, ele) {
        addCSS($(ele).text(), 'head');
    });

    // add links to external CSS files
    $('.js_link *:not(:has("*"))').each(function (ind, ele) {
        addJavascript($(ele).text(), 'head');
    });

    // execute code in javascript code panels
    $('.js_code *:not(:has("*"))').each(function (ind, ele) {
        eval($(ele).text());
    });
});

function addJavascript(jsname, pos) {
    if (jsname.length > 0) {
        var th = document.getElementsByTagName(pos)[0], s = document.createElement('script');
        s.setAttribute('type', 'text/javascript');
        s.setAttribute('src', jsname);
        th.appendChild(s);
    }
}

function addCSS(cssname, pos) {
    if (cssname.length > 0) {
        $(pos).append('<link rel="stylesheet" href="' + cssname + '" />');
    }
}