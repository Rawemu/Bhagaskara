$(document).ready(function(){

    stickyMenuWithSlideDownEffect();
    hamburgerMenu();
    checkMenuOnResize();
    skillsSetterForCurrentMember();
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
        var animationOffsetRight = { right: "66.67%"};
        var animationOffsetLeft = { right: "0"};
        var numberOfElements = membersList.children().length;
        var sliderReset = "33.33%";
        var animationTime = 200;
        var winSize = $(window).width();

        rightButton.on("click", function(){
            for(var i = 0; i < numberOfElements; i++){
                if(winSize < 900){
                    animationOffsetRight = { right: "200%"};
                    sliderReset = "100%"
                }
                membersList.children().eq(i).animate(animationOffsetRight, animationTime, function(){
                    membersList.children().css("right", sliderReset);
                });
            }
            membersList.children().promise().done(function(){
                membersList.children().first().appendTo(membersList);
            });
        });

        leftButton.on("click", function(){
            for(var i = 0; i < numberOfElements; i++){
                if(winSize < 900){
                    animationOffsetRight = { right: "0%"};
                    sliderReset = "100%"
                }
                membersList.children().eq(i).animate(animationOffsetLeft, animationTime, function(){
                    membersList.children().css("right", sliderReset);
                });
            }
            membersList.children().promise().done(function() {
                membersList.children().last().prependTo(membersList);
            });
        });
    }

    function skillsSetterForCurrentMember(){
        var currentMember = $(".member").eq(2);
        var buttonLeft = $("#teamButtonLeft");
        var buttonRight = $("#teamButtonRight");

        skillSet();

        buttonRight.on("click", function(){
            skillSet();
        });
        buttonLeft.on("click", function(){
            skillSet();
        });

        function skillSet(){
            var skills = $(".skill");
            var dataName = ["webdesign", "gfxdesign", "htmlcss", "uiux"];
            for(var i = 0; i < skills.length; i++) {
                skills.eq(i).children().eq(0).children().eq(0).html(currentMember.data(dataName[i]));
            }
        }
    }
});
