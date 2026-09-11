import GameEnvBackground from '@assets/js/GameEnginev1.1/essentials/GameEnvBackground.js';
import Player from '@assets/js/GameEnginev1.1/essentials/Player.js';
import Npc from '@assets/js/GameEnginev1.1/essentials/Npc.js';
import GameControl from '@assets/js/GameEnginev1.1/essentials/GameControl.js';
import Shark from '@assets/js/GameEnginev1.1/Shark.js';
import GameLevelStarWars from './GameLevelStarWars.js';

class BankGame {
constructor(gameEnv) {
console.log("Initializing BankGame...");

// Store the game environment reference
this.gameEnv = gameEnv;

let width = gameEnv.innerWidth;
let height = gameEnv.innerHeight;
let path = gameEnv.path;

// Background data
const image_src_water = path + "/images/projects/bankgame/bankbg.png";
const image_data_water = {
    id: 'Bank',
    src: image_src_water,
    pixels: {height: 597, width: 340}
};

// Player Data for Octopus
const sprite_src_robber = path + "/images/projects/bankgame/chillguy.png"; // be sure to include the path
const CHILLGUY_SCALE_FACTOR = 5;
const sprite_data_robber = {
    id: 'Robber',
    name: 'mainplayer',
    greeting: "Hi I am a bank robber. I am trying to get rich quick.  I need to get to the bank and get the money before the police catch me.",
    src: sprite_src_robber,
    SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
    STEP_FACTOR: 1000,
    ANIMATION_RATE: 50,
    INIT_POSITION: { x: 0.0, y: 0.9 },  // 0% from left, 90% from top (near bottom)
    pixels: {height: 384, width: 512},
    orientation: {rows: 3, columns: 4 },
    down: {row: 0, start: 0, columns: 3 },
    downRight: {row: 1, start: 0, columns: 3, rotate: Math.PI/16 },
    downLeft: {row: 2, start: 0, columns: 3, rotate: -Math.PI/16 },
    left: {row: 2, start: 0, columns: 3 },
    right: {row: 1, start: 0, columns: 3 },
    up: {row: 3, start: 0, columns: 3 },
    upLeft: {row: 2, start: 0, columns: 3, rotate: Math.PI/16 },
    upRight: {row: 1, start: 0, columns: 3, rotate: -Math.PI/16 },
    hitbox: { widthPercentage: 0.45, heightPercentage: 0.4 },
    keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
};

// NPC Data for Byte Nomad (Smaller Version)
const sprite_src_vaultdoor = path + "/images/projects/bankgame/bankvaultdoor.png"; // be sure to include the path
const sprite_data_nomad = {
    id: 'VaultDoor',
    greeting: "You've reached the bank vault door. Enter for your reward.",
    src: sprite_src_vaultdoor,
    SCALE_FACTOR: 10,  // Adjust this based on your scaling needs
    ANIMATION_RATE: 100,
    pixels: {height: 370, width: 460},
    INIT_POSITION: { x: (width * 3 / 4), y: (height * 1 / 4)},
    orientation: {rows: 1, columns: 1 },
    down: {row: 0, start: 0, columns: 1 },  // This is the stationary npc, down is default 
    hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
    /* Interact function
    *  This function is called when the player interacts with the NPC
    *  It pauses the main game, creates a new GameControl instance with the StarWars level,
    */
    interact: function() {
      // Set a primary game reference from the game environment
      let primaryGame = gameEnv.gameControl;
      // Define the game in game level
      let levelArray = [GameLevelStarWars];
      // Define a new GameControl instance with the StarWars level
      let gameInGame = new GameControl(gameEnv.game, levelArray, { parentControl: primaryGame });
      // Pause the primary game 
      primaryGame.pause();
      // Start the game in game
      gameInGame.start();
      // Setup "callback" function to allow transition from game in gaame to the underlying game
      gameInGame.gameOver = function() {
        // Call .resume on primary game
        primaryGame.resume();
      }
    }
  };

 // Shark Data
const sprite_src_bankguard = path + "/images/projects/bankgame/bankguard.png"; // be sure to include the path
const sprite_data_bankguard = {
    id: 'Bank Guard',
    greeting: "You've been caught by the bank guard! Game over.",
    src: sprite_src_bankguard,
    SCALE_FACTOR: 5,
    ANIMATION_RATE: 100,
    pixels: {height: 496, width: 404},
    INIT_POSITION: { x: 100, y: 100},
    orientation: {rows: 4, columns: 4 },
    down: {row: 0, start: 0, columns: 4, wiggle: 0.005 },
    right: {row: 1, start: 0, columns: 4, wiggle: 0.005 },
    left: {row: 2, start: 0, columns: 4, wiggle: 0.005 },
    up: {row: 3, start: 0, columns: 4, wiggle: 0.005 },
    hitbox: { widthPercentage: 0.25, heightPercentage: 0.55
     },
      //walking area creates the box where the Shark can walk in 
    walkingArea: {
        xMin: 0, //left boundary
        xMax: width, //right boundary 
        yMin: (height * .25), //top boundary 
        yMax: (height * .55) //bottom boundary
     },
    speed: 0.5,
    direction: { x: 1, y: 1 },
    sound: new Audio(path + "/assets/audio/shark.mp3")
  };

// Nezuko NPC sprite data
const sprite_src_nezuko = path + "/images/projects/bankgame/water/nezuko.png"; // be sure to include the path
const sprite_greet_nezuko = "I've never seen you before. Are you lost? Well, even if you are.. I don't think I'm going to help you get out of here.";
const platformerLink = "https://pages.opencodingsociety.com/navigation/game.html"; // Replace this with your actual platformer game link

const sprite_data_nezuko = {
  id: 'Nezuko',
  greeting: sprite_greet_nezuko,
  src: sprite_src_nezuko,
  SCALE_FACTOR: 5,
  ANIMATION_RATE: 50,
  pixels: {height: 316, width: 189},
  INIT_POSITION: { x: (width / 1.3), y: (height / 1.3)},
  orientation: {rows: 4, columns: 3 },
  down: {row: 0, start: 0, columns: 3 },
  hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },

  onCollision: function(player) {
    window.location.href = platformerLink;
  }
};

const sprite_src_bankguard2 = path + "/images/projects/bankgame/bankguard.png";
const sprite_data_bankguard2 = {
  id: 'Bank Guard2',
  greeting: "You've been caught by the bank guard! Game over.",
  src: sprite_src_bankguard2,
  SCALE_FACTOR: 5,
  ANIMATION_RATE: 15,
  pixels: { width: 404, height: 496 },
  INIT_POSITION: { x: width / 2, y: height / 2 },
  orientation: { rows: 4, columns: 4 },
  down: { row: 0, start: 0, columns: 4 },
  right: {row: 1, start: 0, columns: 4, wiggle: 0.005 },
  left: {row: 2, start: 0, columns: 4, wiggle: 0.005 },
  up: {row: 3, start: 0, columns: 4 },
  walkingArea: {
      xMin: 0, //left boundary
      xMax: width, //right boundary 
      yMin: (height * .65), //top boundary 
      yMax: (height * .65) //bottom boundary
   },
  speed: 0.3,
  direction: { x: 1, y: 1 },
  hitbox: { widthPercentage: 0.25, heightPercentage: 0.55 }

};

this.classes = [      
  { class: GameEnvBackground, data: image_data_water },
  { class: Player, data: sprite_data_robber },
  { class: Npc, data: sprite_data_nomad },
  { class: Npc, data: sprite_data_nezuko },
  { class: Npc, data: sprite_data_bankguard2 },
  { class: Npc, data: sprite_data_bankguard }
];

  }
}

export default BankGame;