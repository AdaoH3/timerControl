// timer.js

document.addEventListener('DOMContentLoaded', function() {
    startTimer();
});

function startTimer() 
{
    const initialTime = localStorage.getItem('enteredText'); // Retrieve the enteredText from local storage
    // Parse the time value into hours, minutes, and seconds
    const [hours, minutes, seconds] = initialTime.split(":").map(Number);

    // Calculate the total time in seconds
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Update the timer display immediately
    updateDisplay(totalSeconds);

    // Start the countdown
    const countdownInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            console.log("Times Up");
        } else {
            totalSeconds--;
            updateDisplay(totalSeconds);
        }
    }, 1000);
}

function updateDisplay(totalSeconds) {
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
    document.getElementById("timer").textContent = formattedTime;
}
