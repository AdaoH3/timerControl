// timer.js

document.addEventListener("DOMContentLoaded", function() {
    startTimer();
});

function sendControlRequest(functionName, pin, action) {
    fetch("http://localhost:5000/control_gpio", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            function: functionName,
            pin: pin ? pin.toString() : null,
            action: action ? action.toString() : null,
        }),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}

function startClicks(clickTimeStart) {
    fetch("http://localhost:5000/trigger_relay", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            seconds: clickTimeStart,
        }),
    })
    .then(response => response.text())
    .then(data => console.log('Server response:', data))
    .catch((error) => console.error('Error:', error));
}


function startTimer() {
    const timerElement = document.getElementById("timer"); // Initialize timerElement here
    const initialTime = localStorage.getItem('enteredText'); // Retrieve the enteredText from local storage

    // Parse the time value into hours, minutes, and seconds
    const [hours, minutes, seconds] = initialTime.split(":").map(Number);

    // Calculate the total time in seconds
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    //Starts the clicks
    startClicks(totalSeconds);

    // Update the timer display immediately
    updateDisplay(totalSeconds, timerElement);

    // Start the countdown
    const countdownInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            console.log("Times Up");
            timerElement.classList.add('blinking'); // Apply blinking class
            sendControlRequest('startDrill');
        } else {
            totalSeconds--;
            updateDisplay(totalSeconds, timerElement);
        }
    }, 1000);
}

function updateDisplay(totalSeconds, timerElement) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format the time as HH:MM:SS
    const formattedTime = [
        String(hours).padStart(2, "0"),
        String(minutes).padStart(2, "0"),
        String(seconds).padStart(2, "0")
    ].join(":");

    // Display the formatted time
    timerElement.textContent = formattedTime;
}