document.body.style.overflow = "hidden"; // disable scroll

window.addEventListener("load", function () {
    let loader = document.getElementById("loader");
    loader.style.display = "none";

    let button = document.querySelector(".close_gate");

    button.addEventListener("click", function () {
        let gate = document.getElementById("gate");

        gate.style.display = "none";
        document.body.style.overflow = "auto"; // enable scroll

        if (jenis_ekad == "Luxury") {
            let lagu = document.getElementById("lagus");

            if (jumlah_majlis) {
                let splide = new Splide(".splide", {
                    type: "slide",
                    rewind: true,
                    perPage: 1,
                    autoplay: true,
                    interval: 4000,
                    speed: 1000,
                    adaptiveHeight: true,
                });

                splide.mount();
            }

            lagu.play();

            $(".animate").addClass(
                "animate__animated animate__fadeInDown animate__slow"
            );
            $(".animate_zoomin").addClass(
                "animate__animated animate__zoomIn animate__slow"
            );
            $(".animate_up").addClass(
                "animate__animated animate__fadeInUp animate__slow"
            );
            $(".animate_down").addClass(
                "animate__animated animate__fadeInDown animate__slow"
            );
            $(".animate_left").addClass(
                "animate__animated animate__fadeInLeft animate__slow"
            );
            $(".animate_right").addClass(
                "animate__animated animate__fadeInRight animate__slow"
            );
            $(".animate2").addClass(
                "animate__animated animate__fadeInUp animate__slow"
            );
            $(".animate3").addClass(
                "animate__animated animate__zoomIn animate__slow"
            );
        } //
        else if (jenis_ekad == "Simple") {
            $(".animate_zoomin").addClass(
                "animate__animated animate__zoomIn animate__slow"
            );
        } //
        else {
            let lagu = document.getElementById("lagus");

            lagu.play();

            $(".animate_zoomin").addClass(
                "animate__animated animate__zoomIn animate__slow"
            );
        }
    });

    AOS.init({
        duration: 2000,
        // offset: window.innerHeight / 2
    });

    // Autosize
    autosize($(".autosize"));
});
