(function() {
  var a = jQuery.noConflict();
  a.fn.lightbox = function(b) {
    function c() {
      b.fileLoadingImage = b.fileLoadingImage || "images/loading.gif";
      b.fileCloseImage = b.fileCloseImage || "images/close.gif";
      b.resizeSpeed = b.resizeSpeed || 7;
      b.borderSize = b.borderSize || 10;
      a("body").append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><img id="lightbox-image"><div id="lightbox-nav"><a href="#" id="lightbox-nav-btnPrev"></a><a href="#" id="lightbox-nav-btnNext"></a></div><div id="lightbox-loading"><a href="#" id="lightbox-loading-link"><img src="' + b.fileLoadingImage + '"></a></div></div></div><div id="lightbox-container-image-data-box"><div id="lightbox-container-image-data"><div id="lightbox-details"><span id="lightbox-caption"></span><span id="lightbox-image-details-num"></span></div><div id="lightbox-secNav"><a href="#" id="lightbox-secNav-btnClose"><img src="' + b.fileCloseImage + '"></a></div></div></div></div>');
      var d = a("#jquery-overlay");
      var e = a("#jquery-lightbox");
      d.hide().css({
        opacity: b.overlayOpacity
      });
      a("a, area, input").live("click", function() {
        var f = a(this).attr("href");
        var g = a(this).attr("rel");
        if (g == "lightbox") {
          d.show();
          e.show();
          h(f);
          return false
        }
      });
      e.hide();
      a("#jquery-overlay, #lightbox-secNav-btnClose").click(function() {
        i();
        return false
      });
      a(window).resize(function() {
        j()
      })
    }

    function d() {
      var b = a(window).height();
      var c = a(window).width();
      a("#jquery-overlay").css({
        width: c,
        height: b
      });
      var d = a("#jquery-lightbox");
      var e = d.outerWidth();
      var f = d.outerHeight();
      var g = (b - f) / 2;
      var h = (c - e) / 2;
      d.css({
        top: g + a(document).scrollTop(),
        left: h
      })
    }

    function e(c) {
      a("#lightbox-loading").show();
      if (b.resizeSpeed > 10) b.resizeSpeed = 10;
      if (b.resizeSpeed < 1) b.resizeSpeed = 1;
      var d = new Image;
      d.src = c;
      d.onload = function() {
        a("#lightbox-image").attr("src", c);
        f(d.width, d.height)
      }
    }

    function f(c, d) {
      var e = a("#lightbox-container-image-box").width();
      var f = a("#lightbox-container-image-box").height();
      var g = c + b.borderSize * 2;
      var h = d + b.borderSize * 2;
      var i = e - g;
      var j = f - h;
      a("#lightbox-container-image-box").animate({
        width: g,
        height: h
      }, b.resizeSpeed * 100, function() {
        k()
      });
      if (i == 0 && j == 0) {
        if (a.browser.msie) {
          l(250)
        } else {
          l(100)
        }
      }
      a("#lightbox-container-image-data-box").css({
        width: c
      });
      a("#lightbox-nav-btnPrev, #lightbox-nav-btnNext").css({
        height: d
      })
    }

    function g() {
      a("#lightbox-loading").hide();
      a("#lightbox-image").show();
      if (b.showNav) {
        a("#lightbox-nav").show()
      } else {
        a("#lightbox-nav").hide()
      }
      a("#lightbox-container-image-data-box").slideDown("fast");
      d()
    }

    function h(b) {
      var c = 0;
      a("a[rel=lightbox]").each(function(d) {
        if (a(this).attr("href") == b) {
          c = d
        }
      });
      var d = a("a[rel=lightbox]").get(c);
      var e = a(d).attr("title");
      a("#lightbox-caption").html(e);
      if (c > 0) {
        var f = a("a[rel=lightbox]").get(c - 1);
        var g = a(f).attr("href");
        a("#lightbox-nav-btnPrev").attr("href", g).show()
      } else {
        a("#lightbox-nav-btnPrev").hide()
      }
      if (c < a("a[rel=lightbox]").length - 1) {
        var h = a("a[rel=lightbox]").get(c + 1);
        var i = a(h).attr("href");
        a("#lightbox-nav-btnNext").attr("href", i).show()
      } else {
        a("#lightbox-nav-btnNext").hide()
      }
      a("#lightbox-image-details-num").html(b.imageNumberSeparator + (c + 1) + " / " + a("a[rel=lightbox]").length);
      e(b)
    }

    function i() {
      a("#jquery-overlay").fadeOut();
      a("#jquery-lightbox").hide();
      a("#lightbox-image").hide();
      a("#lightbox-nav").hide();
      a("#lightbox-container-image-data-box").hide()
    }

    function j() {
      d()
    }

    function k() {
      g()
    }

    function l(b) {
      setTimeout(g, b)
    }
    a(document).ready(function() {
      c()
    })
  }
})(jQuery);