/* var schedule = [
    { name: "ZAP", room: "POREB313", day: 0, start_hours: 9, start_minutes: 45, end_hours: 12, end_minutes: 15 },
    { name: "ALG I", room: "PORUA1", prednaska: true, day: 0, start_hours: 12, start_minutes: 30, end_hours: 14, end_minutes: 0 },
    { name: "LA1", room: "PORUA1", prednaska: true, day: 0, start_hours: 14, start_minutes: 15, end_hours: 15, end_minutes: 45 },

    { name: "EL", room: "PORUA1", prednaska: true, day: 1, start_hours: 9, start_minutes: 0, end_hours: 10, end_minutes: 30 },
    { name: "ZAP", room: "PORUA1", prednaska: true, day: 1, start_hours: 10, start_minutes: 45, end_hours: 12, end_minutes: 15 },

    { name: "EL", room: "POREB130", day: 2, start_hours: 7, start_minutes: 15, end_hours: 8, end_minutes: 45 },
    { name: "TV", room: "VSH", day: 2, start_hours: 9, start_minutes: 0, end_hours: 10, end_minutes: 30 },
    { name: "PM", room: "POREC1", prednaska: true, day: 2, start_hours: 10, start_minutes: 45, end_hours: 13, end_minutes: 15 },
    { name: "ALG I", room: "POREB218", day: 2, start_hours: 15, start_minutes: 0, end_hours: 16, end_minutes: 45 },

    { name: "LA1", room: "POREA155", day: 3, start_hours: 9, start_minutes: 0, end_hours: 10, end_minutes: 30 },
    { name: "PM", room: "POREB315", day: 3, start_hours: 10, start_minutes: 45, end_hours: 12, end_minutes: 15 },
    { name: "ZP", room: "PORB5", day: 3, start_hours: 12, start_minutes: 30, end_hours: 14, end_minutes: 0 },
    { name: "Ab/II-FEI", room: "PORK308", day: 3, start_hours: 14, start_minutes: 15, end_hours: 15, end_minutes: 45 }
];
 */
var schedule = [];
if (localStorage.getItem("schedule") != null) {
    schedule = JSON.parse(localStorage.getItem("schedule"));
    console.log("Trying to load schedule from local storage");
}

//localStorage.setItem("schedule", JSON.stringify(schedule));

var date = new Date();
// Shift coz Sunday is 0
var numberdayweek = [6, 0, 1, 2, 3, 4, 5];
var day = numberdayweek[date.getDay()];

var today_schedule = [];

schedule.forEach(element => {
    if (element.day == day) {
        today_schedule.push(element);
    }
});

if (day == 5 || day == 6) {
    document.location = "https://rex.nas-lab.eu/yellin.html";
}

function getUpcomingLesson() {
    var found = false;
    var date = new Date();

    for (var i = 0; i < today_schedule.length; i++) {

        var time =  date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
        var lesson = today_schedule[i];
        var lesson_time = lesson.start_hours * 3600 + lesson.start_minutes * 60;

        if (time <= lesson_time) {
            document.getElementById("text").innerText = lesson.name + " v místnosti " + lesson.room + " od " + lesson.start_hours + ":" + lesson.start_minutes + " do " + lesson.end_hours + ":" + lesson.end_minutes;

            var show_date = new Date((lesson_time - time) * 1000);

            document.getElementById("time_remaining").innerText = ("Zbývá: " + (show_date.getUTCHours() < 10 ? "0" : "") + show_date.getUTCHours() + ":" + (show_date.getUTCMinutes() < 10 ? "0" : "") + show_date.getUTCMinutes() + ":" + (show_date.getUTCSeconds() < 10 ? "0" : "") + show_date.getUTCSeconds());

            found = true;
            break;
        }

        if (!found || today_schedule.length == 0) {
            document.getElementById("text").innerText = "Dnes nemáš" + (today_schedule.length != 0 ? " už" : "") + " žádnou výuku";
            document.getElementById("time_remaining").innerText = "Můžeš jít spát 🛌";
        }
    }
}

if(schedule.length != 0){
    getUpcomingLesson();
    setInterval(getUpcomingLesson, 1000);
}else{
    document.getElementById("text").innerText = "Nemáš nastavený rozvrh";
    document.getElementById("text").style.color = "red";
    document.getElementById("time_remaining").innerText = "Nastav si ho v nastavení";
}
function getActiveLesson(){
    var found = false;
    var date = new Date();

    for (var i = 0; i < today_schedule.length; i++) {
        var time =  date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
        var lesson = today_schedule[i];
        var lesson_time = lesson.start_hours * 3600 + lesson.start_minutes * 60;
        var lesson_end_time = lesson.end_hours * 3600 + lesson.end_minutes * 60;

        if (time >= lesson_time && time <= lesson_end_time) {   
            document.getElementById("active_lesson").innerHTML = "<b>" + lesson.name + (lesson.prednaska ? " (přednáška)" : "") + "</b> v místnosti <b>" + lesson.room + "</b> " + lesson.start_hours + ":" + lesson.start_minutes + " - " + lesson.end_hours + ":" + lesson.end_minutes;

            var show_date = new Date((lesson_end_time - time) * 1000);

            document.getElementById("lesson_left").innerText = ("Zbývá: " + (show_date.getUTCHours() < 10 ? "0" : "") + show_date.getUTCHours() + ":" + (show_date.getUTCMinutes() < 10 ? "0" : "") + show_date.getUTCMinutes() + ":" + (show_date.getUTCSeconds() < 10 ? "0" : "") + show_date.getUTCSeconds());

            found = true;
            break;
        }
    }
    if(!found){
        document.getElementById("active_lesson").innerText = "Právě není žádná výuka";
        document.getElementById("lesson_left").innerText = "";
    }
}

setInterval(getActiveLesson, 1000);
getActiveLesson();


/*
Pondělí				
ZAP	Zobrazit seznam studentů přihlášených do výukové jednotky
J. Konečný, J. Továr...
POREB313	C/02
	
ALG I	Zobrazit seznam studentů přihlášených do výukové jednotky
 
    P/01
	
LA1	Zobrazit seznam studentů přihlášených do výukové jednotky
R. Kalus
POREC1, PORUA1	P/01
            	
Úterý			
EL	Zobrazit seznam studentů přihlášených do výukové jednotky
V. Sládeček
PORUA1	P/01
	
ZAP	Zobrazit seznam studentů přihlášených do výukové jednotky
M. Prauzek, J. Rozho...
POREC1, PORUA1	P/01
                            	
Středa	
EL	Zobrazit seznam studentů přihlášených do výukové jednotky
V. Sládeček
POREB130	C/02
        	
PM	Zobrazit seznam studentů přihlášených do výukové jednotky
J. Látal, J. Skapa
POREC1	P/01
        	
ALG I	Zobrazit seznam studentů přihlášených do výukové jednotky
J. Továrek
POREB218	C/02
        	
Čtvrtek			
LA1	Zobrazit seznam studentů přihlášených do výukové jednotky
P. Jahoda
POREA155	C/10
	
PM	Zobrazit seznam studentů přihlášených do výukové jednotky
J. Látal
POREB315	C/03
	
ZP	Zobrazit seznam studentů přihlášených do výukové jednotky
J. Klega
PORB5	C/01
	
Ab/II-FEI	Zobrazit seznam studentů přihlášených do výukové jednotky
K. Exnerová
PORK308	C/23
	
*/