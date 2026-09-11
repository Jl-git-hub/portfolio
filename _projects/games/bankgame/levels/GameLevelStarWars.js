import GameEnvBackground from '@assets/js/GameEnginev1.1/essentials/GameEnvBackground.js';
import Player from '@assets/js/GameEnginev1.1/essentials/Player.js';
import Npc from '@assets/js/GameEnginev1.1/essentials/Npc.js';
import Projectile from '@assets/js/GameEnginev1.1/Projectile.js';

class GameLevelStarWars {
  constructor(gameEnv) {
    // Values dependent on GameEnv.create()
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Background data
    const image_src_bankvault = path + "images/projects/bankgame/bankvault.png"; // be sure to include the path
    const image__data_bankvault = {
        id: 'BankVault',
        src: image_src_bankvault,
        pixels: {height: 570, width: 1025}
    };

    // Player data for snowspeeder
    const sprite_src_snowspeeder = path + "images/projects/bankgame/chillguy.png"; // be sure to include the path
    const SNOWSPEEDER_SCALE_FACTOR = 6;
    const sprite_data_snowspeeder = {
        id: 'player',
        greeting: "Hi I am the bank robber. I am trying to take all the money in the vault!",
        src: sprite_src_snowspeeder,
        SCALE_FACTOR: SNOWSPEEDER_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: 0 }, 
        pixels: {height: 293, width: 358},
        orientation: {rows: 1, columns: 1 },
        down: {row: 0, start: 0, columns: 1, rotate: -Math.PI/2 },
        downRight: {row: 0, start: 0, columns: 1, rotate: -3*Math.PI/4 },
        downLeft: {row: 0, start: 0, columns: 1, rotate: -Math.PI/4 },
        left: {row: 0, start: 0, columns: 1 },
        right: {row: 0, start: 0, columns: 1, rotate: Math.PI },
        up: {row: 0, start: 0, columns: 1, rotate: Math.PI/2 },
        upLeft: {row: 0, start: 0, columns: 1, rotate: Math.PI/4 },
        upRight: {row: 0, start: 0, columns: 1, rotate: 3*Math.PI/4 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 }, // W, A, S, D
        reaction: function() {
          alert("We just got hit by a projectile!");
        }
    };

    // List of objects definitions for this level
    this.classes = [
      { class: GameEnvBackground, data: image__data_bankvault },
      { class: Player, data: sprite_data_snowspeeder },
    ];
  }
}

export default GameLevelStarWars;