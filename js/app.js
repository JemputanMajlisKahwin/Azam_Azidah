

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





// Function to submit the RSVP form
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

    if (names.length > 0 && count > 0) {
        // Add RSVP to Firestore
        db.collection('rsvps').add({
            names: names,
            count: count,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            // Clear the form
            form.reset();
            // Close the offcanvas
            const offcanvas = new bootstrap.Offcanvas(document.getElementById(form.closest('.offcanvas').id));
            offcanvas.hide();
        }).catch((error) => {
            console.error("Error adding RSVP: ", error);
        });
    } else {
        alert('Please fill out all required fields.');
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
            const rsvpItem = document.createElement('div');
            rsvpItem.classList.add('rsvp-item', 'my-3', 'p-3', 'border', 'rounded');
            rsvpItem.innerHTML = `<strong>${rsvp.names.join(', ')}:</strong> <p>Number of People: ${rsvp.count}</p>`;
            rsvpList.appendChild(rsvpItem);
        });
    });
}

// Load RSVPs on page load
document.addEventListener('DOMContentLoaded', () => {
    displaySpeeches();
    displayRSVPs();
    
    // Attach submit event listeners to forms
    const hadirForm = document.getElementById('rsvpFormHadir');
    const tidakForm = document.getElementById('rsvpFormTidak');

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
});
