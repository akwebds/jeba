$(document).ready(function () {
  document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((tooltip) => {
    new bootstrap.Tooltip(tooltip);
  });

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

  $(".onlyNum").on("keypress", function (e) {
    var deleteCode = 8;
    var backspaceCode = 46;
    var key = e.which;
    if (
      (key >= 48 && key <= 57) ||
      key === deleteCode ||
      key === backspaceCode ||
      (key >= 37 && key <= 40) ||
      key === 0
    ) {
      character = String.fromCharCode(key);
      if (
        character != "." &&
        character != "%" &&
        character != "&" &&
        character != "(" &&
        character != "'"
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  });

  $(".req").on("blur", function () {
    if ($(this).val().trim() != "") {
      $(this).next("span").remove();
    } else {
      $(this).next("span").remove();
      $(this)
        .parent("div")
        .append('<span class="text-danger">This field is required</span>');
    }
  });
});

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

const requestCallback = (e) => {
  if (validateFields()) {
    $(".submit-btn").addClass('submitted');
    $.ajax({
      url: "../contact_mail.php",
      data: {
        type: "callback",
        name: $("#name").val(),
        phoneNumber: $("#phoneNumber").val(),
      },
      method: "POST",
      success: function (data) {
        let _d = JSON.parse(data)
        if (_d.success){
            window.location.pathname = '/thank-you.html';
        }else{
            alert(_d.message);
            $(".submit-btn").addClass("submitted");
        }
      },
    });
  }
};

const validateFields = () => {
  var valid = true;
  $(".req").each(function () {
    var val = $(this).val();

    if (val.trim() == "") {
      $(this).next("span").remove();
      $(this)
        .parent("div")
        .append('<span class="text-danger">This field is required</span>');
      valid = false;
    }
  });

  return valid;
};
