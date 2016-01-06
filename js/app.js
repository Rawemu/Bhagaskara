$(document).ready(function(){

    stickyMenuWithSlideDownEffect();
    hamburgerMenu();
    checkMenuAndSliderOnResize();
    teamSliderWithSkillsSetInit();
    galleryOrganizer();

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
        });
        webButton.on("click", function(){
            tagChosen = "web";
            sortGalleryByTag(tagChosen,nextPictureToLoad);
        });
        appsButton.on("click", function(){
            tagChosen = "apps";
            sortGalleryByTag(tagChosen,nextPictureToLoad);
        });
        iconsButton.on("click",function(){
            tagChosen = "icons";
            sortGalleryByTag(tagChosen,nextPictureToLoad);
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
});
