$(document).ready(function(){

    stickyMenuWithSlideDownEffect();
    hamburgerMenu();
    checkMenuAndSliderOnResize();
    teamSliderWithSkillsSetInit();

    function stickyMenuWithSlideDownEffect() {
        var menu = $("#menu");
        var menuOffsetFromTop = menu.offset().top;
        var offsetCompensator = 1.2;

        $(window).on("scroll", function () {
            if ($(window).scrollTop() > offsetCompensator * menuOffsetFromTop) {
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

    function checkMenuAndSliderOnResize(){
        $(window).resize(function(){
            var menu = $(".innerMenu").eq(0);
            var winSize = $(window).width();
            var hamb = $("#hamburger");

            var membersList = $(".membersList").eq(0);
            var sliderReset;
            var seenMember;

            if(winSize < 900){
                menu.children().hide();
                hamb.show();

                sliderReset = "100%";
                seenMember = 1;
            }
            else{
                menu.children().show();
                hamb.hide();

                sliderReset = "33.33%";
                seenMember = 2;
            }

            membersList.children().css("right", sliderReset);
            skillsSet(seenMember);
        });
    }

    function teamSliderWithSkillsSetInit(){
        var leftButton = $("#teamButtonLeft");
        var rightButton = $("#teamButtonRight");
        var membersList = $(".membersList").eq(0);
        var numberOfElements = membersList.children().length;
        var animationTime = 200;
        var animationOffsetLeft = { right: "0%"};
        var winSize = $(window).width();

        var sliderReset;
        var animationOffsetRight;
        var seenMember;

        if(winSize < 900){
            seenMember = 1;
        }
        else{
            seenMember = 2;
        }

        skillsSet(seenMember);

        rightButton.on("click", function(){
            var winSize = $(window).width();

            if(winSize < 900){
                animationOffsetRight = { right: "200%"};
                sliderReset = "100%";
                seenMember = 1;
            }
            else{
                animationOffsetRight = { right: "66.67%"};
                sliderReset = "33.33%";
                seenMember = 2;
            }

            for(var i = 0; i < numberOfElements; i++){
                membersList.children().eq(i).animate(animationOffsetRight, animationTime, function(){
                    membersList.children().css("right", sliderReset);
                });
            }
            membersList.children().promise().done(function(){
                membersList.children().first().appendTo(membersList);
                skillsSet(seenMember);
            });
        });

        leftButton.on("click", function(){
            var winSize = $(window).width();

            if(winSize < 900){
                sliderReset = "100%";
                seenMember = 1;
            }
            else{
                sliderReset = "33.33%";
                seenMember = 2;
            }

            for(var i = 0; i < numberOfElements; i++){
                membersList.children().eq(i).animate(animationOffsetLeft, animationTime, function(){
                    membersList.children().css("right", sliderReset);
                });
            }
            membersList.children().promise().done(function() {
                membersList.children().last().prependTo(membersList);
                skillsSet(seenMember);
            });
        });
    }

    function skillsSet(seenMember){
        var skills = $(".skill");
        var dataName = ["webdesign", "gfxdesign", "htmlcss", "uiux"];
        var skillMeter = $(".skillMeter");
        var value = 0;
        var animationTime = 200;
        var currentMember = $(".member").eq(seenMember);

        for(var i = 0; i < skills.length; i++) {
            value = currentMember.data(dataName[i]);
            skills.eq(i).children().eq(0).children().eq(0).html(value);
            skillMeter.eq(i).children().eq(0).animate({ width: value }, animationTime);
        }
    }
});
