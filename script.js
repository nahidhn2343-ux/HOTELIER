// ১. আধুনিক ক্যালেন্ডার সেটআপ (Flatpickr)
const checkinPicker = flatpickr("#checkin", {
    minDate: "today",
    dateFormat: "d/m/Y",
    onChange: function(selectedDates, dateStr, instance) {
        checkoutPicker.set("minDate", dateStr); 
    }
});

const checkoutPicker = flatpickr("#checkout", {
    minDate: "today",
    dateFormat: "d/m/Y",
});

// ২. গেস্ট ড্রপডাউন কন্ট্রোল
const guestTrigger = document.getElementById('guestTrigger');
const guestDropdown = document.getElementById('guestDropdown');

guestTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    guestDropdown.classList.toggle('active');
});

document.addEventListener('click', () => {
    guestDropdown.classList.remove('active');
});

guestDropdown.addEventListener('click', (e) => e.stopPropagation());

// ৩. গেস্ট ও রুম কাউন্টার আপডেট
let adults = 2;
let rooms = 1;

function updateCount(type, change) {
    if (type === 'adults') {
        adults = Math.max(1, adults + change);
        document.getElementById('adults-count').innerText = adults;
    } else {
        rooms = Math.max(1, rooms + change);
        document.getElementById('rooms-count').innerText = rooms;
    }
    
    // UI আপডেট: মূল বক্সে সংখ্যা দেখানোর জন্য
    const displayElement = document.getElementById('guestDisplay');
    displayElement.innerText = `${adults} Adult${adults > 1 ? 's' : ''}, ${rooms} Room${rooms > 1 ? 's' : ''}`;
}




/**
 * 1. Mock function to check user authentication status.
 * Currently returns false as the login system is not yet implemented.
 * You will later replace this with Firebase or Database logic.
 */
function isUserLoggedIn() {
    // Change to 'true' to test the form submission
    return false; 
}

/**
 * 2. Event Listener for the 'Send Message' button.
 * Redirects to the login page if the user is not authenticated.
 */
const sendBtn = document.querySelector(".btn-send");

if (sendBtn) {
    sendBtn.addEventListener("click", function(e) {
        if (!isUserLoggedIn()) {
            // Prevent the form from submitting
            e.preventDefault(); 
            
            // Show alert message
            alert("You don't have an account! Please login first to send a message.");
            
            // Redirect to the login page
            window.location.href = "login.html"; 
        }
    });
}



