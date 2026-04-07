// সার্চ বাটনে ক্লিক লজিক আপডেট
document.querySelector('.btn-search').addEventListener('click', async (e) => {
    e.preventDefault(); // পেজ যেন রিফ্রেশ না হয়

    const destinationInput = document.getElementById('destination').value.trim();
    const resultsContainer = document.getElementById('hotelResults');
    
    // ইনপুটকে ফরম্যাট করা (যেমন: dhaka কে Dhaka করা)
    const destination = destinationInput.charAt(0).toUpperCase() + destinationInput.slice(1).toLowerCase();

    resultsContainer.innerHTML = "<p style='text-align:center; width:100%;'>Searching for hotels in " + destination + "...</p>";

    if (destination === "") {
        alert("Please enter a city name!");
        return;
    }

    try {
        // আপনার ডাটাবেজে ফিল্ডের নাম 'City' (বড় হাতের C) তাই এখানেও 'City' হবে
        const q = query(collection(db, "hotels"), where("City", "==", destination));
        const querySnapshot = await getDocs(q);

        resultsContainer.innerHTML = ""; 

        if (querySnapshot.empty) {
            resultsContainer.innerHTML = "<p style='text-align:center; width:100%;'>No hotels found in " + destination + ".</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const hotel = doc.data();
            
            resultsContainer.innerHTML += `
                <div class="hotel-card" style="border: 1px solid #ddd; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); background: #fff;">
                    <img src="${hotel['Image-url']}" alt="${hotel.Name}" style="width: 100%; height: 200px; object-fit: cover;">
                    <div style="padding: 15px;">
                        <h3 style="margin: 0; color: #003580;">${hotel.Name}</h3>
                        <p style="color: #666; margin: 5px 0;"><i class="fa-solid fa-location-dot"></i> ${hotel.City}, ${hotel.Country}</p>
                        <p style="font-weight: bold; color: #333; font-size: 1.2rem;">Price: ${hotel.Price} BDT</p>
                        <button style="background: #003580; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; width: 100%; font-weight: 600;">Book Now</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error: ", error);
        resultsContainer.innerHTML = "<p>Error loading data. Check console for details.</p>";
    }
});




/*BOOKIG */

