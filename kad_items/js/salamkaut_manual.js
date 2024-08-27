// Copy nombor
document.getElementById("copy_no_acc").addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(no_acc);

        // Show SweetAlert2 notification
        Swal.fire({
            icon: "success",
            // title: 'Berjaya Salin',
            text: currentLanguage.alert_popup_success_text_copy_akaun,
            // timer: 2000,
            showConfirmButton: true,
            customClass: {
                confirmButton: "butang black px-5 py-2 rounded-pill",
            },
        });
    } catch (err) {
        console.error("Failed to copy: ", err);

        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to copy the account number.",
            timer: 2000,
            showConfirmButton: false,
        });
    }
});