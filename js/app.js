/**
 * Created by coderslab on 15.12.15.
 */

$(document).ready(function(){
    var menu = $("#menu");
    var menuOffsetFromTop = menu.position().top;

    $(window).on("scroll", function(){
        if($(window).scrollTop() > menuOffsetFromTop){
            menu.addClass("sticky");
        }
        else{
            menu.removeClass("sticky");
        }
    });
});
