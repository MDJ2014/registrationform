$(document).ready(function() {
//hide all of the elements
$('#name').focus();
$('#other-title').hide();
$('#total').show();
$('#bitcoin').hide();
$('#credit-card').hide();
$('#paypal').hide();
$('#activities-error').hide();
$('#email-error').hide();
$('#colors-js-puns').hide();
$('#name-error').hide();
$('#cc-error').hide();
$('#zip-error').hide();
$('#cvv-error').hide();
});

//get a reference to DOM elements
const selectTitle = document.getElementById('title');
const colors = document.getElementById('color');
const selectDesign=document.getElementById('design');
const activities = document.getElementById('activities');
const paymentmethod = document.getElementById('payment');
const form = document.getElementById('form');

let userName = document.getElementById('name');
let userEmail = document.getElementById('mail');
let userSize = document.getElementById('size');
let userDesign = document.getElementById('design');
let userZip = document.getElementById('zip');
let userCvv = document.getElementById('cvv');
var checked =document.getElementById('all').checked;

//vars for total cost and and how many activities are checked
var totalActivities = $('.activities input[type="checkbox"]:checked').length;
var totalCost = 0;


//event listener for the form submit, which calls all of the validation methods
form.addEventListener('submit', (e)=>{
e.preventDefault();
validateUserName();
validateUserActivities();
validateUserEmail();
validateCreditCard ();
validateZipCode();
valideCvv();
});

//make sure the cvv is 3 characters - show/hide the error message
valideCvv= () =>{
  if(userCvv.value.length !==3){
  $('#cvv-error').show();
}else{
  $('#cvv-error').hide();
}
}
//make sure the zip code is 5 characters - show/hide the error message
validateZipCode = () =>{
  if(userZip.value.length<5){
    $('#zip-error').show();
  }else{
    $('#zip-error').hide();
  }
}

//make sure the user name is not blank - show/hide the error message
validateUserName =()=>{
  if(userName.value === ''){
       $('#name-error').show();
       $('#name').focus();
  }else{
      $('#name-error').hide();
  }
}

//make sure the email is formatted properly- show/hide the error message
validateUserEmail =()=>{

if(!userEmail.value.includes("@") || !userEmail.value.includes('.com')){
  $('#email-error').show();
}else {
  $('#email-error').hide();
}

}

//add event listener for email to valide while user is typing
userEmail.addEventListener('keyup',(e)=>{
  if(!userEmail.value.includes("@") || !userEmail.value.includes('.com')){
    $('#email-error').show();
  }else{
    $('#email-error').hide();
  }
});

//make sure the user has checked at least one activity - show/hide the error message
validateUserActivities = () =>{
  if(totalCost === 0){
  $('#activities-error').show();
}else{
    $('#activities-error').hide()
  }
}

//make sure the credit card input is the right length and not empty - show/hide the error message
validateCreditCard = () =>{
var ccNum = document.getElementById('cc-num').value;

if(ccNum.length >0  && ccNum.length < 13 || ccNum.length > 16){
  $('#cc-error').html('Enter a 13 - 16 digit number');
     $('#cc-error').hide();
     $('#cc-error').show();
}else if(ccNum.length === 0){
     $('#cc-error').html('Enter valid card number');
     $('#cc-error').hide();
     $('#cc-error').show();
}else {
     $('#cc-error').hide();
}

}

//makre sure the user enters numbers and not characters
isNumberKey = (evt) =>
      {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

         return true;
      }


//add event listener for user job role, if 'other' - show the text input for other
selectTitle.addEventListener('change',(e) =>{

    if(e.target.value === 'other'){
        $('#other-title').show();
    }else{
          $('#other-title').hide();
    }
});



//add event listener for t-shirt design - show/hide appropriate color selections
selectDesign.addEventListener('change',(e) =>{
$('#colors-js-puns').show();

  if(e.target.value === 'heart js'){
    $('.puns').hide();
    $('.heart').show();
    color.value=$('.heart')[0].value;

  }else if(e.target.value === 'js puns'){
   $('.heart').hide();
   $('.puns').show();
   color.value=$('.puns')[0].value;
  }else{
   $('.puns').show();
    $('.heart').show();
}

  });


//add event listener for activities - disable conflicting choices - add or subtract from total cost
activities.addEventListener('change',(e) =>{
var isChecked = e.target.checked;
var checkedClass=e.target.className;

if(isChecked){
  if(checkedClass==='all'){
    totalCost +=200; attendanceFee(totalCost);
  }else if(checkedClass === 'tueam'){
    $(".tueam").not(e.target).prop('disabled', 'disabled');
    $(".tueam").not(e.target).parent().addClass('blocked');
    totalCost += 100;
    attendanceFee(totalCost);
  }else if(checkedClass === 'tuepm'){
    $(".tuepm").not(e.target).parent().addClass('blocked');
    $(".tuepm").not(e.target).prop('disabled', 'disabled');
    totalCost += 100;
    attendanceFee(totalCost);
  }else{
    totalCost += 100;
    attendanceFee(totalCost);

  }

  }else{

    if(checkedClass==='all'){
      totalCost -=200; attendanceFee(totalCost);
    }else if(checkedClass === 'tueam'){
      $(".tueam").prop('disabled', false);
      $(".tueam").parent().removeClass('blocked');
      totalCost -= 100;
      attendanceFee(totalCost);
    }else if(checkedClass === 'tuepm'){
      $(".tuepm").prop('disabled', false);
      $(".tuepm").parent().removeClass('blocked');
      totalCost -= 100;
      attendanceFee(totalCost);
    }else{
      totalCost -= 100;
      attendanceFee(totalCost);

    }

}

});




//helper function to calculate attendance fee
function attendanceFee(cost){
$('#cost').html(cost);
}

//add event listener to payment method - hide unselected options
paymentmethod.addEventListener('change',(e) =>{

    if(e.target.value === 'credit card'){

        $('#credit-card').show();
        $('#cc-num').focus();
        $('#paypal').hide();
        $('#bitcoin').hide();
    }else if(e.target.value === 'paypal'){
          $('#paypal').show();
          $('#credit-card').hide();
          $('#bitcoin').hide();
    }else{
      $('#bitcoin').show();
      $('#credit-card').hide();
      $('#paypal').hide();

    }
});
