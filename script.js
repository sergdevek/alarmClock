let tempBlock = document.querySelector('#temp');
let city = localStorage.city;
let alarm = localStorage.time;

let timezone;

function init(city) {

    document.querySelector('#yourCity').innerHTML = city;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9f7134f045ab6121250dc92a905102b0`)
        .then((resp) => { return resp.json() })
        .then((data) => {

            console.log('3 = ' + city);

            tempBlock.textContent = `${temperature()}°`;
            timezone = data.timezone / 3600;

            function temperature() {
                let getTemp = data.main.temp;
                let tempC = Math.floor(getTemp) - 273;
                return tempC;
            }
            console.log('перезапуск');
        })
        .catch(() => {
            console.log('This city not found');
            city = 'London';
            init();
            searchInp.value = '';
        })
}

let currentTime;
var audio = new Audio('Rammstein - Das Modell.mp3');

let weekDays = ["monday", "thuesday", "wensday", "thuesday", "saturday", "sunday"];

function getWeekDays(currentDayIndex) {
    return weekDays[currentDayIndex - 1];
}

function getForm(num) {
    let result;
    let numLength = String(num).length;
    if (numLength == 1) {
        result = '0' + num;
    } else {
        result = String(num);
    }
    return result;
}

function getTime() {
    let timeNow = new Date();
    document.getElementById('weekDay').innerHTML = getWeekDays(timeNow.getUTCDay());
    document.getElementById('date').innerHTML = getForm(timeNow.getUTCDate()) + '.' + getForm(timeNow.getMonth() + 1) + '.' + timeNow.getUTCFullYear();
    document.getElementById('current').innerHTML = getForm(timeNow.getUTCHours() + Math.abs(timezone)) + ':' + getForm(timeNow.getUTCMinutes());

    currentTime = getForm(timeNow.getUTCHours() + Math.abs(timezone)) + ':' + getForm(timeNow.getUTCMinutes());;
    document.getElementById('timeAlarm').innerHTML = alarm;
    console.log(alarm + '   ==   ' + currentTime);
    if (alarm == currentTime) {
        var newWin = window.open("audioPlayer.html", "width=200,height=200");
        newWin.document.innerHTML = audio.play();
    }

}

init(city);

setInterval(getTime, 1000);