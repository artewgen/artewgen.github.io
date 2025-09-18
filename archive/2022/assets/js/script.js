/*
$(document).ready(function () {
    if ($(window).width()>1000) {
       /* $("#fullview").fullView({
            //Navigation
            navbar: "#navbar",
            backToTop: true,
            dots: false,
      
            // Callback
            onScrollEnd: function (currentView) {
                if (!currentView.hasClass('nav-transparent')) {
                    $('.header').addClass('changed');
                } else {
                    $('.header').removeClass('changed');
                }
            }
        })*/

/*
        var fv = $("#fullview").fullView({
            //Navigation
            dots: true,
            dotsPosition: "right",
            dotsTooltips: true,
        
            //Scrolling
            easing: "swing",
            backToTop: false,
        
            // Accessibility
            keyboardScrolling: true,
        
            // Callback
            onScrollEnd: function (currentView, preView) {
              console.log("Current", currentView);
              console.log("Previus", preView);
            }
          });
        
          
        
          $("#select").change(function () {
            // To Scroll to Specfic Section
            fv.data("fullView").scrollTo($(this).val());
          });

          

          

    }

});*/

$(function() {
  $('.scroll').on('click', function(e) {
    e.preventDefault();
    let pageHeight = window.innerHeight;
    $('html, body').animate({ scrollTop: pageHeight}, 500, 'linear');
  });

  $('#header__burger').on('click', function(){
    $('#header-nav-wrap').toggleClass('open');
  });
});
