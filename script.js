let startTime;
let elapsed = 0;
let timer;
let running = false;
let laps = 0;

function startPause(){

    if(!running){

        startTime = Date.now() - elapsed;

        timer = setInterval(update,10);

        running = true;

        document.getElementById("startBtn").innerHTML = "Pause";

        document.getElementById("status").innerHTML = "Running";
    }
    else{

        clearInterval(timer);

        running = false;

        document.getElementById("startBtn").innerHTML = "Start";

        document.getElementById("status").innerHTML = "Paused";
    }
}

function update(){

    elapsed = Date.now() - startTime;

    let ms = Math.floor(elapsed % 1000);

    let sec = Math.floor(elapsed / 1000);

    let min = Math.floor(sec / 60);

    let hr = Math.floor(min / 60);

    sec %= 60;
    min %= 60;

    document.getElementById("display").innerHTML =
    `${pad(hr)}:${pad(min)}:${pad(sec)}`;

    document.getElementById("milliseconds").innerHTML =
    pad(ms,3);
}

function pad(num,size=2){
    return String(num).padStart(size,'0');
}

function lapTime(){

    if(!running) return;

    laps++;

    let li = document.createElement("li");

    li.innerHTML = `
    Lap ${laps}
    <span>
    ${document.getElementById("display").innerHTML}
    <button class="delete"
    onclick="this.parentElement.parentElement.remove()">
    X
    </button>
    </span>
    `;

    document.getElementById("laps").appendChild(li);

    document.getElementById("lapCount").innerHTML = laps;
}

function reset(){

    clearInterval(timer);

    running = false;

    elapsed = 0;

    laps = 0;

    document.getElementById("display").innerHTML = "00:00:00";

    document.getElementById("milliseconds").innerHTML = "000";

    document.getElementById("laps").innerHTML = "";

    document.getElementById("lapCount").innerHTML = "0";

    document.getElementById("status").innerHTML = "Ready";

    document.getElementById("startBtn").innerHTML = "Start";
}

setInterval(() => {

    document.getElementById("date").innerHTML =
    new Date().toLocaleString();

},1000);

// Keyboard controls

document.addEventListener("keydown",(e)=>{

    if(e.code === "Space")
        startPause();

    if(e.key === "r")
        reset();

    if(e.key === "l")
        lapTime();
});