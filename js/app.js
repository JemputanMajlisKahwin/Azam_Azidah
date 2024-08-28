

// Function to submit the speech
function submitSpeech() {
    const name = document.getElementById('name').value.trim();
    const text = document.getElementById('text').value.trim();

    if (name && text) {
        // Add Speech to Firestore
        db.collection('speeches').add({
            name: name,
            text: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            // Clear the form
            document.getElementById('speechForm').reset();
        }).catch((error) => {
            console.error("Error adding speech: ", error);
        });
    } else {
        alert('Please fill out both fields.');
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




document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');

    // Function to show the loading screen
    function showLoadingScreen() {
        loadingScreen.style.display = 'block';
    }

    // Function to hide the loading screen
    function hideLoadingScreen() {
        loadingScreen.style.display = 'none';
    }

    // Function to handle form submission
    function handleFormSubmission(formId, offcanvasId) {
        const form = document.getElementById(formId);
        const offcanvas = new bootstrap.Offcanvas(document.getElementById(offcanvasId));
        
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission
            showLoadingScreen(); // Show the loading screen

            submitRSVP().then(() => {
                hideLoadingScreen(); // Hide the loading screen
                offcanvas.hide(); // Hide the offcanvas
            }).catch((error) => {
                hideLoadingScreen(); // Hide the loading screen
                console.error('Error submitting RSVP: ', error);
            });
        });
    }

    // Handle form submission for attendees
    handleFormSubmission('rsvpForm', 'rsvp_majlis_1_hadir');

    // Handle form submission for non-attendees
    handleFormSubmission('rsvpForm', 'rsvp_majlis_1_tidak');

    // Load speeches and RSVPs on page load
    displaySpeeches();
    displayAttendees();
    displayNonAttendees();
});

// Submit RSVP function with promise
function submitRSVP() {
    return new Promise((resolve, reject) => {
        const name = document.querySelector('#rsvp1_nama_jenis2').value;
        const count = parseInt(document.querySelector('#rsvp1_pax_jenis2').value);
        const attending = document.querySelector('input[name="sesi_majlis_1"]').value === "1"; // Example check; adjust as needed

        // Add the data to Firestore
        db.collection('rsvps').add({
            name: name,
            count: count,
            attending: attending,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log('RSVP submitted successfully!');
            document.querySelector('#rsvpForm').reset(); // Optionally reset the form or give feedback to the user
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
}

// Function to display the list of attendees
function displayAttendees() {
    const attendeesList = document.getElementById('attendeesList');
    attendeesList.innerHTML = ''; // Clear the list before updating

    db.collection('rsvps').where('attending', '==', true).orderBy('timestamp', 'desc').onSnapshot((querySnapshot) => {
        attendeesList.innerHTML = ''; // Clear the list before updating
        querySnapshot.forEach((doc) => {
            const rsvp = doc.data();
            const rsvpItem = document.createElement('div');
            rsvpItem.classList.add('rsvp-item', 'my-3', 'p-3', 'border', 'rounded');
            rsvpItem.innerHTML = `<strong>${rsvp.name}:</strong> <p>Number of People: ${rsvp.count}</p>`;
            attendeesList.appendChild(rsvpItem);
        });
    });
}

// Function to display the list of non-attendees
function displayNonAttendees() {
    const nonAttendeesList = document.getElementById('nonAttendeesList');
    nonAttendeesList.innerHTML = ''; // Clear the list before updating

    db.collection('rsvps').where('attending', '==', false).orderBy('timestamp', 'desc').onSnapshot((querySnapshot) => {
        nonAttendeesList.innerHTML = ''; // Clear the list before updating
        querySnapshot.forEach((doc) => {
            const rsvp = doc.data();
            const rsvpItem = document.createElement('div');
            rsvpItem.classList.add('rsvp-item', 'my-3', 'p-3', 'border', 'rounded');
            rsvpItem.innerHTML = `<strong>${rsvp.name}:</strong> <p>Number of People: ${rsvp.count}</p>`;
            nonAttendeesList.appendChild(rsvpItem);
        });
    });
}
