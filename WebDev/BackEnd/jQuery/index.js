// $(document).ready(function(){ 
//     $("h1").css("color","red");
// }) // it targets the h1 of the document and changes the color to red 

$("h1").addClass("big-title margin-50");
$("h1").text("10GEY");
// $("button").text("vadiley bey"); 
$("button").html("<em>Vadiley ra ninja</em>");

$("a").attr("href","https://www.espncricinfo.com/"); // selecting the anchor tag and changing the attribute href to espncricinfo

$("h1").click(function() {
    $("h1").css("color","purple");
}); // adding event listener to the h1 element.

$("button").click(function(){
    $("h1").css("color","purple");
}) // adding event listener to the button

$(document).keypress(function(event){
    $("h1").text(event.key);
}) // if you press anything on the keyboard, it gets reflected on the h1 tag.

$("h1").on("mouseover",function() {
    $("h1").css("color","blue");
}) // if you hover the mouse over the h1 tag, it changes the color.

$("h1").before("<button>New</button>") // we can add new elements before the h1 tag without changing the HTML File using the before method.

$("h1").after("<button>New</button>")// we can add new elements after the h1 tag without changing the HTML File using the after method.

$("h1").prepend("<button>New</button>")// we can add new elements in after the opening of the h1 tag without changing the HTML File using the prepend method.

$("h1").append("<button>New</button>")// we can add new elements in before the closing of the h1 tag without changing the HTML File using the append method.

// $("button").on("click",function(){
//     $("h1").hide();
// });
// $("h1").show(); if you want to show after hiding.
 // if you click any button in the document, the h1 element will be hidden.

$("button").on("click",function(){
    $("h1").toggle();
}); // if you want to hide and show the h1 element, you can use toggle. click one button, it will hide it. click another button, it will show it.

$("button").on("click",function(){
    $("h1").fadeOut();
   // $("h1").fadeIn(); if you want to show.
}); // it will hide the h1 element. same as hide but, it is better.

$("button").on("click",function(){
    $("h1").fadeToggle();
}); // if you want to hide and show the h1 element, you can use fadeToggle. click one button, it will hide it. click another button, it will show it.

$("button").on("click",function(){
    $("h1").slideUp();
    $("h1").slideDown();
    $("h1").slideToggle();
}); // it is used for sliding up, sliding down, toggling.

// CUSTOM ANIMATIONS
$("button").on("click",function(){
    $("h1").animate({opacity:0.5});
}); // if we click on any button, the opacity is reduced by 50% using .animate.
// the .animate takes only numeric values but not text.

$("button").on("click",function(){
    $("h1").slideUp().slideDown().animate({opacity:0.5});
}); // if we click on any button, the h1 element will first slide up and then slide down and then the opacity will be reduced by 50%. it must be done to only 1 element, not 2 elements at a time.


