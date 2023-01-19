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

  $(".email").on("keyup", function (e) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var email = $(this).val();
    if(!regex.test(email)){
        $(this).next("span").remove();
        $(this).parent("div").append('<span class="text-danger">Not an valid email address</span>');
        $(".submit-btn").prop("disabled", true);
    }else{
        $(this).next("span").remove();
        $(".submit-btn").removeAttr("disabled");
    }
  })

  $(".req").on("blur", function () {
    if ($(this).val().trim() != "") {
      $(this).next("span").remove();
      $(".submit-btn").removeAttr("disabled");
    } else {
        $(this).next("span").remove();
        $(this).parent("div").append('<span class="text-danger">This field is required</span>');
        $(".submit-btn").prop("disabled", true);
    }
  });

  $("#formFile").on("change", function(){
    var file = $("#formFile")[0].files[0];
    var allowed_file_size 	= "1048576"; 
    var allowed_file_types 	= ['doc','docx','pdf'];
    if(file){
        var fileext = file.name.split(".");    
    
        $(this).next("span").remove();
        $(".submit-btn").removeAttr("disabled");

        if(allowed_file_types.indexOf(fileext[fileext.length - 1]) === -1){ 
            $(this).next("span").remove();
            $(this).parent("div").append('<span class="text-danger">'+file.name + ' is unsupported file type!</span>');
            $(".submit-btn").prop("disabled", true);
            return false;
        }
        if(file.size > allowed_file_size){ 
            $(this).next("span").remove();
            $(this).parent("div").append('<span class="text-danger">Make sure total file size is less than 1 MB!</span>');
            $(".submit-btn").prop("disabled", true);
            return false;
        }
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
    $(".submit-btn").prop("disabled", true);
    $.ajax({
      url: "../contact_mail.php",
      data: {
        type: "callback",
        name: $("#name").val(),
        phoneNumber: $("#phoneNumber").val(),
        email: $("#email").val(),
      },
      method: "POST",
      dataType: "json",
      contentType: false,
      cache: false,
      processData: false,
      success: function (data) {
        let _d = JSON.parse(data);
        if (_d.success) {
          window.location.href = window.location.origin + "/thank-you.html?rc";
        } else {
          alert(_d.message);
          $(".submit-btn").removeClass("submitted");
          $(".submit-btn").removeAttr("disabled");
        }
      },
    });
  }
};

const submitContact = (e) => {
  if (validateFields()) {
    $(".submit-btn").addClass("submitted");
    $(".submit-btn").prop("disabled", true);
    $.ajax({
      url: "../contact_mail.php",
      data: {
        company: $("#companyName").val(),
        name: $("#firstName").val() + " " + $("#lastName").val(),
        email: $("#email").val(),
        phoneNumber: $("#telephone").val(),
        website: $("#website").val(),
        assistanceWith: $('input[name="assistanceWith"]:checked').val(),
        message: $("#details").val(),
      },
      method: "POST",
      dataType: "json",
      contentType: false,
      cache: false,
      processData: false,
      success: function (data) {
        let _d = data;
        if (_d.success) {
          window.location.href = window.location.origin + "/thank-you.html?cu";
        } else {
          alert(_d.message);
          $(".submit-btn").removeClass("submitted");
          $(".submit-btn").removeAttr("disabled");
        }
      },
    });
  }
};

const submitResume = (e) => {
  if (validateFields()) {
    $(".submit-btn").addClass("submitted");
    $(".submit-btn").prop("disabled", true);

    var form = document.getElementById("careerForm");
    var form_data = new FormData(form);

    $.ajax({
      url: "../career_mail.php",
      data: form_data,
      method: "POST",
      dataType: "json",
      contentType: false,
      cache: false,
      processData: false,
      success: function (data) {
        let _d = data;
        if (_d.success) {
          window.location.href =
            window.location.origin + "/career-thank-you.html";
        } else {
          alert(_d.message);
          $(".submit-btn").removeClass("submitted");
          $(".submit-btn").removeAttr("disabled");
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
