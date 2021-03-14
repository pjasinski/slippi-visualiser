const fs = require('fs');
const {default: SlippiGame } = require('@slippi/slippi-js');

const slippiDir = fs.readdirSync("Z:\\slippi-mongo");
let game = null;
let metadata = null;
let frames = null;
let settings = null;
slippiDir.forEach(function(filename, i) {
    if (!fs.existsSync("Z:\\slippi-mongo\\json\\" + filename + ".json")) {
        game = new SlippiGame("Z:\\slippi-mongo\\" + filename);        
        settings = game.getSettings();
        if (settings.players[0].characterId == 2 && settings.players[1].characterId == 2) {            
            metadata = game.getMetadata();            
            frames = game.getFrames();
            data = {settings, metadata, frames};            
            fs.writeFileSync("Z:\\slippi-mongo\\json\\" + filename + ".json", "const slp_replay = {data:" + JSON.stringify(data) + "}"); 
            console.log("wrote " + filename + ".json");
        }/* else {
            console.log("skipped shitty game: " + filename);
            console.log("with chars: " + settings.players[0].characterId + " and " + settings.players[1].characterId + "\n");
        }*/
    }
});