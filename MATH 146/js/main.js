(function(w, d){

    var body = d.body,
        gotop = d.getElementById('gotop'),
        menu = d.getElementById("menu");
        menuToggle = d.getElementById("menuToggle"),
        mask = d.getElementById("mask"),
        topheader = d.getElementById("top-header"),
        header_title = d.getElementById("header-title"),
        loading = d.getElementById('loading'),
        header_icon = d.getElementsByClassName("header-icon"),
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

    menuToggle.addEventListener("mouseup", function(e) {
        Content.toggleMenu(true);
        e.preventDefault();
    });

    mask.addEventListener(even, function(e){
        menu.classList.remove('show');
        mask.classList.remove('in');
    });

    gotop.addEventListener("mouseup", function() {
        animate(Content.goTop);
    }, false);

    d.addEventListener('scroll', function() {
        var top = docEl.scrollTop;
        Content.toggleGotop(top);
        Content.fixedHeader(top);
    }, false);

    w.addEventListener('resize', function() {
        menu.classList.remove('show');
        mask.classList.remove('in');
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

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };

    function escapeLaTeX(input) {
        function escapeChar(c) {
            switch (c) {
                case '&': return '&amp;'
                case '<': return '&lt;'
                case '>': return '&gt;'
                case '"': return '&quot;'
                case "\\": return '&#92;'
                case "'": return '&#39;'
                default: return c
            }
        }

        function scanner(input, bool) {
            if (input.length == 0) {
                return input
            } else {
                c = input.substr(0,2)
                if (c.substr(0,1) == "$") {
                    return "$" + escapeChar(c.substr(1,1))  + scanner(input.slice(2), !bool)
                } else if (bool) {
                    return escapeChar(c.substr(0,1)) + scanner(input.slice(1), bool)
                } else {
                    return c.substr(0,1) + scanner(input.slice(1), bool)
                }
            }
        }

        return scanner(input, false)
    }


    function proc_toc(item, list) {
        if (item.tagName == "H2"){
            var newI = d.createElement("i");
            var newA = d.createElement("a");
            var newLi = d.createElement("li");
            newI.classList.add("fa", "fa-archive", "fa-lg", "fa-fw");
            newI.setAttribute("aria-hidden", "true");
            newA.innerHTML = item.textContent;
            newA.classList.add("toc-link");
            newA.insertBefore(newI, newA.childNodes[0]);
            newA.setAttribute("href", item.firstChild.getAttribute("href"));
            newLi.classList.add("waves-block", "waves-effect");
            newLi.appendChild(newA);
            list.appendChild(newLi);
        } else {
            var newDiv = d.createElement("div");
            var newA = d.createElement("a");
            var newLi = d.createElement("li");
            var newUl = d.createElement("ul");
            newDiv.classList.add("side-line");
            newA.setAttribute("href", item.firstChild.getAttribute("href"));
            newA.classList.add("toc-link");
            newA.innerHTML = item.textContent;
            newLi.classList.add("waves-block", "waves-effect");
            newLi.appendChild(newDiv);
            newLi.appendChild(newA);
            newUl.classList.add("sub-nav");
            newUl.appendChild(newLi);
            list.appendChild(newUl);
        }
    }

    function idUnique(str) {
        if (d.getElementById(str)) {
            return idWithNumberUnique(str + "-1");
        } else {
            return str;
        }
    }

    function idWithNumberUnique(str) {
        if (d.getElementById(str)) {
            number = parseInt(/-\d*$/.exec(str)[0].slice(1));
            number += 1;
            number = "-" + number.toString();
            return idWithNumberUnique(str.slice(0,-2) + number);
        } else {
            return str;
        }
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           document.getElementById("markdown-code").innerHTML = escapeHTML(xhttp.responseText);

           var md = window.markdownit()({
                html: true
           });
           var m = document.getElementById("markdown-code").innerHTML
           result = md.render(escapeLaTeX(m));
           document.getElementById("content").innerHTML = result;

           var h2s = d.getElementsByTagName("h2");
           var h3s = d.getElementsByTagName("h3");

           for (var i=0; i<h2s.length; i++) {
               var newA = d.createElement("a");
               var anchorlinkA = d.createElement("a");
               var newI = d.createElement("i");
               newI.classList.add("fa", "fa-link");
               anchorlinkA.setAttribute("href", "#" + idUnique(h2s[i].textContent.toLowerCase().replaceAll(" ", "-")));
               anchorlinkA.appendChild(newI);
               anchorlinkA.classList.add("anchor-link");
               newA.setAttribute("id", idUnique(h2s[i].textContent.toLowerCase().replaceAll(" ", "-")));
               newA.classList.add("anchor");
               h2s[i].classList.add("anchor-tag");
               h2s[i].appendChild(newA);
               h2s[i].insertBefore(anchorlinkA, h2s[i].childNodes[0]);
           }

           for (var i=0; i<h3s.length; i++) {
               var newA = d.createElement("a");
               var anchorlinkA = d.createElement("a");
               var newI = d.createElement("i");
               newI.classList.add("fa", "fa-link");
               anchorlinkA.setAttribute("href", "#" + idUnique(h3s[i].textContent.toLowerCase().replaceAll(" ", "-")));
               anchorlinkA.appendChild(newI);
               anchorlinkA.classList.add("anchor-link-disabled");
               newA.setAttribute("id", idUnique(h3s[i].textContent.toLowerCase().replaceAll(" ", "-")));
               newA.classList.add("anchor");
               h3s[i].classList.add("anchor-tag");
               h3s[i].appendChild(newA);
               h3s[i].insertBefore(anchorlinkA, h3s[i].childNodes[0]);
           }

           var toc = document.getElementById("content").querySelectorAll("h2, h3");
           var toc_list = document.getElementById("table-of-content");

           for (var i=0; i<toc.length; i++) {
               proc_toc(toc[i], toc_list);
           }

           var toc_links = document.getElementsByClassName("toc-link");

           for (var i=0; i<toc_links.length;i++) {
               toc_links[i].addEventListener("mouseup", function() {
                   menu.classList.remove('show');
                   mask.classList.remove('in');
               });
           }

       } else {
           document.getElementById("markdown-code").innerHTML = "Failed to fetch notes.";
       }
    };
    xhttp.open("GET", "notes.md", true);
    xhttp.send();


    Waves.init();


})(window, document);
