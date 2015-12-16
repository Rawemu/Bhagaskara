$(document).ready(function(){

    stickyMenuWithSlideDownEffect();
    hamburgerMenu();
    checkMenuOnResize();
    teamSlider();

    function stickyMenuWithSlideDownEffect() {
        var menu = $("#menu");
        var menuOffsetFromTop = menu.position().top;
        var offsetDelay = 1.05;

        $(window).on("scroll", function () {
            if ($(window).scrollTop() > offsetDelay * menuOffsetFromTop) {
                menu.addClass("sticky");
                menu.slideDown(1000);
            }
            else{
                menu.css("display","");
                menu.removeClass("sticky");
            }
        });
    }

    function hamburgerMenu() {
        var menu = $(".innerMenu").eq(0);

        menu.on("click", function () {
            var winSize = $(window).width();

            if (winSize < 900) {
                menu.children().toggle();
            }
        });

    }

    function checkMenuOnResize(){
        $(window).resize(function(){
            var menu = $(".innerMenu").eq(0);
            var winSize = $(window).width();
            var hamb = $("#hamburger");

            if(winSize < 900){
                menu.children().hide();
                hamb.show();
            }
            else{
                menu.children().show();
                hamb.hide();
            }
        });
    }

    function teamSlider(){
        var leftButton = $("#teamButtonLeft");
        var rightButton = $("#teamButtonRight");
        var membersList = $(".membersList").eq(0);
        var animationOffsetRight = { right: "33.33%"};
        var animationOffsetLeft = { right: "-33.33%"};
        var numberOfElements = membersList.children().length;
        var animationTime = 200;

        rightButton.on("click", function(){
            for(var i = 0; i < numberOfElements; i++){
                membersList.children().eq(i).animate(animationOffsetRight, animationTime, function(i){
                    membersList.children().css("right","0");
                });
            }
            membersList.children().promise().done(function(){
                membersList.children().first().appendTo(membersList);
            });
        });

        leftButton.on("click", function(){
            for(var i = 0; i < numberOfElements; i++){
                membersList.children().eq(i).animate(animationOffsetLeft, animationTime, function(){
                    membersList.children().css("right","0");
                });
            }
            membersList.children().promise().done(function() {
                membersList.children().last().prependTo(membersList);
            });
        });
    }

});
