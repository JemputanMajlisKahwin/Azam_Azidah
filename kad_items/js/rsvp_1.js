// kalau ada koma kat input nama
$(".rsvp1_nama").on("input", function () {
    var inputValue = $(this).val();
    // Check if the input contains a comma
    if (inputValue.match(/ and | dan | bersama | with |,|&|-|\+|\||\//i)) {
        Swal.fire({
            toast: true,
            position: "top",
            icon: "error",
            html:
                "<div class='fw-bold'>" +
                currentLanguage.alert_popup_error_text_satu_nama +
                "</div>",
            showConfirmButton: false,
            timer: 3000,
        });
        $(this).val(
            inputValue.replace(
                /(,|&| and | dan | bersama | with |-|\+|\||\/).*/,
                ""
            )
        );
    }
});

$(".rsvp1_nama_jenis2").on("input", function () {
    var inputValue = $(this).val();
    // Check if the input contains a comma
    if (inputValue.includes(",")) {
        inputValue = inputValue.replace(/,/g, " | ");
        $(this).val(inputValue);
    }
});

$(".rsvp1_pax_jenis2").on("input", function () {
    var inputValue = parseInt($(this).val(), 10);
    // If the input is less than or equal to 0, set it to 1
    if (inputValue <= 0) {
        $(this).val("1");
    }
});

// TAMBAH NAMA
var maxInputs =
    data_majlis_1["jumlah_pax_majlis_1"] > 0
        ? data_majlis_1["jumlah_pax_majlis_1"]
        : 50;
var container = $("#nama-container");
var addButton = $(".add-nama");

var x = 1;

function updateRsvp1Jumlah() {
    var totalRsvp1Nama = $(".rsvp1_nama").length;
    $(".rsvp1jumlah_input").val(totalRsvp1Nama); // update hidden jumlah input
    $("#rsvp1jumlah_display").addClass("bounce");
    $("#rsvp1jumlah_display").on("animationend", function () {
        $(this).removeClass("bounce");
    });
    $("#rsvp1jumlah_display").text(totalRsvp1Nama);
}

function maxPax() {
    Swal.fire({
        position: "center",
        icon: "error",
        html:
            "<div class='fw-bolder'>" +
            currentLanguage.alert_popup_error_text_jumlah_pax +
            " (" +
            maxInputs +
            ")</div>",
        showConfirmButton: true,
        customClass: {
            confirmButton: "butang black px-5 py-2 rounded-pill",
        },
    });
}

updateRsvp1Jumlah();

$(addButton).click(function (e) {
    e.preventDefault();
    if (x < maxInputs) {
        x++;
        var newSection =
            '<section class="mb-2" id="added_name_container">' +
            '<div class="input-group">' +
            '<span class="input-group-text"><i class="bi bi-person-circle"></i></span>' +
            '<div class="form-floating">' +
            '<input type="text" class="form-control fw-bolder rsvp1_nama carut" name="nama[]" placeholder="" autocomplete="off">' +
            '<label for="rsvp1_nama">' +
            currentLanguage.label_nama +
            " - " +
            x +
            " </label>" +
            "</div>" +
            '<button class="btn btn-danger remove-nama" type="button"><i class="bi bi-trash3-fill"></i></button>' +
            "</div>" +
            '<span class="error_rsvp1nama" style="font-size: 12px; color: red;"></span>' +
            "</section>";

        container.append(newSection);
        updateRsvp1Jumlah();

        // uncheck button bila tambah jadi penuh
        var rsvp1jumlah_display = parseInt($("#rsvp1jumlah_display").text());

        let fetchRsvp1_1 = parseInt($("#fetchRsvp_1_majlis_1").text());
        let fetchRsvp1_2 = parseInt($("#fetchRsvp_2_majlis_1").text());
        let fetchRsvp1_3 = parseInt($("#fetchRsvp_3_majlis_1").text());
        let fetchRsvp1_4 = parseInt($("#fetchRsvp_4_majlis_1").text());
        let fetchRsvp1_5 = parseInt($("#fetchRsvp_5_majlis_1").text());

        var sesi1_kapasiti1 = data_majlis_1["total_kapasiti_majlis_1"]["1"]
            ? data_majlis_1["total_kapasiti_majlis_1"]["1"]
            : "1000000";
        var sesi1_kapasiti2 = data_majlis_1["total_kapasiti_majlis_1"]["2"]
            ? data_majlis_1["total_kapasiti_majlis_1"]["2"]
            : "1000000";
        var sesi1_kapasiti3 = data_majlis_1["total_kapasiti_majlis_1"]["3"]
            ? data_majlis_1["total_kapasiti_majlis_1"]["3"]
            : "1000000";
        var sesi1_kapasiti4 = data_majlis_1["total_kapasiti_majlis_1"]["4"]
            ? data_majlis_1["total_kapasiti_majlis_1"]["4"]
            : "1000000";
        var sesi1_kapasiti5 = data_majlis_1["total_kapasiti_majlis_1"]["5"]
            ? data_majlis_1["total_kapasiti_majlis_1"]["5"]
            : "1000000";

        // Calculate the sum of rsvp1jumlah_display and fetchRsvp1_1
        var totalParticipants1 = rsvp1jumlah_display + fetchRsvp1_1;
        var totalParticipants2 = rsvp1jumlah_display + fetchRsvp1_2;
        var totalParticipants3 = rsvp1jumlah_display + fetchRsvp1_3;
        var totalParticipants4 = rsvp1jumlah_display + fetchRsvp1_4;
        var totalParticipants5 = rsvp1jumlah_display + fetchRsvp1_5;

        if (data_majlis_1["perluKapasiti"] == "Ya") {
            if (data_majlis_1["jumlahSesi"] == "1") {
                if (totalParticipants1 > sesi1_kapasiti1) {
                    $("#sesi1").prop("checked", false);
                    alert("{{ $utama['label-sesi']['alert_kapasiti'] }}");
                }
            } else {
                if (totalParticipants1 > sesi1_kapasiti1) {
                    $("#sesi1").prop("checked", false);
                }
                if (totalParticipants2 > sesi1_kapasiti2) {
                    $("#sesi2").prop("checked", false);
                }
                if (totalParticipants3 > sesi1_kapasiti3) {
                    $("#sesi3").prop("checked", false);
                }
                if (totalParticipants4 > sesi1_kapasiti4) {
                    $("#sesi4").prop("checked", false);
                }
                if (totalParticipants5 > sesi1_kapasiti5) {
                    $("#sesi5").prop("checked", false);
                }
            }
        }
    } else {
        maxPax();
    }
});

// Jenis 2 kalau max pax
$("#rsvp1_pax_jenis2").on("input", function () {
    var inputValue = parseInt($(this).val(), 10);
    if (inputValue > maxInputs) {
        maxPax();
        $("#rsvp1_pax_jenis2").val(maxInputs);
    }
});

container.on("click", ".remove-nama", function (e) {
    e.preventDefault();
    $(this).closest("section").remove();
    x--;
    updateRsvp1Jumlah();

    var rsvp1jumlah_display = parseInt($("#rsvp1jumlah_display").text());

    var fetchRsvp1_1 = parseInt($("#fetchRsvp1_1").text());
    var sesi1_kapasiti1 = data_majlis_1["total_kapasiti_majlis_1"]["1"]
        ? data_majlis_1["total_kapasiti_majlis_1"]["1"]
        : "1000000";
    var totalParticipants1 = rsvp1jumlah_display + fetchRsvp1_1;

    if (data_majlis_1["jumlahSesi"] == "1") {
        if (data_majlis_1["perluKapasiti"] == "Ya") {
            if (totalParticipants1 > sesi1_kapasiti1) {
                $("#sesi1").prop("checked", false);
            } else {
                $("#sesi1").prop("checked", true);
            }
        } else {
            $("#sesi1").prop("checked", true);
        }
    }
});

function fetch_rsvp1() {
    $.ajax({
        url: "/fetch/rsvp-majlis-1/" + data_majlis_1["order_id"],
        type: "GET",
        dataType: "html",
        success: function (response) {
            // amik dari /fetch/rsvp1/order_id
            var sum_sesi_1_majlis_1_value = $(response)
                .filter("#sum_sesi_1_majlis_1")
                .text();
            var sum_sesi_2_majlis_1_value = $(response)
                .filter("#sum_sesi_2_majlis_1")
                .text();
            var sum_sesi_3_majlis_1_value = $(response)
                .filter("#sum_sesi_3_majlis_1")
                .text();
            var sum_sesi_4_majlis_1_value = $(response)
                .filter("#sum_sesi_4_majlis_1")
                .text();
            var sum_sesi_5_majlis_1_value = $(response)
                .filter("#sum_sesi_5_majlis_1")
                .text();

            // tunjuk total sum kat form
            $("#fetchRsvp_1_majlis_1").html(
                '<span class="f-kedua text-success" id="sumsesi1_1">' +
                    sum_sesi_1_majlis_1_value +
                    "</span>"
            );
            $("#fetchRsvp_2_majlis_1").html(
                '<span class="f-kedua text-success" id="sumsesi2_1">' +
                    sum_sesi_2_majlis_1_value +
                    "</span>"
            );
            $("#fetchRsvp_3_majlis_1").html(
                '<span class="f-kedua text-success" id="sumsesi3_1">' +
                    sum_sesi_3_majlis_1_value +
                    "</span>"
            );
            $("#fetchRsvp_4_majlis_1").html(
                '<span class="f-kedua text-success" id="sumsesi4_1">' +
                    sum_sesi_4_majlis_1_value +
                    "</span>"
            );
            $("#fetchRsvp_5_majlis_1").html(
                '<span class="f-kedua text-success" id="sumsesi5_1">' +
                    sum_sesi_5_majlis_1_value +
                    "</span>"
            );

            var fetchRsvp1_1 = parseInt(sum_sesi_1_majlis_1_value);
            var fetchRsvp1_2 = parseInt(sum_sesi_2_majlis_1_value);
            var fetchRsvp1_3 = parseInt(sum_sesi_3_majlis_1_value);
            var fetchRsvp1_4 = parseInt(sum_sesi_4_majlis_1_value);
            var fetchRsvp1_5 = parseInt(sum_sesi_5_majlis_1_value);

            var sesi1_kapasiti1 = data_majlis_1["total_kapasiti_majlis_1"]["1"]
                ? data_majlis_1["total_kapasiti_majlis_1"]["1"]
                : "1000000";
            var sesi1_kapasiti2 = data_majlis_1["total_kapasiti_majlis_1"]["2"]
                ? data_majlis_1["total_kapasiti_majlis_1"]["2"]
                : "1000000";
            var sesi1_kapasiti3 = data_majlis_1["total_kapasiti_majlis_1"]["3"]
                ? data_majlis_1["total_kapasiti_majlis_1"]["3"]
                : "1000000";
            var sesi1_kapasiti4 = data_majlis_1["total_kapasiti_majlis_1"]["4"]
                ? data_majlis_1["total_kapasiti_majlis_1"]["4"]
                : "1000000";
            var sesi1_kapasiti5 = data_majlis_1["total_kapasiti_majlis_1"]["5"]
                ? data_majlis_1["total_kapasiti_majlis_1"]["5"]
                : "1000000";

            if (data_majlis_1["perluKapasiti"] == "Ya") {
                for (let i = 1; i <= 5; i++) {
                    if (eval(`fetchRsvp1_${i}`) >= eval(`sesi1_kapasiti${i}`)) {
                        $(`#sesi_${i}_majlis_1`)
                            .prop("disabled", true)
                            .prop("checked", false);
                        $(`.sesi_${i}_majlis_1_opacity`).addClass("opacity-25");
                        $(`#fetchRsvp_${i}_majlis_1`).hide();
                        $(`#penuh${i}`).show();
                    } else {
                        $(`#sesi_${i}_majlis_1`).prop("disabled", false);
                        $(`.sesi_${i}_majlis_1_opacity`).removeClass(
                            "opacity-25"
                        );
                        $(`#fetchRsvp_${i}_majlis_1`).show();
                        $(`#penuh${i}`).hide();
                    }
                }

                // hide form bila semua dah full
                var formFull = true;
                for (let i = 1; i <= data_majlis_1["jumlahSesi"]; i++) {
                    if (eval(`fetchRsvp1_${i}`) < eval(`sesi1_kapasiti${i}`)) {
                        formFull = false;
                        break;
                    }
                }

                if (formFull) {
                    $("#form").hide();
                    $("#formfull").show();
                }
            }
        },
    });
}
fetch_rsvp1();

// dapatkan masa sesi
// kena buat variable sebab tak boleh guna nombor
function updateSessionMap() {
    return {
        sesi_1_majlis_1: currentLanguage.masa_sesi_1_majlis_1,
        sesi_2_majlis_1: currentLanguage.masa_sesi_2_majlis_1,
        sesi_3_majlis_1: currentLanguage.masa_sesi_3_majlis_1,
        sesi_4_majlis_1: currentLanguage.masa_sesi_4_majlis_1,
        sesi_5_majlis_1: currentLanguage.masa_sesi_5_majlis_1,
    };
}

let sessionMap = updateSessionMap();

$("input[name=sesi_majlis_1]").change(function () {
    for (let i = 1; i <= 5; i++) {
        const sessionId = `sesi_${i}_majlis_1`;
        if (this.id === sessionId && this.checked) {
            $(".value-masa-sesi-majlis-1").val(sessionMap[sessionId]);
            break;
        }
    }
});

// int-tel-input
function setupIntlTelInput(inputElement, errorMsgElement, updateFunction) {
    var iti = intlTelInput(inputElement, {
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
        var fullPhoneNumber = iti.getNumber();
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
            if (iti.isValidNumber()) {
                inputElement.classList.add("is-valid");
                inputElement.classList.remove("is-invalid");
            } else {
                inputElement.classList.add("is-invalid");
                inputElement.classList.remove("is-valid");
                var errorCode = iti.getValidationError();
                const errorMap = currentLanguage.tel_email.error_tel;
                errorMsgElement.innerHTML = `<i class="bi bi-exclamation-circle"></i> ${
                    errorMap[errorCode] || "Invalid phone number"
                }`;
                errorMsgElement.classList.remove("hide");
            }
        }
    });

    return iti;
}

