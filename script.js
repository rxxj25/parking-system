{\rtf1\ansi\ansicpg1252\cocoartf2638
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.addEventListener('DOMContentLoaded', function() \{\
    const loginPage = document.getElementById('loginPage');\
    const signUpPage = document.getElementById('signUpPage');\
    const parkingPage = document.getElementById('parkingPage');\
    const billingPage = document.getElementById('billingPage');\
    const slots = document.querySelectorAll('.slot');\
    const bookingForm = document.getElementById('bookingForm');\
    const logoutBtn = document.getElementById('logoutBtn');\
    const checkTimeBtn = document.getElementById('checkTimeBtn');\
    const userTimeLeft = document.getElementById('userTimeLeft');\
    const timeLeftDisplay = document.getElementById('timeLeft');\
    const amountInput = document.getElementById('amount');\
    let selectedSlot = null;\
\
    // Logout functionality\
    logoutBtn.addEventListener('click', function() \{\
        localStorage.removeItem('loggedInUser');\
        localStorage.removeItem('currentSlot');\
        parkingPage.classList.add('hidden');\
        loginPage.classList.remove('hidden');\
        alert('Logged out successfully.');\
    \});\
\
    // Check Time Left button functionality\
    checkTimeBtn.addEventListener('click', function() \{\
        const username = localStorage.getItem('loggedInUser');\
        if (username) \{\
            const bookingData = JSON.parse(localStorage.getItem(`$\{username\}-booking`));\
            if (bookingData) \{\
                const \{ duration, bookingTime \} = bookingData;\
                const currentTime = new Date();\
                const bookingDate = new Date(bookingTime);\
                const timeElapsed = Math.floor((currentTime - bookingDate) / (1000 * 60 * 60)); // Hours\
                const remainingTime = duration - timeElapsed;\
\
                if (remainingTime > 0) \{\
                    userTimeLeft.textContent = `Time left: $\{remainingTime\} hours.`;\
                \} else \{\
                    userTimeLeft.textContent = 'Your parking time has expired. Please pay the fine.';\
                \}\
                userTimeLeft.classList.remove('hidden');\
            \} else \{\
                userTimeLeft.textContent = 'No booking found.';\
                userTimeLeft.classList.remove('hidden');\
            \}\
        \} else \{\
            alert('You must be logged in to check time left.');\
        \}\
    \});\
\
    // Sign up button functionality to show sign up page\
    document.getElementById('signUpBtn').addEventListener('click', function() \{\
        loginPage.classList.add('hidden');\
        signUpPage.classList.remove('hidden');\
    \});\
\
    // Back to login button functionality\
    document.getElementById('backToLoginBtn').addEventListener('click', function() \{\
        signUpPage.classList.add('hidden');\
        loginPage.classList.remove('hidden');\
    \});\
\
    // Sign up functionality\
    document.getElementById('signUpForm').addEventListener('submit', function(event) \{\
        event.preventDefault();\
        const newUsername = document.getElementById('newUsername').value;\
        const newPassword = document.getElementById('newPassword').value;\
\
        if (newUsername && newPassword) \{\
            localStorage.setItem(newUsername, newPassword);\
            alert('Sign up successful! You can now log in.');\
            signUpPage.classList.add('hidden');\
            loginPage.classList.remove('hidden');\
        \} else \{\
            alert('Please fill in all fields.');\
        \}\
    \});\
\
    // Login functionality\
    document.getElementById('loginForm').addEventListener('submit', function(event) \{\
        event.preventDefault();\
        const username = document.getElementById('username').value;\
        const password = document.getElementById('password').value;\
\
        const storedPassword = localStorage.getItem(username);\
        if (storedPassword && storedPassword === password) \{\
            localStorage.setItem('loggedInUser', username);\
            loginPage.classList.add('hidden');\
            parkingPage.classList.remove('hidden');\
            loadUserBooking(username);  // Load booking data if any\
        \} else \{\
            alert('Invalid username or password.');\
        \}\
    \});\
\
    // Load user's booking data\
    function loadUserBooking(username) \{\
        const bookingData = JSON.parse(localStorage.getItem(`$\{username\}-booking`));\
        if (bookingData) \{\
            const \{ slotId, bookingTime: storedTime, duration \} = bookingData;\
            selectedSlot = document.getElementById(slotId);\
            selectedSlot.classList.remove('available');\
            selectedSlot.classList.add('unavailable');\
            selectedSlot.textContent = 'Booked';\
            const currentTime = new Date();\
            const bookingDate = new Date(storedTime);\
            const timeElapsed = Math.floor((currentTime - bookingDate) / (1000 * 60 * 60)); // Hours\
            const remainingTime = duration - timeElapsed;\
            if (remainingTime > 0) \{\
                timeLeftDisplay.textContent = `Time left: $\{remainingTime\} hours.`;\
            \} else \{\
                timeLeftDisplay.textContent = 'Your parking time has expired. Please pay the fine.';\
            \}\
        \} else \{\
            timeLeftDisplay.textContent = '';\
        \}\
    \}\
\
    // Slot selection\
    slots.forEach(slot => \{\
        slot.addEventListener('click', function() \{\
            if (this.classList.contains('unavailable')) \{\
                alert('This slot is already booked!');\
            \} else \{\
                selectedSlot = this;\
                bookingForm.classList.remove('hidden');\
            \}\
        \});\
    \});\
\
    // Calculate amount based on duration\
    document.getElementById('duration').addEventListener('input', function() \{\
        const duration = parseInt(this.value, 10);\
        if (duration < 0 || duration > 5) \{\
            alert('Duration must be between 0 and 5 hours.');\
            return;\
        \}\
        const amount = duration * 50;\
        amountInput.value = `\uc0\u8377 $\{amount\}`;\
    \});\
\
    // Booking a slot\
    document.getElementById('bookBtn').addEventListener('click', function() \{\
        const vehicleNumber = document.getElementById('vehicleNumber').value;\
        const duration = parseInt(document.getElementById('duration').value, 10);\
\
        if (vehicleNumber.length !== 10) \{\
            alert('Vehicle number must be exactly 10 digits.');\
            return;\
        \}\
\
        if (duration < 0 || duration > 5) \{\
            alert('Duration must be between 0 and 5 hours.');\
            return;\
        \}\
\
        if (vehicleNumber && duration) \{\
            selectedSlot.classList.remove('available');\
            selectedSlot.classList.add('unavailable');\
            selectedSlot.textContent = 'Booked';\
            bookingForm.classList.add('hidden');\
            alert(`Slot booked successfully!`);\
\
            const username = localStorage.getItem('loggedInUser');\
            if (username) \{\
                localStorage.setItem(`$\{username\}-booking`, JSON.stringify(\{\
                    slotId: selectedSlot.id,\
                    bookingTime: new Date().toISOString(),\
                    duration\
                \}));\
                loadUserBooking(username); // Update time left on booking\
            \}\
        \} else \{\
            alert('Please fill in all the details.');\
        \}\
    \});\
\
    // Billing functionality\
    document.getElementById('backToParkingBtn').addEventListener('click', function() \{\
        billingPage.classList.add('hidden');\
        parkingPage.classList.remove('hidden');\
    \});\
\});\
\
}