const player_name = document.querySelector('#player-number');
const players_ul = document.querySelector('#players');
const addBtn = document.querySelector('#addPlayer');
const remBtn = document.querySelector('#remPlayer');
///players
const pSett = document.querySelector('#pSettings');
const player_menu = document.querySelector('#Player-title');
pSett.style.transition = 'opacity 0.5s';
player_menu.style.cursor = "pointer";
pSett.style.opacity = 0;
pSett.style.display = 'none';
///game mode
const mode_menu = document.querySelector('#gamem-ode-title');
const settings = document.querySelector('#Settings');
settings.style.transition = "opacity 0.5s";
mode_menu.style.cursor = "pointer";
settings.style.display = 'none';
settings.style.opacity = 0;
///other set

const other_set = document.querySelector('#other-sett');
const competition = document.querySelector('#competition');
const practice = document.querySelector('#practice');
const helpBtn1 = document.querySelector('#setHelpBtn');
const helpBtn2 = document.querySelector('#findSetHelpBtn');
other_set.style.transition = "opacity 0.5s";
other_set.style.display = 'none';
other_set.style.opacity = 0;
helpBtn1.addEventListener('click', hlpBtnIsSet);
helpBtn2.addEventListener('click', findSet);

///Start 
const startBtn = document.querySelector('#startBtn');
const table = document.querySelector('#table');
startBtn.onclick = START_action;


const li = document.querySelectorAll('li');
li.forEach((e) => {
    e.style.cursor = "pointer";
})

let players = [];
players[0] = "Játékos1";

import cards from './cards.js';
import Player from './player.js';

addBtn.addEventListener('click', () => {
    let name = player_name.value;
    let p = `<li>${name}<span class="hidden">0</span><input placeholder="név" class="nameIn" type="text"></li>`;
    players_ul.innerHTML += p;
    players[players.length] = name;
    if (players.length === 10) {
        addBtn.disabled = true;
        player_name.value = '';
    }
    else player_name.value = `Játékos${players.length + 1}`;
    remBtn.disabled = (players.length === 1);

    //namesUpdate();
})

let name_li = players_ul.children[0].lastChild;

remBtn.disabled = (players.length === 1); ///EZ SZAR ÍGY??
remBtn.addEventListener('click', () => {
    players_ul.removeChild(players_ul.childNodes[players.length + 1]);
    players.pop();
    if (players.length < 10) {
        player_name.value = `Játékos${players.length + 1}`;
    }

    remBtn.disabled = (players.length === 1);
    addBtn.disabled = false;
    //namesUpdate();
})





//namesUpdate();

///players menu fading
let hidden = true;
player_menu.addEventListener("click", fading);
function fading() {
    if (hidden) {
        pSett.removeEventListener("transitionend", end);
        pSett.style.display = '';//"helyet csinál a szövegnek"
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                pSett.style.opacity = 1;
            })
        })
        hidden = !hidden;
    } else {
        pSett.style.opacity = 0;
        pSett.addEventListener("transitionend", end, { once: true });//Megvárja amíg az opacity beállítódik
        hidden = !hidden;
    }
}

function end() {
    pSett.style.display = 'none';
}


///game mode fading
let hidden2 = true;
mode_menu.addEventListener("click", fading2);
function fading2() {
    if (hidden2) {
        settings.removeEventListener("transitionend", end2);
        settings.style.display = '';//"helyet csinál a szövegnek"
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                settings.style.opacity = 1;
            })
        })
        hidden2 = !hidden2;
    } else {
        settings.style.opacity = 0;
        settings.addEventListener("transitionend", end2, { once: true });//Megvárja amíg az opacity beállítódik
        hidden2 = !hidden2;
    }
}

function end2() {
    settings.style.display = 'none';
}


