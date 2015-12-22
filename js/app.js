$(document).ready(function(){

    stickyMenuWithSlideDownEffect();
    hamburgerMenu();
    checkMenuAndSliderOnResize();
    teamSliderWithSkillsSetInit();
    expandGallery();

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

            if(winSize < 900){
                menu.children().hide();
                hamb.show();
            }
            else{
                menu.children().show();
                hamb.hide();
            }

            membersList.children().css("right", getSliderReset());
            skillsSet(getSeenMember());
        });
    }

    function teamSliderWithSkillsSetInit(){
        var leftButton = $("#teamButtonLeft");
        var rightButton = $("#teamButtonRight");
        var membersList = $(".membersList").eq(0);
        var numberOfElements = membersList.children().length;
        var animationTime = 200;
        var animationOffsetLeft = { right: "0%"};

        skillsSet(getSeenMember());

        rightButton.on("click", function(){
            var winSize = $(window).width();
            var animationOffsetRight;

            if(winSize < 900){
                animationOffsetRight = { right: "200%"};
            }
            else{
                animationOffsetRight = { right: "66.67%"};
            }

            for(var i = 0; i < numberOfElements; i++){
                membersList.children().eq(i).animate(animationOffsetRight, animationTime, function(){
                    membersList.children().css("right", getSliderReset());
                });
            }
            membersList.children().promise().done(function(){
                membersList.children().first().appendTo(membersList);
                skillsSet(getSeenMember());
            });
        });

        leftButton.on("click", function(){

            for(var i = 0; i < numberOfElements; i++){
                membersList.children().eq(i).animate(animationOffsetLeft, animationTime, function(){
                    membersList.children().css("right", getSliderReset());
                });
            }
            membersList.children().promise().done(function() {
                membersList.children().last().prependTo(membersList);
                skillsSet(getSeenMember());
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

    function getSeenMember(){
        var seenMember;
        var winSize = $(window).width();

        if(winSize < 900){
            seenMember = 1;
        }
        else{
            seenMember = 2;
        }

        return seenMember;
    }

    function getSliderReset(){
        var winSize = $(window).width();
        var sliderReset;

        if(winSize < 900){
            sliderReset = "100%";
        }
        else{
            sliderReset = "33.33%";
        }

        return sliderReset;
    }

    function expandGallery(){
        var gallery = $("#gallery");
        var numberOfPicturesToLoad = 3;

        for(var i = 0; i < numberOfPicturesToLoad; i++){
            var currentElementOfList = gallery.children().eq(i);
            var imgPath = currentElementOfList.data("imgurl");
            var newImage = $("<img src=" + imgPath + ">");
            newImage.prependTo(currentElementOfList);
        }
    }
});
