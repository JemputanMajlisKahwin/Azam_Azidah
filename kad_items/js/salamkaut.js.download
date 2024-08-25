// int-tel-input
function setupIntlTelInput_salam(
    inputElement,
    errorMsgElement,
    updateFunction
) {
    var iti_salam = intlTelInput(inputElement, {
        initialCountry: "auto",
        geoIpLookup: (callback) => {
            fetch("https://ipapi.co/json")
                .then((res) => res.json())
                .then((data) => callback(data.country_code))
                .catch(() => callback("my"));
        },
        utilsScript:
            "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.6/build/js/utils.js",
    });

    inputElement.addEventListener("input", function () {
        // Retrieve full phone number including country code
        var fullPhoneNumber = iti_salam.getNumber();
        // Update stored phone number
        updateFunction(fullPhoneNumber);
    });

    var reset = () => {
        inputElement.classList.remove("error");
        errorMsgElement.innerHTML = "";
        errorMsgElement.classList.add("hide");
    };

    inputElement.addEventListener("input", () => {
        reset();
        if (inputElement.value.trim()) {
            if (iti_salam.isValidNumber()) {
                inputElement.classList.add("is-valid");
                inputElement.classList.remove("is-invalid");
            } else {
                inputElement.classList.add("is-invalid");
                inputElement.classList.remove("is-valid");
                var errorCode = iti_salam.getValidationError();
                const errorMap = currentLanguage.tel_email.error_tel;
                errorMsgElement.innerHTML = `<i class="bi bi-exclamation-circle"></i> ${
                    errorMap[errorCode] || "Invalid phone number"
                }`;
                errorMsgElement.classList.remove("hide");
            }
        }
    });

    return iti_salam;
}

// Update function for fpx input
function updateStoredPhoneNumber3(phoneNumber) {
    $(".fpx_tel").val(phoneNumber);
}

// Initialize fpx input
var wasap3 = document.querySelector(".fpx_tel");
var errorMsg3 = document.querySelector(".label-tel-email-error-tel3");
var iti3 = setupIntlTelInput_salam(wasap3, errorMsg3, updateStoredPhoneNumber3);

$("#rm20").click(function () {
    $("#fpx_jumlah").val("20").removeClass("is-invalid").addClass("is-valid");
});
$("#rm50").click(function () {
    $("#fpx_jumlah").val("50").removeClass("is-invalid").addClass("is-valid");
});
$("#rm100").click(function () {
    s;
    $("#fpx_jumlah").val("100").removeClass("is-invalid").addClass("is-valid");
});
$("#anonymous").click(function () {
    $(".fpx_nama")
        .val(currentLanguage.label_rahsia)
        .removeClass("is-invalid")
        .addClass("is-valid");
    $(".fpx_tel")
        .val("60123456789")
        .removeClass("is-invalid")
        .addClass("is-valid");
    $(".fpx_email")
        .val("sumbanganrahsia@ekaddigital.com")
        .removeClass("is-invalid")
        .addClass("is-valid");
});

// Handle form submission
$(document).on("click", ".fpx_save", function (event) {
    event.preventDefault();
    var form_salam = $("#salam_form");

    // Reset error states
    form_salam.find(".form-control").removeClass("is-invalid");
    form_salam.find(".form-select").removeClass("is-invalid");
    form_salam.find(".invalid-feedback").hide();

    // Validate form inputs
    var isValid = true;

    form_salam.find("input, select").each(function () {
        if (!this.checkValidity()) {
            isValid = false;
            $(this).addClass("is-invalid");
            $(this).closest("section").find(".invalid-feedback").show();
        }
    });

    if (isValid) {
        var nama = form_salam.find("input[name='fpx_nama']").val();
        var phone = form_salam.find("input[name='fpx_tel']").val();
        var email = form_salam.find("input[name='fpx_email']").val();
        var jumlah = form_salam.find("input[name='fpx_jumlah']").val();

        var formValuesHtml =
            "<table class='table table-bordered text-start mt-2'>";
        formValuesHtml +=
            "<tr><th class='f-12'>" +
            currentLanguage.label_nama +
            "</th><td class='f-12'>" +
            nama +
            "</td></tr>";
        formValuesHtml +=
            "<tr><th class='f-12'>" +
            currentLanguage.label_tel +
            "</th><td class='f-12'>" +
            phone +
            "</td></tr>";
        formValuesHtml +=
            "<tr><th class='f-12'>Email</th><td class='f-12'>" +
            email +
            "</td></tr>";
        formValuesHtml +=
            "<tr><th class='f-12'>" +
            currentLanguage.label_total +
            "</th><td class='f-12'>RM " +
            jumlah +
            "</td></tr>";
        formValuesHtml += "</table>";

        Swal.fire({
            position: "center",
            icon: "info",
            title: currentLanguage.alert_popup_confirm_title,
            html:
                '<div class="fw-bold mb-3">' +
                currentLanguage.alert_popup_confirm_text +
                formValuesHtml,
            showConfirmButton: true,
            showCloseButton: true,
            confirmButtonText:
                '<i class="bi bi-check-circle-fill position-absolute top-50 translate-middle-y start-7"></i> ' +
                currentLanguage.btn_form_confirm,
            customClass: {
                confirmButton: "butang blue rounded-pill py-2 px-5 ",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                var formData = form_salam.serialize();
                var url = form_salam.attr("action");

                $("#loading-screen").show();

                $.ajax({
                    url: url,
                    method: "POST",
                    data: formData,
                    success: function (response) {
                        if (response.success) {
                            window.location.href = response.redirect_url;
                        } else if (response.errors) {
                            $("#loading-screen").hide();
                            Swal.fire({
                                toast: true,
                                position: "center",
                                icon: "error",
                                showConfirmButton: false,
                                timer: 5000,
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        $("#loading-screen").hide();
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: currentLanguage.alert_popup_error_title_salam,
                            text: currentLanguage.alert_popup_error_text_salam,
                            showCloseButton: true,
                        });
                        console.error(xhr.responseText);
                    },
                });
            }
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

    $("#salam_form")
        .find("input, select")
        .on("input change", function () {
            if (this.checkValidity()) {
                $(this).removeClass("is-invalid").addClass("is-valid");
                $(this).closest("section").find(".invalid-feedback").hide();
            } else {
                $(this).removeClass("is-valid").addClass("is-invalid");
                $(this).closest("section").find(".invalid-feedback").show();
            }
        });
});
