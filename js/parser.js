
function parser(log) {
    this.log = log;
    var lines = this.log.split('\n');
    this.players = [];
    for (var i = 0, len = lines.length; i < len; i++) {
        var line = lines[i];
        this.processLine(line);
    }
    this.processLine = function(line) {
        if(line.startsWith("|player|")) {
            this.addPlayer(line);
        }
    }
    this.addPlayer = function(line) {
        var fields = line.split("|");
        players.push(new Player(fields[2], fields[3]));
    }
}
class Pokemon {
    constructor(name) {
        this.name = name;
    }
}
class Player {
    constructor(num, name) {
        this.number = num[1];
        this.name = name;
    }
    monamount = 0;
    mons = [];
    addPokemon(monname) {
        this.monamount++;
        mons.push(new Pokemon(monname));
    }
}