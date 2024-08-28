

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











// Function to submit the RSVP
function submitRSVP(isAttending) {
    const form = document.querySelector(`#rsvp_majlis_1_${isAttending ? 'hadir' : 'tidak'} form`);
    const nameInputs = form.querySelectorAll('input[name="nama[]"]');
    const countInput = form.querySelector('input[name="jumlah"]');
    
    let names = [];
    nameInputs.forEach(input => {
        if (input.value.trim()) {
            names.push(input.value.trim());
        }
    });

    // For "Hadir" form, also check for the count
    const count = isAttending ? parseInt(countInput.value) : 0;

    if (names.length > 0 && (isAttending ? count > 0 : true)) {
        // Add RSVP to Firestore
        db.collection('rsvps').add({
            name: names.join(', '),
            count: isAttending ? count : 0,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            // Clear the form
            form.reset();
            // Close the offcanvas
            const offcanvas = bootstrap.Offcanvas.getInstance(document.querySelector(`#rsvp_majlis_1_${isAttending ? 'hadir' : 'tidak'}`));
            if (offcanvas) {
                offcanvas.hide();
            }
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
            rsvpItem.innerHTML = `<strong>${rsvp.name}:</strong> <p>Number of People: ${rsvp.count}</p>`;
            rsvpList.appendChild(rsvpItem);
        });
    });
}

// Load RSVPs on page load
document.addEventListener('DOMContentLoaded', () => {
    displaySpeeches();
    displayRSVPs();

    // Add event listeners for submit buttons
    document.querySelectorAll('.rsvp_1_hadir_save').forEach(button => {
        button.addEventListener('click', () => submitRSVP(true));
    });

    document.querySelectorAll('.rsvp_1_tidak_save').forEach(button => {
        button.addEventListener('click', () => submitRSVP(false));
    });
});
