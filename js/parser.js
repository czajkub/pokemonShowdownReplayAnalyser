
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
    if(this.players.length !== 2) {
        // TODO: return some error
        console.log("No players found.");
    }
    else {
        $("p1caption").html(this.players[0].name);
        $("p2caption").html(this.players[1].name);
    }
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