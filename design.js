var dark = false;
if(localStorage.getItem("theme") == "dark"){
    dark = true;
} else {
    localStorage.setItem("theme", "light");
}

if(dark){
    document.getElementById("body").style = "background-color: #434343; color: #ffffff;";
    document.getElementById("header").style = "background-color: #333;";
}

function handleThemeEmoji(){
    if(dark){
        document.getElementById("change_theme").innerText = "🌙";
    } else {
        document.getElementById("change_theme").innerText = "☀️";
    }
}

function switchTheme(){
    if(dark){
        document.getElementById("body").style = "";
        document.getElementById("header").style = "";
        document.getElementById("change_theme").innerText = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        document.getElementById("body").style = "background-color: #434343; color: #ffffff;";
        document.getElementById("header").style = "background-color: #333;";
        document.getElementById("change_theme").innerText = "🌙";
        localStorage.setItem("theme", "dark");
    }
    dark = !dark;
}