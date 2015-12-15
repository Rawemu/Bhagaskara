/**
 * Created by coderslab on 15.12.15.
 */

$(document).ready(function(){

    function stickyMenu() {
        var stickyStarts = false;
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



    stickyMenu();
});
