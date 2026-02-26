function submitWorkout() {
    let weight = parseFloat(document.getElementById("weight").value);
    let reps = parseInt(document.getElementById("reps").value);
    let sets = parseInt(document.getElementById("sets").value);

    console.log("Weight:", weight);
    console.log("Reps:", reps);
    console.log("Sets:", sets);

    let volume = weight * reps * sets;
    let oneRM = weight * (1 + reps / 30);

    document.getElementById("result").innerHTML =
    "Volume: " + volume + "<br>" +
    "Estimated 1RM: " + oneRM.toFixed(2);
}