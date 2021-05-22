var firebaseConfig = {
    apiKey: "AIzaSyCa8JsE-0avRG2WFfYTXkEKOUcJHldIgwY",
    authDomain: "project-week-1-wholesalers.firebaseapp.com",
    databaseURL: "https://project-week-1-wholesalers-default-rtdb.firebaseio.com",
    projectId: "project-week-1-wholesalers",
    storageBucket: "project-week-1-wholesalers.appspot.com",
    messagingSenderId: "636173511594",
    appId: "1:636173511594:web:37f6519d38cb51f4a999d3",
    measurementId: "G-17TB609XB2"
  };

firebase.initializeApp(firebaseConfig);

var db = firebase.database();

var user = localStorage.getItem("userId")

var totalSum = 0.00
var totalItem = 0
var chartContent;
var deleteKey;

if(user != null){

db.ref(user + "/").on("value", (snapshot) => {

    if(snapshot.hasChildren()){
        $(".cart-empty").text("")
        $(".cart-empty").html(`
        <table class="chartTable">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Count</th>
                <th>Price</th>
                <th></th>
            </tr>
        </tbody>
        <tbody class="chartDiv">
        </tody>
        </table>`)
    }else{
        $(".cart-empty").text("No products in the cart")
    }

    $(".chartDiv").html(" ")

    snapshot.forEach(function(snapshot){
    if(snapshot.val().count > 1){
       totalSum += parseFloat(snapshot.val().ProductPrice) * snapshot.val().count
    }else{
        totalSum += parseFloat(snapshot.val().ProductPrice)
    }
    totalItem += snapshot.val().count

    itemSelf = snapshot.val().ProductPrice * snapshot.val().count

    if(snapshot.val().count === 1){
        chartContent = `
    <tr>
        <td><img class="chartImg" src="${snapshot.val().ProductImage}"></td>
        <td>${snapshot.val().ProductName}</td>
        <td><button disabled data-decr="${snapshot.val().key}" class="decr"> - </button>${snapshot.val().count}<button data-incr="${snapshot.val().key}" class="incr"> + </button></td>
        <td>$${itemSelf.toFixed(2)}</td>
        <td><button class="deleteBtn" data-delete="${snapshot.val().key}"><i class="far fa-trash-alt"></i></button></td>
    </tr>
    `
    }else{
        chartContent = `
    <tr>
        <td><img class="chartImg" src="${snapshot.val().ProductImage}"></td>
        <td>${snapshot.val().ProductName}</td>
        <td><button data-decr="${snapshot.val().key}" class="decr"> - </button>${snapshot.val().count}<button data-incr="${snapshot.val().key}" class="incr"> + </button></td>
        <td>$${itemSelf.toFixed(2)}</td>
        <td><button class="deleteBtn" data-delete="${snapshot.val().key}"><i class="far fa-trash-alt"></i></button></td>
    </tr>
    `
    }
    $(".chartDiv").append(chartContent)

    })

    $(".itemCount").text(totalItem)
    $(".priceSpan").text("$"+totalSum.toFixed(2))

    totalSum = 0.00
    totalItem = 0


})

}


$(document).on("click", ".deleteBtn", function() {
    deleteKey = $(this).attr("data-delete");
    db.ref().child(user).child(deleteKey).remove();
})

$(document).on("click", ".incr", function() {
    incBtn = $(this).attr("data-incr");
    db.ref(user + "/" + incBtn).update({
        count: firebase.database.ServerValue.increment(1),
    })
})

$(document).on("click", ".decr", function() {
    decBtn = $(this).attr("data-decr");
    db.ref(user + "/" + decBtn).update({
        count: firebase.database.ServerValue.increment(-1),
    })
})



