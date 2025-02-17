var schedule = JSON.parse(localStorage.getItem("schedule"));
document.getElementById("json_input").innerHTML = JSON.stringify(schedule, null, 4);

function saveJson(){
    var json = document.getElementById("json_input").value;

    try {
        JSON.parse(json);
    } catch (error) {
        document.getElementById("save_button").value = "❌";
        return;
    }
    
    localStorage.setItem("schedule", json);
    document.getElementById("save_button").value = "✅";
}