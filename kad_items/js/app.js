document.body.style.overflow = "hidden"; // disable scroll

window.addEventListener("load", function () {

		
	
// Main enter button functionality


let button = document.querySelector(".enter-btn");

    button.addEventListener("click", function () {
        let gate = document.getElementById("gate");
        const doors = document.querySelectorAll('.sliding-doors');
        const bodySliding = document.getElementById('bodySliding');
        const EntbuttonClick = document.querySelector('.enter-btn');
        
        // Trigger sliding doors and fade effect
        doors.forEach(door => {
            door.classList.toggle('open');
        });
        
        // Add the fade class after a slight delay
        setTimeout(() => {
            bodySliding.classList.toggle('fade');
            EntbuttonClick.classList.toggle('fade');
        }, 100); // Adjust delay if needed
        
        // Set display: none after the fade transition completes
        setTimeout(() => {
            bodySliding.style.display = 'none';
            EntbuttonClick.style.display = 'none';
        }, 2050); // 1 second for the transition + 100ms delay

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
