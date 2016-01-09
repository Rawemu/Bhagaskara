$(document).ready(function(){

    stickyMenuWithSlideDownEffect();
    hamburgerMenu();
    checkMenuAndSliderOnResize();
    teamSliderWithSkillsSetInit();
    galleryOrganizer();
    citationSliderOverride();

    function stickyMenuWithSlideDownEffect() {
        var menu = $("#menu");
        var menuOffsetFromTop = menu.offset().top;
        var offsetCompensator = 1.2;

        $(window).resize(function(){
            var underMenu = $(".underMenu").eq(0);
            menuOffsetFromTop = underMenu.offset().top;
        });

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

    function galleryOrganizer(){
        var nextPictureToLoad = expandGallery(0);
        var tagChosen = "all";

        var moreButton = $("#moreButton");

        var allButton = $("#allButton");
        var webButton = $("#webButton");
        var appsButton = $("#appsButton");
        var iconsButton = $("#iconsButton");

        moreButton.on("click", function(event){
            nextPictureToLoad = expandGallery(nextPictureToLoad);
            if(nextPictureToLoad === -1){
                moreButton.html("That's all!");
                $(this).off(event);
            }
            sortGalleryByTag(tagChosen, nextPictureToLoad);
        });

        allButton.on("click", function(){
            tagChosen = "all";
            sortGalleryByTag(tagChosen,nextPictureToLoad);
            galleryButtonColorChanger(allButton);
        });
        webButton.on("click", function(){
            tagChosen = "web";
            sortGalleryByTag(tagChosen,nextPictureToLoad);
            galleryButtonColorChanger(webButton);
        });
        appsButton.on("click", function(){
            tagChosen = "apps";
            sortGalleryByTag(tagChosen,nextPictureToLoad);
            galleryButtonColorChanger(appsButton);
        });
        iconsButton.on("click",function(){
            tagChosen = "icons";
            sortGalleryByTag(tagChosen,nextPictureToLoad);
            galleryButtonColorChanger(iconsButton);
        });
    }

    function expandGallery(beginLoadingFrom){
        var gallery = $("#gallery");
        var numberOfPicturesToLoad = 3;
        var numberOfPictures = beginLoadingFrom + numberOfPicturesToLoad;

        for(var i = beginLoadingFrom; i < numberOfPictures; i++){
            var currentElementOfList = gallery.children().eq(i);

            if(currentElementOfList.length === 0){
                return -1;
            }

            var imgPath = currentElementOfList.data("imgurl");
            var newImage = $("<img src=" + imgPath + ">");
            newImage.prependTo(currentElementOfList);
            currentElementOfList.show();
        }

        return i;
    }

    function sortGalleryByTag(imgType, picturesLoaded){
        var gallery = $("#gallery");

        if(picturesLoaded === -1)
        {
            picturesLoaded = gallery.children().length;
        }

        if(imgType === "all"){
            for(var i = 0; i < picturesLoaded; i++){
                gallery.children().eq(i).show();
            }
        }
        else{
            for(var i = 0; i < picturesLoaded; i++){
                var tags = gallery.children().eq(i).data("imgtype").split(" ");
                var isTypeOfImgType = false;

                for(var j = 0; j < tags.length; j++){
                    if(tags[j] === imgType){
                        isTypeOfImgType = true;
                    }
                }

                if(isTypeOfImgType){
                    gallery.children().eq(i).show();
                }
                else{
                    gallery.children().eq(i).hide();
                }
            }
        }
    }

    function galleryButtonColorChanger(button){
        button.css("color","white");
        button.css("background-color","purple");
        button.siblings().css("color","purple");
        button.siblings().css("background-color","white");
    }

    function citationSliderOverride(){
        var circleList = $(".circles").eq(0);
        var allCircles = circleList.children();

        var stateOfAnimation = { percOfAnimationDone: 0 };
        var timeout = setTimeout(restartCitationSlider, 5000);

        citationSliderTimer(stateOfAnimation);

        allCircles.on("click", function(){
            var circleIndex = $(this).index();

            var currentCitation = getCurrentCitation(stateOfAnimation);

            clearTimeout(timeout);

            timeout = setTimeout(restartCitationSlider, 5000);

            forceSetCitationSliderValuesToDefault();
            setDesiredCircle($(this));
            setCitationSliderToChosenCitation(circleIndex, timeout, currentCitation);
        });
    }

    function setCitationSliderToChosenCitation(circleIndex, timeout, currentCitation){
        var citations = $("#citationsSlider").children();
        var desiredCitation = circleIndex * 100 + "%";

        if(citations.css("animation-play-state") === "running"){
            citations.css("right", currentCitation);
        }

        citations.css("animation-play-state","paused");

        citations.animate({right: desiredCitation}, 1000, "swing", timeout);
    }

    function restartCitationSlider(){
        var citations = $("#citationsSlider").children();

        citations.animate({right: "0%"}, 1000);
        citations.promise().done(function(){
            citations.css("animation-play-state","running");
        });
        setCitationSliderValuesToDefault();
    }

    function setDesiredCircle(activatedCircle){
        var citations = $("#citationsSlider").children();
        var circleList = $(".circles").eq(0);

        activatedCircle.removeClass("pseudo");
        circleList.removeClass("circlesAnimation");
        citations.removeClass("sliderAni");
    }

    function forceSetCitationSliderValuesToDefault(){
        var citations = $("#citationsSlider").children();
        var circleList = $(".circles").eq(0);
        var allCircles = circleList.children();

        circleList.addClass("circlesAnimation");
        allCircles.addClass("pseudo");
        citations.addClass("sliderAni");
    }

    function setCitationSliderValuesToDefault(){
        var citations = $("#citationsSlider").children();
        var circleList = $(".circles").eq(0);
        var allCircles = circleList.children();

        citations.promise().done(function(){
            circleList.addClass("circlesAnimation");
            allCircles.addClass("pseudo");
            citations.addClass("sliderAni");
        });
    }

    function citationSliderTimer(state){
        var sliderAnimationDuration = parseInt($(".sliderAni").eq(0).css("animation-duration")); //in ms
        var citations = $("#citationsSlider").children();

        window.setInterval(timer, sliderAnimationDuration * 10);

        function timer(){
            if(citations.css("animation-play-state") === "paused"){
                state.percOfAnimationDone = 0;
            }
            else if(state.percOfAnimationDone < 100){
                state.percOfAnimationDone++;
            }
            else{
                state.percOfAnimationDone = 0;
            }
        }
    }

    function getKeyframesRule(rule) {
        var stylesheets = document.styleSheets;
        for (var i = 0; i < stylesheets.length; ++i) {
            for (var j = 0; j < stylesheets[i].cssRules.length; ++j) {
                if (stylesheets[i].cssRules[j].type == window.CSSRule.KEYFRAMES_RULE &&
                    stylesheets[i].cssRules[j].name == rule) {
                    return stylesheets[i].cssRules[j]; }
            }
        }
        return null;
    }

    function getCurrentCitation(stateOfAnimation){
        var keyframes = getKeyframesRule("slider");

        for(var i = 0; i < keyframes.cssRules.length; i++){
            var keyPerc = parseFloat(keyframes.cssRules[i].cssText);
            if(stateOfAnimation.percOfAnimationDone >= keyPerc){
                var text = keyframes.cssRules[i].cssText;
                var value = text.substring(text.lastIndexOf(":")+1,text.lastIndexOf("%"));
                var currentCitation = parseFloat(value) + "%";
            }
            else{
                break;
            }
        }

        return currentCitation;
    }
});
