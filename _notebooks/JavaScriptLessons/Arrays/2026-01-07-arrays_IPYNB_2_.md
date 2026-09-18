---
layout: post
courses: {'csse': {'week': 5}}
categories: ['JavaScript', 'Arrays']
lesson_language: JavaScript
lesson_topic: Arrays
lesson_part: interactive
lesson_type: lesson
codemirror: True
microblog: True
title: Arrays
description: Learn about arrays in JavaScript, including how to create, access, and manipulate them.
permalink: /js/arrays/
author: Jackson, Arnav, Levi
---

## What are Arrays?
An **array** is a collection of elements (values) stored in a single variable. Each element in an array can be accessed by its **index** (position), starting from 0.

Think of an array like a row of boxes, each containing a value:
- Box 0 contains the first element
- Box 1 contains the second element  
- Box 2 contains the third element
- And so on...

### Why Use Arrays?
- Store multiple values in one variable
- Easy to access values by position
- Useful for loops (process many items at once)
- Organize related data together



# Arrays in Games
The most important use of arrays in code is to hold objects (sprites) for the game engine to render, so you don't have to repeat rendering every single opject, you only have to render once at the end.

## Basic Game
Use the code below to find some arrays.

**EXAMPLE**: **ARRAY** for rendering objects!!

    this.classes = [ <-- means array start

ZEROTH index, FIRST object

      { class: GameEnvBackground, data: bgData }, --> comma to separate

FIRST index, SECOND object

      { class: Player, data: playerData }, --> comma to separate, even at the end

    ]; --> means array end

{% capture challenge0 %}
Find ALL of the arrays in the game code, and add a comment. There's literally two. This should not take a whole lot of time.
{% endcapture %}

{% capture code0 %}
// Import for GameRunner
import GameControl from '/assets/js/GameEnginev1/essentials/GameControl.js';
// Level Code
import GameEnvBackground from '/assets/js/GameEnginev1/essentials/GameEnvBackground.js';
import Player from '/assets/js/GameEnginev1/essentials/Player.js';

class CustomLevel {
  constructor(gameEnv) {
    const path = gameEnv.path;
    const width = gameEnv.innerWidth;
    const height = gameEnv.innerHeight;
    const bgData = {
        name: 'custom_bg',
        src: path + "/images/gamebuilder/bg/clouds.jpg",
        pixels: { height: 720, width: 1280 }
    };
    const playerData = {
      id: 'Hero',
      src: path + "/images/gamify/chillguy.png",
      SCALE_FACTOR: 5,
      STEP_FACTOR: 1000,
      ANIMATION_RATE: 50,
      INIT_POSITION: { x: 100, y: 300 },
      pixels: { height: 512, width: 384 },
      orientation: { rows: 4, columns: 3 },
      down: { row: 0, start: 0, columns: 3 },
      downRight: { row: 1, start: 0, columns: 3, rotate: Math.PI/16 },
      downLeft: { row: 2, start: 0, columns: 3, rotate: -Math.PI/16 },
      right: { row: 1, start: 0, columns: 3 },
      left: { row: 2, start: 0, columns: 3 },
      up: { row: 3, start: 0, columns: 3 },
      upRight: { row: 1, start: 0, columns: 3, rotate: -Math.PI/16 },
      upLeft: { row: 2, start: 0, columns: 3, rotate: Math.PI/16 },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 }
    };
    this.classes = [
      { class: GameEnvBackground, data: bgData },
      { class: Player, data: playerData },
    ];
  }
}
export const gameLevelClasses = [CustomLevel];
// Export for game runner
export { GameControl };
{% endcapture %}

{% include runners/game.html
   runner_id="game2"
    challenge=challenge0
    code=code0
    height="720px"
%}

## Modifying Arrays

You can change, add, or remove elements from an array.

{% capture challenge1 %}
This is reference about how to modify arrays. Run it to do stuff.
{% endcapture %}

{% capture code1 %}
// Start with an array
let colors = ["red", "blue", "green"];
console.log(colors);
console.log();

// Change an element
colors[1] = "yellow";
console.log(colors);
console.log();

// Add an element
colors.push("purple");
console.log(colors);
console.log();

// Remove an element
colors.splice(colors.indexOf("red"), 1);
console.log(colors);
{% endcapture %}

{% capture source1 %}
```javascript
%%js

// Start with an array
let colors = ["red", "blue", "green"];
console.log(colors);
console.log();

// Change an element
colors[1] = "yellow";
console.log(colors);
console.log();

// Add an element
colors.push("purple");
console.log(colors);
console.log();

// Remove an element
colors.splice(colors.indexOf("red"), 1);
console.log(colors);
```
{% endcapture %}

{% include runners/code.html
   runner_id="js-arrays-1"
   language="javascript"
   challenge=challenge1
   code=code1
   source=source1
%}

## Class Challenge #1
The people who wrote the code below don't know how to use arrays to render the objects :\(. With your *immense* coding skills, we're going fix the game below to have all characters rendered.

{% capture challenge0 %}
Fix the game below to have all characters and the bankground object rendered. There are 5 in total.
{% endcapture %}

{% capture code0 %}
//SCROLL PAST THIS
import GameEnvBackground from '@assets/js/GameEnginev1.1/essentials/GameEnvBackground.js';
import Player from '@assets/js/GameEnginev1.1/essentials/Player.js';
import Npc from '@assets/js/GameEnginev1.1/essentials/Npc.js';
import GameControl from '@assets/js/GameEnginev1.1/essentials/GameControl.js';
import Shark from '@assets/js/GameEnginev1.1/Shark.js';
import GameLevelStarWars from './GameLevelStarWars.js';
class bankgame {
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

