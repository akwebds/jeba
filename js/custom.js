$(document).ready(function(){
    new WOW().init();

    $("#home-slider").owlCarousel({
      dots: false,
      nav: true, // Show next and prev buttons
      navText: ["arrow_back_ios", "arrow_forward_ios"],
      autoplay: true,
      autoplayHoverPause: true,
      loop: true,
      items: 1,
      itemsDesktop: false,
      itemsDesktopSmall: false,
      itemsTablet: false,
      itemsMobile: false,
    });

    $(window).scroll(function () {
      if ($(this).scrollTop()) {
        $("#back-top").fadeIn();
      } else {
        $("#back-top").fadeOut();
      }
    });
})

window.onscroll = function () {
  myFunction();
};

var header = document.getElementById("myHeader");
var stickyHeader = header.offsetTop;
function myFunction() {
  if (window.pageYOffset > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


