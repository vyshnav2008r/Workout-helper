let countdown;
let totalTime; 
const FULL_DASH_ARRAY = 283; 

function setTimer(seconds) {
    clearInterval(countdown);
    totalTime = seconds;
    startTimer(seconds);
}

function startTimer(seconds) {
    // FIX: You must define 'then' so the code knows when the timer should end
    const then = Date.now() + seconds * 1000;

    displayTimeLeft(seconds);
    setCircleDasharray(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft <= 0) {
            clearInterval(countdown);
            document.getElementById('timer-path-remaining').style.strokeDasharray = `0 283`;
            
            const beep = document.getElementById("beep-sound");
            if (beep) {
                beep.play().catch(error => {
                    console.log("Browser blocked audio. Interaction required.");
                });
            }
            
            alert("Rest over!");
            return;
        }

        displayTimeLeft(secondsLeft);
        setCircleDasharray(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.getElementById('time-left').textContent = display;
}
function startCustom() {
    const input = document.getElementById('custom-seconds');
    const seconds = parseInt(input.value); // Convert text to a real number

    console.log("Custom timer started for:", seconds, "seconds");

    if (!isNaN(seconds) && seconds > 0) {
        setTimer(seconds);
    } else {
        alert("Please enter a valid number of seconds!");
    }
}
function setCircleDasharray(secondsLeft) {
    const rawTimeFraction = secondsLeft / totalTime;
    // Calculation to adjust the SVG stroke length
    const dasharray = `${(rawTimeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`;
    document.getElementById('timer-path-remaining').style.strokeDasharray = dasharray;
}