///other set fading
let hidden3 = true;
competition.addEventListener('click', fading3);
practice.addEventListener('click', fading3);
function fading3() {
    if (practice.checked) {
        if (hidden3) {
            other_set.removeEventListener("transitionend", end3);
            other_set.style.display = '';//"helyet csinál a szövegnek"
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    other_set.style.opacity = 1;
                })
            })
            hidden3 = !hidden3;
        } else if (!practice.checked) {
            other_set.style.opacity = 0;
            other_set.addEventListener("transitionend", end3, { once: true });//Megvárja amíg az opacity beállítódik
            hidden3 = !hidden3;
        }
    } else {
        other_set.style.opacity = 0;
        other_set.addEventListener("transitionend", end3, { once: true });//Megvárja amíg az opacity beállítódik
        hidden3 = !hidden3;
    }
}

function end3() {
    other_set.style.display = 'none';
}

let cells = document.querySelectorAll("#table tr td");
let users = [];


let deck = [];

///START ACTIONS
function START_action() {

    other_set.style.display = "none";
    pSett.style.display = "none";


    let setHelp = document.querySelector("#setHelp");
    let findSetHelp = document.querySelector("#findSetHelp");
    if (setHelp.checked) helpBtn1.style.display = "block";
    if (findSetHelp.checked) helpBtn2.style.display = "block";


    Array.from(players_ul.children).forEach((e) => {
        e.children[0].classList.remove("hidden");
        e.children[1].classList.add("hidden");
    });




    cells.forEach((e) => {
        e.innerText = "";
    })



    Array.from(players_ul.children).forEach((e) => {
        if(e.children[1].value != "") e.children[1].previousSibling.previousSibling.textContent = e.children[1].value;
    });





    function players_in_game() {

        Array.from(players_ul.children).forEach(e => {
            let name = e.children[0].previousSibling.textContent
            const player = new Player(name);
            users.push(player);
        });

    }
    players_in_game();


    deck = [];
    for (let i = 1; i < 28; i++) {
        deck.push(cards[i]);
    }

    console.log(deck)
    shuffle(deck);
    shuffle(deck);
    shuffle(deck);


    function generate_table() {
        cells.forEach((e) => {
            let img = document.createElement("img");
            img.id = deck[deck.length - 1];
            img.src = `icons/teli/${deck.pop()}.svg`;
            e.appendChild(img);
        })
    }
    generate_table();

    timer();
    round();
}





function round() {

    if (users.length === 1) {
        const li = document.querySelector('ul li');
        name = li.children[0].previousSibling.textContent;
        getPlayer(name).setActive(true);
        getPlayer(name).step();

    } else {

        function bindEvent() {
            let name;
            const li = document.querySelectorAll('li');
            li.forEach((e) => {
                e.onclick = function turn(e) {
                    timer();
                    name = e.target.children[0].previousSibling.textContent;
                    getPlayer(name).setActive(true);
                    getPlayer(name).step();
                }
                e.style.cursor = "pointer";
            })
        }
        bindEvent();
    }
    setTimeout(checkEnd, 500);

}

const EndDialog = document.querySelector('#endDialog');

function noSetDialog(boolean) {

    if (boolean) {
        EndDialog.style.display = "block";
        EndDialog.children[0].children[0].innerText = "Van SET!";
        let winWidth = window.innerWidth;
        EndDialog.style.left = (winWidth / 2) - 480 / 2 + "px";
    }else{
        EndDialog.style.display = "block";
        EndDialog.children[0].children[0].innerText = "Van SET!";
        let winWidth = window.innerWidth;
        EndDialog.style.left = (winWidth / 2) - 480 / 2 + "px";
    }
    document.querySelector("#confirmEndBtn").addEventListener("click", () => {
        EndDialog.style.display = "none";
    })
}





function checkEnd() {
    if (table.rows.length === 0 || !(isSet())) {
        EndDialog.style.display = "block";
        EndDialog.children[0].children[0].innerText = "Nincs több SET!";
        EndDialog.children[0].children[1].innerText = `Elért pontszám: ${users[0].getPoints()}`;
        EndDialog.children[0].children[2].innerText = `Eltelt idő: ${sec.innerText} mp`;
        let winWidth = window.innerWidth;
        EndDialog.style.left = (winWidth / 2) - 480 / 2 + "px";

        document.querySelector("#confirmEndBtn").addEventListener("click", () => {
            EndDialog.style.display = "none";
            window.location.reload(true);
        })
    }
}

