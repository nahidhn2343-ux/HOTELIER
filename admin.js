import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyALHhhiMDNG7CV8pTYL1x3wl47LKcCSKv4",
    authDomain: "hotelier-cdd5a.firebaseapp.com",
    projectId: "hotelier-cdd5a",
    storageBucket: "hotelier-cdd5a.firebasestorage.app",
    messagingSenderId: "716934110388",
    appId: "1:716934110388:web:7610047728b10462948be1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Modal ফাংশন (window অবজেক্টে রাখা হয়েছে যাতে HTML থেকে onclick কাজ করে)
window.toggleModal = (show) => {
    document.getElementById('hotelModal').style.display = show ? 'flex' : 'none';
};

// ডাটা লোড করার ফাংশন
async function loadHotels() {
    const tableBody = document.getElementById('hotelTableBody');
    tableBody.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";
    const querySnapshot = await getDocs(collection(db, "hotels"));
    tableBody.innerHTML = "";
    querySnapshot.forEach((docSnap) => {
        const hotel = docSnap.data();
        const id = docSnap.id;
        tableBody.innerHTML += `
            <tr>
                <td><img src="${hotel['Image-url']}" class="thumb"></td>
                <td style="font-weight: 600;">${hotel.Name}</td>
                <td>${hotel.City}, ${hotel.Country}</td>
                <td style="color: #2c3e50; font-weight: 700;">${hotel.Price} BDT</td>
                <td class="action-btns">
                    <i class="fa-solid fa-edit" onclick="alert('Edit logic goes here')"></i>
                    <i class="fa-solid fa-trash" onclick="deleteHotel('${id}')"></i>
                </td>
            </tr>
        `;
    });
}

// ডাটা সেভ করা
document.getElementById('hotelForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const hotelData = {
        Name: document.getElementById('hotelName').value,
        Price: document.getElementById('hotelPrice').value,
        City: document.getElementById('hotelCity').value,
        Country: document.getElementById('hotelCountry').value,
        "Image-url": document.getElementById('hotelImg').value,
        About: document.getElementById('hotelAbout').value
    };

    try {
        await addDoc(collection(db, "hotels"), hotelData);
        alert("Hotel successfully added!");
        window.toggleModal(false);
        document.getElementById('hotelForm').reset();
        loadHotels();
    } catch (err) { alert("Error: " + err.message); }
});

// ডিলিট ফাংশন
window.deleteHotel = async (id) => {
    if(confirm("Delete this hotel?")) {
        await deleteDoc(doc(db, "hotels", id));
        loadHotels();
    }
};

// পেজ লোড হলে ফাংশন কল
loadHotels();