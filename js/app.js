

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
            speechItem.classList.add('speech-item', 'my-3', 'p-3', 'border', 'rounded');
            speechItem.innerHTML = `<strong>${speech.name}:</strong> <p>${speech.text}</p>`;
            speechList.appendChild(speechItem);
        });
    });
}

// Function to submit the RSVP
function submitRSVP() {
    const name = document.getElementById('rsvpName').value.trim();
    const count = document.getElementById('rsvpCount').value;

    if (name && count) {
        // Add RSVP to Firestore
        db.collection('rsvps').add({
            name: name,
            count: parseInt(count),
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            // Clear the form
            document.getElementById('rsvpForm').reset();
        }).catch((error) => {
            console.error("Error adding RSVP: ", error);
        });
    } else {
        alert('Please fill out all fields.');
    }
}

// Function to display the list of RSVPs
function displayRSVPs() {
    const rsvpList = document.getElementById('rsvpList');
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
// Load speeches and RSVPs on page load
document.addEventListener('DOMContentLoaded', () => {
    displaySpeeches();
    displayRSVPs();
});