$(document).ready(function(){
    //Mobile cart activation
    $('.mob-cart').on('mouseover', function () {
        $('.mob-shop .cart-wrap').css('display', 'block')
    })

   

     //For Sticky Header   
    window.onscroll = function() {myFunction()};

    var header = document.getElementById("sticky-header");
    var sticky = header.offsetTop;

    function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}
    if( $('.header-menu nav').hasClass('active')) {
        $('#sticky-header').removeClass("sticky");
    }

    if( $('.header-menu nav').hasClass('active')){
        $('body').css('overflow','unset')

    }

   


//Mobile Nav Activation
    $('.header-burger').on('click', function () {
        $('.header-burger').toggleClass('active')
        $('.header-menu nav').toggleClass('active')
        if($('.header-menu nav').hasClass('active')){
            $('body').css('overflow-y','hidden')
            $('#sticky-header').css("opacity",'1');
            $('#toTop').css('visibility','hidden')
        }else {
            $('body').css('overflow-y','unset')
            $('#toTop').css('visibility','visible')

        }
    })

    $(window).resize(function () {
        if ($(this).width() >= 1000) {
            $('.header-burger').removeClass('active')
            $('.header-menu nav').removeClass('active')
        }
    });


  //Video Popup  
    $('.video').on('click', function () {
        $('.video-popup').show(300)
        $('.video-popup').addClass('active')

    })

    $(document).mouseup(function (e) {
        if ($('.video-popup').hasClass('active') && !$('.video-content').is(e.target) && $('.video-content')
            .has(e.target).length === 0) {
            $('.video-popup').removeClass('active');
            $('.video-popup').hide(300)

        }
    });


//Button To Top
$(window).scroll(function () {
    if ($(window).scrollTop() > 800) {
        $('#toTop').addClass('active');
    } else {
        $('#toTop').removeClass('active');
    }
   
});
$('#toTop').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, '500');
    }); 


  
//Swiper Initialize
var mySwiper = new Swiper ('.swiper-container', {
  
  // Optional parameters
  direction: 'horizontal',
  loop:true,
  spaceBetween: 30,
  slidesPerView: 5,
  visibilityFullFit: true,
  pagination: '.swiper-pagination',
  nextButton: '.next',
  prevButton: '.prev',
  autoplay: 3000,
  speed: 1000,
  breakpoints: {
    // when window width is >= 320px
    600: {
    slidesPerView: 2,
    spaceBetween: 10
    },
    // when window width is >= 480px
    768: {
    slidesPerView: 3,
    spaceBetween: 30
    },
    // when window width is >= 640px
    992: {
    slidesPerView: 4,
    spaceBetween: 30
    }
}
  
})



    // Our Values - Buttons 
    $("#more-button").on('click', function(){
        $('.second-values').addClass('active');
        $("#more-button").hide();
        $("#less-button").show()
    })
    
    $("#less-button").on('click', function(){
        $("#less-button").hide();
        $('.second-values').removeClass('active');
        $("#more-button").show();
    });
    
    // Awards
    var myIndex = 0;
    carousel();

    function carousel() {
    var i;
    var x = document.getElementsByClassName("slides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}    
    x[myIndex-1].style.display = "block";  
    setTimeout(carousel, 2500);    
    }

    // Glasses Slider - Main
    function glassSlider(value){
        document.querySelector('#etinat').src = value;
    }

    function changeCircleColor(color){
        var circle = document.querySelector(".circle");
        circle.style.background = color;
    }

    function changeButtonColor(color){
        var button = document.querySelector("#learnMore-button");
        button.style.background = color;
    }

    function changeBrandColor(color){
        var brandName = document.querySelector("#brand-name");
        brandName.style.color = color;
    }
    
    
    // Miracle glass buttons
 

    $('.btn1').on('mouseout',function(){
        if($('.button1-text').hasClass('active')){
            $('.button1-text').removeClass('active')
            $('.mob-explain.one').removeClass('active')
        }
    })
    $('.btn1').on('mouseover',function(){
            $('.button1-text').addClass('active')
            $('.mob-explain.one').addClass('active')
    })

    $('.btn2').bind('mouseover mouseout',function(){
        $('.button2-text').toggleClass('active')
        $('.button1-text').removeClass('active')
        $('.mob-explain.two').toggleClass('active')

    })
    $('.btn3').bind('mouseover mouseout',function(){
        $('.button3-text').toggleClass('active')
        $('.button1-text').removeClass('active')
        $('.mob-explain.three').toggleClass('active')


    })
    $('.btn4').bind('mouseover mouseout',function(){
        $('.button4-text').toggleClass('active')
        $('.button1-text').removeClass('active')
        $('.mob-explain.four').toggleClass('active')


    })
    $('.btn5').bind('mouseover mouseout',function(){
        $('.button5-text').toggleClass('active')
        $('.button1-text').removeClass('active')
        $('.mob-explain.five').toggleClass('active')

    })


    //Main Page Learn More Scroll to Glass Architec..
    $('#learnMore-button').click(function(e) {
  e.preventDefault()
  var itemOff = $('#head-arrow').offset().top;
  var itemMargin = 100;
$('html, body').animate({
scrollTop: itemOff - itemMargin
}, 300)
})

   
})

$(document).ready(function(){
    $(window).resize(function () {
        if ($(this).width() >= 800) {
            $('.mob-shop .cart-wrap').css('display', 'none')
        }

    });
})