        // Player Data for Robber
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
// SCROLL PAST THIS
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
            let gameInGame = new GameControl(gameEnv.game, levelArray, {parentControl : primaryGame});
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
// JUST KEEP SCROLLING
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
        };

// MAKE CHANGES HERE
        this.classes = [];
        // LIKE HERE ⬇️ ADD ELEMENTS (SPRITES) TO THE ARRAY
        // eg : this.classes.push({ class: GameEnvBackground, data: bgData })
    }
}
export const gameLevelClasses = [bankgame];
// Export for game runner
export { GameControl };
{% endcapture %}

{% include runners/game.html
    runner_id="game1"
    challenge=challenge0
    code=code0
    height="720px"
%}
## Looping Through Arrays

Arrays are powerful when combined with loops. You can process each element without writing it by hand.
You can use loops to update multiple things in an array



{% capture challenge2 %}
Run the code to see how to update multiple objects while resuing the same code.
{% endcapture %}

{% capture code2 %}
// Array of enemy positions in a level
let enemyPositions = [150, 300, 450, 600];

// Example 1: Move every enemy forward by 10 pixels
console.log("Updating enemy positions:");
for (let pos of enemyPositions) {
    let newPos = pos + 10;
    console.log(`Enemy moved to position: ${newPos}`);
}

// Example 2: Count how many enemies exist
console.log(`Total active enemies: ${enemyPositions.length}`);

{% endcapture %}

{% capture source2 %}

{% endcapture %}

{% include runners/code.html
   runner_id="js-arrays-2"
   language="javascript"
   challenge=challenge2
   code=code2
   source=source2
%}


## Key Takeaways
* ***You need to use arrays to write code for your games.*** 
* ***You need to learn how to use arrays.*** 
* ***Arrays are important and stuff.***
✅ **Arrays** store multiple values in a single variable  
✅ **Index** starts at 0 for the first element  
✅ Access elements using `array[index]`  
✅ Use **loops** to process all elements  
✅ Common operations: append, remove, change, loop, sum, average  

# Arrays Homework 🎯

Welcome to the Arrays homework! These exercises will help you practice the key array concepts from the lesson: accessing elements, modifying arrays, looping through arrays, and performing calculations.

---

## Exercise 1: Array Basics - Use Arrays in a Game


{% capture challenge4 %}
Exercise 1 - Array Basics
{% endcapture %}

{% capture code4 %}
// Starter Code:
let enemySpeeds = [2, 4, 3, 5];

// TODO:
// 1. Create a loop that goes through enemySpeeds.
// 2. Multiply each speed by 2 to activate "rage mode".
// 3. Print the new speed for each enemy using console.log().
{% endcapture %}

{% capture source4 %}
```javascript
%%js
// Starter Code:
let enemySpeeds = [2, 4, 3, 5];

// TODO:
// 1. Create a loop that goes through enemySpeeds.
// 2. Multiply each speed by 2 to activate "rage mode".
// 3. Print the new speed for each enemy using console.log().

```
{% endcapture %}

{% include runners/code.html
   runner_id="js-arrays-4"
   language="javascript"
   challenge=challenge4
   code=code4
   source=source4
%}

## Exercise 2 : More looping


{% capture challenge5 %}
Exercise 1 - Array Basics
{% endcapture %}

{% capture code5 %}
// Starter Code:
let enemySpeeds = [2, 4, 3, 5];

// TODO:
// 1. Create a loop that goes through enemySpeeds.
// 2. Multiply each speed by 2 to activate "rage mode".
// 3. Print the new speed for each enemy using console.log().
{% endcapture %}

{% capture source5 %}
```javascript
%%js
// Starter Code:
let enemySpeeds = [2, 4, 3, 5];

// TODO:
// 1. Create a loop that goes through enemySpeeds.
// 2. Multiply each speed by 2 to activate "rage mode".
// 3. Print the new speed for each enemy using console.log().

```
{% endcapture %}

{% include runners/code.html
   runner_id="js-arrays-5"
   language="javascript"
   challenge=challenge5
   code=code5
   source=source5
%}

## Exercise 3 : Modifying Arrays


{% capture challenge7 %}
Exercise 1 - Array Basics
{% endcapture %}

{% capture code7 %}
// Starter Code:
let playerInventory = ["Sword", "Shield", "Health Potion", "Key"];

// TODO:
// 1. Add "Magic Ring" to the end of playerInventory using push().
// 2. Change "Health Potion" to "Empty Bottle" (simulating using the item).
// 3. Loop through playerInventory using a for...of loop and print each item.
{% endcapture %}

{% capture source7 %}
```javascript
%%js
// Starter Code:
let playerInventory = ["Sword", "Shield", "Health Potion", "Key"];

// TODO:
// 1. Add "Magic Ring" to the end of playerInventory using push().
// 2. Change "Health Potion" to "Empty Bottle" (simulating using the item).
// 3. Loop through playerInventory using a for...of loop and print each item.
```
{% endcapture %}

{% include runners/code.html
   runner_id="js-arrays-7"
   language="javascript"
   challenge=challenge7
   code=code7
   source=source7
%}