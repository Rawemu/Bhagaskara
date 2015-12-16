/**
 * Created by coderslab on 15.12.15.
 */

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
        var currentMember = membersList.children().eq(1);
        var numberOfElements = membersList.children().length;

        rightButton.on("click", function(){
            currentMember.prev().toggleClass("hidden");
            membersList.children().first().appendTo(membersList);
            currentMember = currentMember.next();
            if(currentMember.next().length !== 0) {
                currentMember.next().toggleClass("hidden");
            }
            else{
                membersList.children().eq(0).toggleClass("hidden");
            }
        });

        leftButton.on("click", function(){
            currentMember.next().toggleClass("hidden");
            membersList.children().last().prependTo(membersList);
            currentMember = currentMember.prev();
            if(currentMember.prev().length !== 0) {
                currentMember.prev().toggleClass("hidden");
            }
            else{
                membersList.children().eq(0).toggleClass("hidden");
            }
        });
    }

});
