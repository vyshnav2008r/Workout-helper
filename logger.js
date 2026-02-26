let chart;

function saveWorkout() {
    let exercise = document.getElementById("exercise").value;
    let weight = document.getElementById("weight").value;
    let reps = document.getElementById("reps").value;
    let sets = document.getElementById("sets").value;

    if (exercise === "" || weight === "" || reps === "" || sets === "") {
        alert("Please fill all fields");
        return;
    }

    let workout = {
        exercise: exercise,
        weight: parseFloat(weight),
        reps: parseInt(reps),
        sets: parseInt(sets),
        date: new Date().toLocaleDateString()
    };

    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    workouts.push(workout);
    localStorage.setItem("workouts", JSON.stringify(workouts));

    displayWorkouts();

    // Clear inputs
    document.getElementById("exercise").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("reps").value = "";
    document.getElementById("sets").value = "";
}

function displayWorkouts() {
    let historyDiv = document.getElementById("history");
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    historyDiv.innerHTML = "";
    let labels = [];
    let data = [];

    workouts.forEach(function(workout) {
        historyDiv.innerHTML += `
            <div class="history-card">
                <strong>${workout.date}</strong><br>
                ${workout.exercise.toUpperCase()}: 
                ${workout.weight}kg x ${workout.reps} reps x ${workout.sets} sets
            </div>
        `;
        labels.push(workout.date);
        data.push(workout.weight);
    });

    if (labels.length > 0) {
        drawChart(labels, data);
    }
}

function drawChart(labels, data) {
    let ctx = document.getElementById("progressChart").getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Weight Progress (kg)",
                data: data,
                borderColor: "red",
                backgroundColor: "rgba(255,0,0,0.2)",
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: false } // Better for progress tracking
            }
        }
    });
}

window.onload = function() {
    displayWorkouts();
};