// Update function for first input
function updateStoredPhoneNumber(phoneNumber) {
    $("#whatsapp_tetamu").val(phoneNumber);
}

// Update function for second input
function updateStoredPhoneNumber2(phoneNumber) {
    $("#whatsapp_tetamu2").val(phoneNumber);
}

// Initialize first input
var wasap = document.querySelector("#whatsapp_tetamu");
var errorMsg = document.querySelector(".label-tel-email-error-tel");
var iti1 = setupIntlTelInput(wasap, errorMsg, updateStoredPhoneNumber);

// Initialize second input
var wasap2 = document.querySelector("#whatsapp_tetamu2");
var errorMsg2 = document.querySelector(".label-tel-email-error-tel2");
var iti2 = setupIntlTelInput(wasap2, errorMsg2, updateStoredPhoneNumber2);

// Synchronize input values between the two fields
wasap.addEventListener("input", () => {
    if (wasap.value !== wasap2.value) {
        wasap2.value = wasap.value;
        wasap2.dispatchEvent(new Event("input"));
    }
});

wasap2.addEventListener("input", () => {
    if (wasap2.value !== wasap.value) {
        wasap.value = wasap2.value;
        wasap.dispatchEvent(new Event("input"));
    }
});

// SUBMIT FORM HADIR
$(document).on("click", ".rsvp_1_hadir_save", function (event) {
    event.preventDefault();
    var form_hadir = $("#rsvp_hadir_majlis_1_form");
    $(".radio_sesi").removeClass("border-danger rounded border px-2 pb-2 mt-2");

    // Reset error states
    form_hadir.find(".form-control").removeClass("is-invalid");
    form_hadir.find(".form-select").removeClass("is-invalid");
    form_hadir.find(".invalid-feedback").hide();

    // Validate form inputs
    var isValid = true;

    form_hadir.find("input, select").each(function () {
        if (!this.checkValidity()) {
            isValid = false;
            $(this).addClass("is-invalid");
            $(this).closest("section").find(".invalid-feedback").show();
        }
    });

    // Validate radio buttons
    if (!$("input[name='sesi_majlis_1']:checked").length) {
        isValid = false;
        $(".radio_sesi").addClass(
            "border-danger rounded border px-2 pb-2 mt-2"
        );
    }

    $("input[name=sesi_majlis_1]").change(function () {
        if (
            this.id === "sesi_1_majlis_1" ||
            this.id === "sesi_2_majlis_1" ||
            this.id === "sesi_3_majlis_1" ||
            this.id === "sesi_4_majlis_1" ||
            (this.id === "sesi_5_majlis_1" && this.checked)
        ) {
            isValid = true;
            $(".radio_sesi").removeClass(
                "border-danger rounded border px-2 pb-2 mt-2"
            );
        }
    });

    if (isValid) {
        // dapatkan value input
        if (data_majlis_1["style_rsvp"] == "Style 2") {
            var nama = form_hadir.find("input[name='nama[]']").val();
        } else {
            var nama = $(".rsvp1_nama")
                .map(function () {
                    return $(this).val();
                })
                .get()
                .filter(Boolean)
                .join(" | ");
        }

        var kehadiran = form_hadir.find("input[name='kehadiran']").val();
        var sesi = form_hadir.find("input[name='sesi_majlis_1']").val();
        var masa_sesi = form_hadir.find("input[name='masa_sesi_input1']").val();
        var pax = form_hadir.find("input[name='jumlah']").val();
        var email = form_hadir.find("input[name='email_tetamu']").val();
        var phone = form_hadir.find("input[name='whatsapp_tetamu']").val();

        if (data_majlis_1["soalan_tambahan"] == "Pilihan pihak pengantin") {
            var hubungan = form_hadir
                .find("select[name='rsvp1_hubungan']")
                .val();
        } else {
            var hubungan = form_hadir
                .find("input[name='rsvp1_hubungan']")
                .val();
        }

        // Buat Table value
        var formValuesHtml =
            "<table class='table table-bordered text-start mt-2'>";
        formValuesHtml +=
            "<tr><th class='f-12'>" +
            currentLanguage.label_kehadiran +
            "</th><td class='f-12 text-success'>" +
            kehadiran +
            " <i class='bi bi-check-circle'></i></td></tr>";
        formValuesHtml +=
            "<tr><th class='f-12'>" +
            currentLanguage.label_nama +
            "</th><td class='f-12'>" +
            nama +
            "</td></tr>";
        if (data_majlis_1["soalan_tambahan"] != "Tidak Perlu") {
            if (data_majlis_1["soalan_tambahan"] == "Pilihan pihak pengantin") {
                formValuesHtml +=
                    "<tr><th class='f-12'>" +
                    currentLanguage.label_pihak +
                    "</th><td class='f-12'>" +
                    hubungan +
                    "</td></tr>";
            } else if (data_majlis_1["soalan_tambahan"] == "Pilihan bebas") {
                formValuesHtml +=
                    "<tr><th class='f-12'>" +
                    currentLanguage.label_hubungan +
                    "</th><td class='f-12'>" +
                    hubungan +
                    "</td></tr>";
            } else if (data_majlis_1["soalan_tambahan"] == "ID pekerja") {
                formValuesHtml +=
                    "<tr><th class='f-12'>" +
                    currentLanguage.label_id_pekerja +
                    "</th><td class='f-12'>" +
                    hubungan +
                    "</td></tr>";
            } else if (data_majlis_1["soalan_tambahan"] == "ID pelajar") {
                formValuesHtml +=
                    "<tr><th class='f-12'>" +
                    currentLanguage.label_id_pelajar +
                    "</th><td class='f-12'>" +
                    hubungan +
                    "</td></tr>";
            } else if (data_majlis_1["soalan_tambahan"] == "Nombor Plate") {
                formValuesHtml +=
                    "<tr><th class='f-12'>" +
                    currentLanguage.label_no_plate +
                    "</th><td class='f-12'>" +
                    hubungan +
                    "</td></tr>";
            } else if (data_majlis_1["soalan_tambahan"] == "Instagram") {
                formValuesHtml +=
                    "<tr><th class='f-12'>" +
                    currentLanguage.label_instagram +
                    "</th><td class='f-12'>" +
                    hubungan +
                    "</td></tr>";
            } else if (data_majlis_1["soalan_tambahan"] == "Facebook") {
                formValuesHtml +=
                    "<tr><th class='f-12'>" +
                    currentLanguage.label_facebook +
                    "</th><td class='f-12'>" +
                    hubungan +
                    "</td></tr>";
            } else if (data_majlis_1["soalan_tambahan"] == "Tiktok") {
                formValuesHtml +=
                    "<tr><th class='f-12'>" +
                    currentLanguage.label_tiktok +
                    "</th><td class='f-12'>" +
                    hubungan +
                    "</td></tr>";
            }
        }
        formValuesHtml +=
            "<tr><th class='f-12'>" +
            currentLanguage.label_jumlah_pax +
            "</th><td class='f-12'>" +
            pax +
            "</td></tr>";
        if (data_majlis_1["jumlahSesi"] != "1") {
            formValuesHtml +=
                "<tr><th class='f-12'>" +
                currentLanguage.label_sesi +
                "</th><td class='f-12'>" +
                sesi +
                " (" +
                masa_sesi +
                ")</td></tr>";
        } else {
            formValuesHtml +=
                "<tr><th class='f-12'>" +
                currentLanguage.label_masa +
                "</th><td class='f-12'>" +
                currentLanguage.masa_fullday_majlis_1 +
                "</td></tr>";
        }
        formValuesHtml +=
            "<tr><th class='f-12'>" +
            currentLanguage.label_tarikh +
            "</th><td class='f-12'>" +
            currentLanguage.tarikh_full_majlis_1 +
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
        formValuesHtml += "</table>";

        Swal.fire({
            position: "center",
            icon: "info",
            title: currentLanguage.alert_popup_confirm_title,
            html:
                '<div class="fw-bold mb-3">' +
                currentLanguage.alert_popup_confirm_text +
                formValuesHtml,
            showCloseButton: true,
            confirmButtonText:
                '<i class="bi bi-check-circle-fill position-absolute top-50 translate-middle-y start-7"></i> ' +
                currentLanguage.btn_form_confirm,
            customClass: {
                confirmButton: "butang blue rounded-pill py-2 px-5",
            },
        }).then((confirm_checkin) => {
            if (confirm_checkin.isConfirmed) {
                var formData = form_hadir.serializeArray();
                var url = form_hadir.attr("action");

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
                                title: "BERJAYA",
                                showConfirmButton: false,
                                timer: 3000,
                            });
                            form_hadir[0].reset(); // Reset the form
                            $(".finish-hadir").click(); // close modal
                            $("#form").hide();
                            $("#formfinish").show();
                            $("#formfinish_contain").html(formValuesHtml);
                        }
                    },
                    error: function (xhr, status, error) {
                        $("#loading-screen").hide();

                        // Log the details to the console for debugging
                        console.error("AJAX Request failed:", status, error);
                        console.error("Response Text:", xhr.responseText);

                        if (xhr.status === 422) {
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                title: currentLanguage.alert_popup_error_title,
                                html: currentLanguage.alert_popup_error_text_dah_isi,
                            });
                        } else {
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                title: "Error",
                                text: "Something went wrong!",
                            });
                        }
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

        $("#rsvp_hadir_majlis_1_form")
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
    }
});

