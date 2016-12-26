(function(w, d){

    var body = d.body,
        gotop = d.getElementById('gotop'),
        menu = d.getElementById("menu");
        menuToggle = d.getElementById("menuToggle"),
        mask = d.getElementById("mask"),
        topheader = d.getElementById("top-header"),
        header_title = d.getElementById("header-title"),
        loading = d.getElementById('loading'),
        header_icon = d.getElementsByClassName("header-icon")
        animate = w.requestAnimationFrame,
        ua = navigator.userAgent,
        isMD = ua.indexOf('Mobile') !== -1 || ua.indexOf('Android') !== -1 || ua.indexOf('iPhone') !== -1 || ua.indexOf('iPad') !== -1 || ua.indexOf('KFAPWI') !== -1,
        even = isMD ? 'touchstart' : 'click',
        docEl = ua.indexOf('Firefox') !== -1 ? d.documentElement : body;

    var Content = {
        goTop: function(){
            var top = docEl.scrollTop;
            if (top > 400) {
                docEl.scrollTop = top - 400;
                animate(arguments.callee);
            } else {
                docEl.scrollTop = 0;
            }
        },
        toggleGotop: function(top) {
            if (top > w.innerHeight / 2) {
                gotop.classList.add('in');
            } else {
                gotop.classList.remove('in');

            }
        },
        toggleMenu: function(flag) {
            if (flag) {
                menu.classList.add('show');
                mask.classList.add('in');
            }
        },
        fixedHeader: function(top) {
            if (top > topheader.clientHeight) {
                topheader.classList.add('fixed');
                header_title.classList.add('fixed');
            } else {
                topheader.classList.remove('fixed');
                header_title.classList.remove('fixed');
            }
        },
    }

    menuToggle.addEventListener(even, function(e) {
        Content.toggleMenu(true);
        e.preventDefault();
    });

    mask.addEventListener(even, function(e){
        menu.classList.remove('show');
        mask.classList.remove('in');
    });

    gotop.addEventListener(even, function() {
        animate(Content.goTop);
    }, false);

    d.addEventListener('scroll', function() {
        var top = docEl.scrollTop;
        Content.toggleGotop(top);
        Content.fixedHeader(top);
    }, false);

    w.addEventListener('load', function() {
        loading.classList.remove('active');
    });

    for (var i=0; i<header_icon.length;i++) {
        header_icon[i].addEventListener("mouseenter", function() {
            event.target.classList.add("waves-float");
        });
    }

    for (var i=0; i<header_icon.length;i++) {
        header_icon[i].addEventListener("mouseleave", function() {
            event.target.classList.remove("waves-float");
        });
    }

    function unescapeHTML(escapedHTML) {
      return escapedHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"');
    }

    md = window.markdownit();
    m = document.getElementById("markdown-code").innerHTML;
    result = md.render(m);
    result = unescapeHTML(result);
    document.getElementById("content").innerHTML = result;

    Waves.init();

/*
    md = d.getElementById("markdown-code").innerHTML;
    ht = marked(md);
    d.getElementById("content").innerHTML = ht;
*/


})(window, document);
