$(document).ready(function () {
    let icon = true;

    $("#toggle-icon").click(function () {
        let lagu = $("#lagus")[0];

        if (icon) {
            lagu.pause();
            $(".lagu_icon").removeClass("bi-music-note-beamed");
            $(".lagu_icon").addClass("bi-volume-mute");
            $(".laguu").removeClass("anim");
            icon = false;
        } else {
            lagu.play();
            $(".lagu_icon").addClass("bi-music-note-beamed");
            $(".lagu_icon").removeClass("bi-volume-mute");
            $(".laguu").addClass("anim");
            icon = true;
        }
    });
});
