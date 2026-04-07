const loginSection = document.getElementById('login-section');
const signupSection = document.getElementById('signup-section');
const toSignupLink = document.getElementById('to-signup');
const toLoginLink = document.getElementById('to-login');

// লগইন থেকে সাইন-আপে যাওয়া
toSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.style.display = 'none';
    signupSection.style.display = 'block';
});

// সাইন-আপ থেকে লগইনে আসা
toLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupSection.style.display = 'none';
    loginSection.style.display = 'block';
});



import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const auth = getAuth();

// নতুন ইউজার রেজিস্ট্রেশন ফাংশন
const registerUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // ইউজার তৈরি হওয়ার পর ভেরিফিকেশন ইমেল পাঠানো
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    alert("আপনার ইমেলে একটি ভেরিফিকেশন লিঙ্ক পাঠানো হয়েছে। দয়া করে চেক করুন।");
                });
        })
        .catch((error) => {
            alert("ভুল হয়েছে: " + error.message);
        });
};