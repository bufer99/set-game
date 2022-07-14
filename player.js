import { blank, deck, findSet } from './script.js';

let rows = table.rows.length;
let columns = table.rows[0].cells.length;


export default class Player {
    name;
    points;
    selected_cards;
    active;
    cards = [];

    constructor(name) {
        this.name = name;
        this.points = 0;
        this.selected_cards = 0;
        this.active = false;
        this.cards = [];
    }


    getActive() {
        return this.active;
    }

    setActive(bool) {
        this.active = bool;
    }

    addPoints(point) {
        this.points += point;
    }

    getName() {
        return this.name;
    }

    getPoints() {
        return this.points;
    }

    getSelected_cards() {
        return this.selected_cards;
    }

    addCards(n) {
        this.selected_cards += n;
    }

    cardsDef() {
        this.selected_cards = 0;
    }

    updateTableSize() {
        if (table.rows.length > 0) {
            rows = table.rows.length;
            columns = table.rows[0].cells.length;
        }
    }

    step() {
        if (table.rows.length > 0) {
            let p = this;
            if (this.getActive()) {
                this.selected_cards = 0;
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < columns; j++) {

                        table.rows[i].cells[j].onclick = function eventhandler(e) {
                            p.select(e);
                        };
                    }
                }
            }
        }

    }


    select(e) {

        if (this.getActive()) {

            if (this.getSelected_cards() < 3) {
                if (e.target.tagName === 'IMG') {
                    if (e.target.classList.contains("selected")) {
                        e.target.classList.toggle("selected");
                        this.addCards(-1);
                        let index = this.cards.indexOf(e.target.id);
                        this.cards.splice(index, 1);
                    }
                    else {
                        this.addCards(1);
                        this.cards.push(e.target.id);
                        e.target.classList.toggle("selected");
                    }
                }
            }
            if (this.getSelected_cards() === 3) {
                this.setActive(false);
                this.checkSet();

            }
        }

    }

    checkSet() {
        let isSet = true;
        for (let i = 0; i < this.cards[0].length; i++) {
            if (i !== 1) {
                isSet = isSet && ((this.cards[0][i] == this.cards[1][i] && this.cards[1][i] == this.cards[2][i]) ||
                    (this.cards[0][i] != this.cards[1][i] && this.cards[1][i] != this.cards[2][i] && this.cards[0][i] != this.cards[2][i]));
            }
        }
        if (isSet) {
            this.addPoints(1);
            setTimeout(blank, 500);
            this.newCards();
        } else {
            this.addPoints(-1);
            setTimeout(blank, 500);
        }
        this.cards = [];


    }


    sinking() {
        let k = rows - 1
        let l = columns - 1
        let changes = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < 3; j++) {

                if (table.rows[i].cells[j].children[0].id === "empty") {
                    if (i === rows - 1) break;

                    while (table.rows[k].cells[l].children[0].id === "empty" && k >= 0 && l >= 0) {

                        if (l === 0) {
                            l = columns - 1;
                            k--;
                        } else {
                            l--;
                        }
                    }
                    if (changes === 3) return;
                    changes++;
                    table.rows[i].cells[j].children[0].id = table.rows[k].cells[l].children[0].id;
                    table.rows[i].cells[j].children[0].src = table.rows[k].cells[l].children[0].src;
                    table.rows[k].cells[l].children[0].id = "";
                    table.rows[k].cells[l].children[0].src = "";
                    if (l === 0) {
                        l = columns - 1;
                        k--;
                    } else {
                        l--;
                    }

                }
            }
        }
        table.deleteRow(rows - 1);
        table.style.height *= 2 / 3;
        this.updateTableSize();
    }





    newCards() {
        if (deck.length === 0) {
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {

                    this.cards.forEach((e) => {
                        if (table.rows[i].cells[j].children[0].id === e) {
                            table.rows[i].cells[j].children[0].id = "empty";
                            table.rows[i].cells[j].children[0].src = "";
                        }
                    })
                }
            }
            this.sinking();
        } else {
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < columns; j++) {

                    this.cards.forEach((e) => {
                        if (table.rows[i].cells[j].children[0].id === e) {
                            table.rows[i].cells[j].children[0].id = deck[deck.length - 1];
                            table.rows[i].cells[j].children[0].src = `icons/teli/${deck.pop()}.svg`;
                        }
                    })
                }
            }
        }

    }



}