function home() {
    document.querySelector("h1").style.cursor = "pointer";
    document.querySelector("h1").addEventListener("click", () => {
        window.location.reload(true);
    })
} home();





function blank() {

    if (table.rows.length > 0) {

        let rows = table.rows.length;
        let columns = table.rows[0].cells.length;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                table.rows[i].cells[j].childNodes[0].classList.remove("selected")
            }
        }
    }
    updatePoints();
    round();
}


function getTable() {
    if (table.rows.length > 0) {
        let rows = table.rows.length;
        let columns = table.rows[0].cells.length;
        let matrice = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                matrice.push(table.rows[i].cells[j].childNodes[0].id);
            }
        }
        return matrice;
    }
}

function findSet() { ///ism. nél. komb.
    if (table.rows.length > 0) {
        let array = getTable();
        let set = true;

        for (let i = 0; i < array.length - 2; i++) {
            for (let j = i + 1; j < array.length - 1; j++) {
                for (let k = j + 1; k < array.length; k++) {
                    let set = [array[i], array[j], array[k]];

                    if (checkSet(set)) return (blinking([array[i], array[j], array[k]]));
                }
            }
        }
    }
}




function isSet() { ///ism. nél. komb.
    if (table.rows.length > 0) {
        let array = getTable();
        let set = true;

        for (let i = 0; i < array.length - 2; i++) {
            for (let j = i + 1; j < array.length - 1; j++) {
                for (let k = j + 1; k < array.length; k++) {
                    let set = [array[i], array[j], array[k]];

                    if (checkSet(set)) return true
                }
            }
        }
        return false;
    }
    return false;
}




function hlpBtnIsSet() { ///ism. nél. komb.
    if (table.rows.length > 0) {
        let array = getTable();
        let set = true;

        for (let i = 0; i < array.length - 2; i++) {
            for (let j = i + 1; j < array.length - 1; j++) {
                for (let k = j + 1; k < array.length; k++) {
                    let set = [array[i], array[j], array[k]];

                    if (checkSet(set)) noSetDialog(true);
                }
            }
        }
        noSetDialog(false);
    }
    noSetDialog(false);
}




function blinking(array) {
    console.log(array)
    array.forEach(element => {
        getCell(element).style.transition = "opacity 0.8s";



        let timesRun = 0;
        let interval =
            setInterval(() => {
                timesRun++;
                if (timesRun === 2) clearInterval(interval);
                getCell(element).style.opacity = 0;
                setTimeout(() => {
                    getCell(element).style.opacity = 1;
                }, 300);
            }, 500);
    });
}

function getCell(imageID) {
    let rows = table.rows.length;
    let columns = table.rows[0].cells.length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let img = table.rows[i].cells[j].childNodes[0].id;
            if (img === imageID) return table.rows[i].cells[j].childNodes[0];
        }
    }
}


function checkSet(array) {
    let isSet = true;
    for (let i = 0; i < array[0].length; i++) {
        if (i !== 1) {
            isSet = isSet && ((array[0][i] === array[1][i] && array[1][i] === array[2][i]) ||
                (array[0][i] !== array[1][i] && array[1][i] !== array[2][i] && array[0][i] !== array[2][i]));
        }
    }
    
    return isSet;

}


function getPlayer(name) {
    return users.find(e => e.getName() === name);
}


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}


let sec = document.querySelector('#sec');

function timer() {
    if (users.length === 1) {
        let mp = 0;
        let time = setInterval(function () {
            if (table.rows.length === 0 || !(isSet())) {
                clearInterval(time);
            }
            sec.innerText = mp;
            mp += 1;
        }, 1000);

    } else {
        var timeleft = 10;
        let time = setInterval(function () {
            if (timeleft <= 0) {
                clearInterval(time);
            }
            sec.innerText = (timeleft);
            timeleft -= 1;
        }, 1000);
        return timeleft > 0;
    }
}

function updatePoints() {
    Array.from(players_ul.children).forEach((e) => {
        let name = e.firstChild.nodeValue;
        e.children[0].innerText = (users.find(e => e.getName() === name)).getPoints();

    });
}

export { deck, blank, findSet };
