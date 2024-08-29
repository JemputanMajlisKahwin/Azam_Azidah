const jenis_ekad = "Luxury";


function submitRSVP(formId) {
    const form = document.getElementById(formId);
    const nameInputs = form.querySelectorAll('input[name="nama[]"]');
    const countInput = form.querySelector('input[name="jumlah"]');
    
    let names = [];
    nameInputs.forEach(input => {
        if (input.value.trim()) {
            names.push(input.value.trim());
        }
    });
    
    const count = countInput ? parseInt(countInput.value) : 0;
    
    // Show loading screen
    document.getElementById('loading-screen').style.display = 'block';
    
    if (formId === 'rsvpFormHadir') {
        // Validation for "Hadir" form
        if (names.length > 0 && count > 0) {
            // Add RSVP to Firestore
            db.collection('rsvps').add({
                names: names,
                count: count,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                // Hide loading screen and show success alert
                document.getElementById('loading-screen').style.display = 'none';
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'BERJAYA',
                    showConfirmButton: false,
                    timer: 3000
                });
                form.reset(); // Reset the form
                document.querySelector('.finish-hadir').click(); // Close modal
                document.getElementById('form').style.display = 'none';
                document.getElementById('formfinish').style.display = 'block';
                document.getElementById('formfinish_contain').innerHTML = `<strong>${names.join(', ')}</strong><p>Number of People: ${count}</p>`; // Display the form values
            }).catch((error) => {
                // Hide loading screen and show error alert
                document.getElementById('loading-screen').style.display = 'none';
                console.error("Error adding RSVP: ", error);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error',
                    text: `Something went wrong! ${error.message}`,
                });
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Validation Error',
                text: 'For attending ("Hadir"), please provide both the names and the number of people.',
            });
            // Hide loading screen if validation fails
            document.getElementById('loading-screen').style.display = 'none';
        }
    } else if (formId === 'rsvpFormTidak') {
        // Validation for "Tidak Hadir" form
        if (names.length > 0) {
            // Add RSVP to Firestore
            db.collection('rsvps').add({
                names: names,
                count: 0, // No count needed for "Tidak Hadir"
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                // Hide loading screen and show success alert
                document.getElementById('loading-screen').style.display = 'none';
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'BERJAYA',
                    showConfirmButton: false,
                    timer: 3000
                });
                form.reset(); // Reset the form
                document.querySelector('.finish-tidak').click(); // Close modal
                document.getElementById('form').style.display = 'none';
                document.getElementById('formfinish').style.display = 'block';
                document.getElementById('formfinish_contain').innerHTML = `<strong>${names.join(', ')}</strong>`; // Display the form values
            }).catch((error) => {
                // Hide loading screen and show error alert
                document.getElementById('loading-screen').style.display = 'none';
                console.error("Error adding RSVP: ", error);
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Error',
                    text: `Something went wrong! ${error.message}`,
                });
            });
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Validation Error',
                text: 'For not attending ("Tidak Hadir"), please provide at least one name.',
            });
            // Hide loading screen if validation fails
            document.getElementById('loading-screen').style.display = 'none';
        }
    }
}



// Function to display the list of RSVPs
function displayRSVPs() {
    const rsvpList = document.getElementById('attendeesList');
    rsvpList.innerHTML = ''; // Clear the list before updating

    db.collection('rsvps').orderBy('timestamp', 'desc').onSnapshot((querySnapshot) => {
        rsvpList.innerHTML = ''; // Clear the list before updating
        querySnapshot.forEach((doc) => {
            const rsvp = doc.data();
            // console.log('RSVP Data:', rsvp); // Log the data
            const names = Array.isArray(rsvp.names) ? rsvp.names : [];
            const rsvpItem = document.createElement('div');
            rsvpItem.classList.add('rsvp-item', 'my-3', 'p-3', 'border', 'rounded');
            rsvpItem.innerHTML = `<strong>${names.join(', ')}:</strong> <p>Number of People: ${rsvp.count}</p>`;
            rsvpList.appendChild(rsvpItem);
        });
    });
}


// Function to submit the speech
function submitSpeech() {
    const name = document.getElementById('name').value.trim();
    const text = document.getElementById('text').value.trim();

    if (name && text) {
        // Show loading screen
        document.getElementById('loading-screen').style.display = 'block';

        // Add Speech to Firestore
        db.collection('speeches').add({
            name: name,
            text: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            // Hide loading screen and show success alert
            document.getElementById('loading-screen').style.display = 'none';
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Speech Submitted Successfully',
                showConfirmButton: false,
                timer: 3000
            });
            // Clear the form
            document.getElementById('speechForm').reset();
            // Optionally, update the list of speeches
            displaySpeeches();
        }).catch((error) => {
            // Hide loading screen and show error alert
            document.getElementById('loading-screen').style.display = 'none';
            console.error("Error adding speech: ", error);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong while submitting the speech.',
            });
        });
    } else {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Validation Error',
            text: 'Please fill out both fields.',
        });
        // Hide loading screen if validation fails
        document.getElementById('loading-screen').style.display = 'none';
    }
}

// Function to display the list of speeches
function displaySpeeches() {
    const speechList = document.getElementById('speechList');
    speechList.innerHTML = ''; // Clear the list before updating

    db.collection('speeches').orderBy('timestamp', 'desc').onSnapshot((querySnapshot) => {
        speechList.innerHTML = ''; // Clear the list before updating
        querySnapshot.forEach((doc) => {
            const speech = doc.data();
            const speechItem = document.createElement('div');
            speechItem.classList.add('speech-item', 'my-2', 'p-2', 'border', 'rounded');
            speechItem.innerHTML = `<strong class="c-utama">${speech.name}:</strong> <p class="pre-line text_tulisan">${speech.text}</p>`;
            speechList.appendChild(speechItem);
        });
    });
}



// Load RSVPs and speeches on page load
document.addEventListener('DOMContentLoaded', () => {
    displaySpeeches(); // Load speeches
    displayRSVPs();    // Load RSVPs
    
    // Attach submit event listeners to forms

        const hadirForm = document.getElementById('rsvpFormHadir');
        const tidakForm = document.getElementById('rsvpFormTidak');
        const speechForm = document.getElementById('speechForm');
    
        if (hadirForm) {
            hadirForm.addEventListener('submit', (event) => {
                event.preventDefault();
                submitRSVP('rsvpFormHadir');
            });
        }
    
        if (tidakForm) {
            tidakForm.addEventListener('submit', (event) => {
                event.preventDefault();
                submitRSVP('rsvpFormTidak');
            });
        }
    
        if (speechForm) {
            speechForm.addEventListener('submit', (event) => {
                event.preventDefault();
                submitSpeech();
            });
        }
    });
    
