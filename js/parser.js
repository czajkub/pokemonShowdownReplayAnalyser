$.getScript("js/displayTeam.js", function() {
    alert("Script loaded but not necessarily executed.");
});


function parser(log) {
    this.log = log;
    const lines = this.log.split('\n');
    this.players = [];
    this.processLine = function(line) {
        if(line.startsWith("|player|")) {
            this.addPlayer(line);
        }
        else if(line.startsWith("|teamsize|")) {
            const fields = line.split("|");
            if(fields[2]==="p1") {
                this.players[0].setMonAmount(fields[3]);
            }
            else {
                this.players[1].setMonAmount(fields[3]);
            }
        }
        else if(line.startsWith("|poke|")) {
            this.addPokemon(line);
        }
    }
    // add player to the players array
    this.addPlayer = function(line) {
        const fields = line.split("|");
        this.players.push(new Player(fields[2], fields[3]));
    }
    // add Pokémon to trainer
    this.addPokemon = function(line) {
        const fields = line.split("|");
        const pokefields = fields[3].split(",");
        if(fields[2]==="p1") {
            this.players[0].addPokemon(pokefields[0], pokefields[1]);
        }
        else if(fields[2]==="p2") {
            this.players[1].addPokemon(pokefields[0], pokefields[1]);
        }
    }
    for (let i = 0, len = lines.length; i < len; i++) {
        const line = lines[i];
        this.processLine(line);
    }
    console.log(this.players);
    console.log(this.players.length);
    displayTeam(this.players);
}
class Pokemon {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
    }
}
class Player {
    constructor(num, name) {
        this.number = num;
        this.name = name;
    }
    monamount = 0;
    mons = [];
    addPokemon(monname, gender) {
        this.mons.push(new Pokemon(monname, gender));
    }
    setMonAmount(monamount) {
        this.monamount = monamount;
    }
}

function displayTeam(players) {
    if(players.length !== 2) {
        // TODO: return some error
        console.log("No players found.");
        return;
    }
    $("#p1caption").text(players[0].name + "'s team");
    $("#p2caption").text(players[1].name + "'s team");
    for(var i = 0; i < players[0].monamount; i++) {
        $("#p1p"+String(i+1)).text(players[0].mons[i].name);
    }
    for(var i = 0; i < players[1].monamount; i++) {
        $("#p2p"+String(i+1)).text(players[1].mons[i].name);
    }
}