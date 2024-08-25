function fetch_guestbook() {
    $.ajax({
        url: "/fetch/guestbook/" + data_majlis_1["order_id"],
        type: "GET",
        dataType: "html",
        success: function (response) {
            if (response.trim() === "") {
                $("#guestbook_chat").hide();
                $(".hidekomen").show();
            } else {
                $("#guestbook_chat").html(response).show();
                $(".hidekomen").hide();
            }

            setTimeout(fetch_guestbook, 10000);
        },
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        },
    });
}

fetch_guestbook();

// Autosize
autosize($("#ucapan-guestbook"));

$(".guest_ucapan").on("keyup", function () {
    // Char Count
    var length = $(this).val().length;
    var currentElement = $("#current");
    currentElement.text(length);

    if (length >= 1000) {
        currentElement.addClass("text-danger");
        currentElement.removeClass("text-success");
    } else {
        currentElement.removeClass("text-danger");
        currentElement.addClass("text-success");
    }
});

// Handle form submission
$(document).on("click", ".guestbook_save", function (event) {
    event.preventDefault();
    var form = $("#guestbook_form");

    // Reset error states
    form.find(".form-control").removeClass("is-invalid");
    form.find(".invalid-feedback").hide();

    // Validate form inputs
    var isValid = true;

    form.find("input, textarea").each(function () {
        if (!this.checkValidity()) {
            isValid = false;
            $(this).addClass("is-invalid");
            $(this).closest("section").find(".invalid-feedback").show();
        }
    });

    if (isValid) {
        var formData = form.serialize();
        var url = form.attr("action");

        $("#loading-screen").show();

        $.ajax({
            url: url,
            method: "POST",
            data: formData,
            success: function (response) {
                $("#loading-screen").hide();

                if (response.success) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        html: currentLanguage.alert_popup_success_text_guestbook,
                        showConfirmButton: false,
                        timer: 3000,
                    });
                    form[0].reset(); // Reset the form
                    $("#current").text("0"); // Reset character count
                    $("#nama-guestbook").removeClass("is-valid");
                    $("#ucapan-guestbook")
                        .removeClass("is-valid")
                        .css("height", "");
                    $(".btn-close").click(); // close modal
                } else if (response.errors) {
                    if (response.errors.nama) {
                        $("#nama-guestbook").addClass("is-invalid");
                        $("#nama-guestbook")
                            .siblings(".invalid-feedback")
                            .text(response.errors.nama[0])
                            .show();
                    }
                    if (response.errors.ucapan) {
                        $("#ucapan-guestbook").addClass("is-invalid");
                        $("#ucapan-guestbook")
                            .siblings(".invalid-feedback")
                            .text(response.errors.ucapan[0])
                            .show();
                    }
                    Swal.fire({
                        toast: true,
                        position: "center",
                        icon: "error",
                        // title: currentLanguage.alert.betulkan,
                        showConfirmButton: false,
                        timer: 5000,
                    });
                }
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    toast: true,
                    position: "center",
                    icon: "error",
                    // title: currentLanguage.alert.isu_teknikal,
                    showConfirmButton: false,
                    timer: 5000,
                });
                console.error(xhr.responseText);
            },
        });
    } else {
        Swal.fire({
            toast: true,
            position: "top",
            icon: "error",
            title: currentLanguage.alert_popup_wajib,
            showConfirmButton: false,
            timer: 5000,
        });
    }
});

// Add input event listeners to update validity classes
$("#guestbook_form")
    .find("input, textarea")
    .on("input", function () {
        if (this.checkValidity()) {
            $(this).removeClass("is-invalid").addClass("is-valid");
            $(this).closest("section").find(".invalid-feedback").hide();
        } else {
            $(this).removeClass("is-valid").addClass("is-invalid");
            $(this).closest("section").find(".invalid-feedback").show();
        }
    });