// SUBMIT FORM TIDAK
$(document).on("click", ".rsvp_1_tidak_save", function (event) {
    event.preventDefault();
    var form_tidak = $("#rsvp_tidak_majlis_1_form");

    // Reset error states
    form_tidak.find(".form-control").removeClass("is-invalid");
    form_tidak.find(".form-select").removeClass("is-invalid");
    form_tidak.find(".invalid-feedback").hide();

    // Validate form inputs
    var isValid = true;

    form_tidak.find("input, select").each(function () {
        if (!this.checkValidity()) {
            isValid = false;
            $(this).addClass("is-invalid");
            $(this).closest("section").find(".invalid-feedback").show();
        }
    });

    if (isValid) {
        // dapatkan value input
        var nama = form_tidak.find("input[name='nama[]']").val();
        var kehadiran = form_tidak.find("input[name='kehadiran']").val();
        var email = form_tidak.find("input[name='email_tetamu']").val();
        var phone = form_tidak.find("input[name='whatsapp_tetamu']").val();

        if (data_majlis_1["soalan_tambahan"] == "Pilihan pihak pengantin") {
            var hubungan = form_tidak
                .find("select[name='rsvp1_hubungan']")
                .val();
        } else {
            var hubungan = form_tidak
                .find("input[name='rsvp1_hubungan']")
                .val();
        }

        // Buat Table value
        var formValuesHtml =
            "<table class='table table-bordered text-start mt-2'>";
        formValuesHtml +=
            "<tr><th class='f-12'>" +
            currentLanguage.label_kehadiran +
            "</th><td class='f-12 text-danger'>" +
            kehadiran +
            " <i class='bi bi-x-circle'></i></td></tr>";
        formValuesHtml +=
            "<tr><th class='f-12'>" +
            currentLanguage.label_nama +
            "</th><td class='f-12'>" +
            nama +
            "</td></tr>";
        if (data_majlis_1["soalan_tambahan"] == "Pilihan pihak pengantin") {
            formValuesHtml +=
                "<tr><th class='f-12'>" +
                currentLanguage.label_pihak +
                "</th><td class='f-12'>" +
                hubungan +
                "</td></tr>";
        } else if (data_majlis_1["soalan_tambahan"] == "Pilihan bebas") {
            formValuesHtml +=
                "<tr><th class='f-12'>" +
                currentLanguage.label_hubungan +
                "</th><td class='f-12'>" +
                hubungan +
                "</td></tr>";
        } else if (data_majlis_1["soalan_tambahan"] == "ID pekerja") {
            formValuesHtml +=
                "<tr><th class='f-12'>" +
                currentLanguage.label_id_pekerja +
                "</th><td class='f-12'>" +
                hubungan +
                "</td></tr>";
        } else if (data_majlis_1["soalan_tambahan"] == "ID pelajar") {
            formValuesHtml +=
                "<tr><th class='f-12'>" +
                currentLanguage.label_id_pelajar +
                "</th><td class='f-12'>" +
                hubungan +
                "</td></tr>";
        } else if (data_majlis_1["soalan_tambahan"] == "Nombor Plate") {
            formValuesHtml +=
                "<tr><th class='f-12'>" +
                currentLanguage.label_no_plate +
                "</th><td class='f-12'>" +
                hubungan +
                "</td></tr>";
        } else if (data_majlis_1["soalan_tambahan"] == "Instagram") {
            formValuesHtml +=
                "<tr><th class='f-12'>" +
                currentLanguage.label_instagram +
                "</th><td class='f-12'>" +
                hubungan +
                "</td></tr>";
        } else if (data_majlis_1["soalan_tambahan"] == "Facebook") {
            formValuesHtml +=
                "<tr><th class='f-12'>" +
                currentLanguage.label_facebook +
                "</th><td class='f-12'>" +
                hubungan +
                "</td></tr>";
        } else if (data_majlis_1["soalan_tambahan"] == "Tiktok") {
            formValuesHtml +=
                "<tr><th class='f-12'>" +
                currentLanguage.label_tiktok +
                "</th><td class='f-12'>" +
                hubungan +
                "</td></tr>";
        }
        formValuesHtml +=
            "<tr><th class='f-12'>" +
            currentLanguage.label_tarikh +
            "</th><td class='f-12'>" +
            currentLanguage.tarikh_full_majlis_1 +
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
        formValuesHtml += "</table>";

        Swal.fire({
            position: "center",
            icon: "info",
            title: currentLanguage.alert_popup_confirm_title,
            html:
                '<div class="fw-bold mb-3">' +
                currentLanguage.alert_popup_confirm_text +
                formValuesHtml,
            // showCancelButton: true,
            showCloseButton: true,
            confirmButtonText:
                '<i class="bi bi-check-circle-fill position-absolute top-50 translate-middle-y start-7"></i> ' +
                currentLanguage.btn_form_confirm,
            // cancelButtonText: currentLanguage.btn.isi_semula,
            customClass: {
                confirmButton: "butang blue rounded-pill py-2 px-5",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                var formData = form_tidak.serializeArray();
                var url = form_tidak.attr("action");

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
                                title: "BERJAYA",
                                showConfirmButton: false,
                                timer: 3000,
                            });
                            form_tidak[0].reset(); // Reset the form
                            $(".finish-tidak").click(); // close modal
                            $("#form").hide();
                            $("#formfinish").show();
                            $("#formfinish_contain").html(formValuesHtml);
                        }
                    },
                    error: function (xhr, status, error) {
                        $("#loading-screen").hide();

                        // Log the details to the console for debugging
                        console.error("AJAX Request failed:", status, error);
                        console.error("Response Text:", xhr.responseText);

                        if (xhr.status === 422) {
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                title: currentLanguage.alert_popup_error_title,
                                html: currentLanguage.alert_popup_error_text_dah_isi,
                            });
                        } else {
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                title: "Error",
                                text: "Something went wrong!",
                            });
                        }
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

        $("#rsvp_tidak_majlis_1_form")
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
    }
});
