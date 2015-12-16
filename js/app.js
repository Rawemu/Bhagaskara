/**
 * Created by coderslab on 15.12.15.
 */

$(document).ready(function(){

    stickyMenuWithSlideDownEffect();
    hamburgerMenu();

    function stickyMenuWithSlideDownEffect() {
        var menu = $("#menu");
        var menuOffsetFromTop = menu.position().top;

        $(window).on("scroll", function () {
            if ($(window).scrollTop() > 1.05 * menuOffsetFromTop) {
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

        if ($(window).width() < 900) {
            menu.on("click", function () {
                menu.children().toggle();
            });
        }
    }
});
