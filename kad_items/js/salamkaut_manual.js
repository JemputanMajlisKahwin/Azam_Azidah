

// Add event listener for the button
document.getElementById("copy_no_acc").addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(no_acc);

        // Show SweetAlert2 notification
        Swal.fire({
            icon: "success",
            text: "Nombor Akaun telah Disalin",  // Updated text
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
