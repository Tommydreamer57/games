# Games

Game application for users to play online games against each other in real time

## Technologies

 - Docker
     - Docker-compose
 - React
     - Mitosis
     - Mitosis-routing
         - History
 - Node
     - Socket.io

## Plan

 -- I need to check and make sure that current architecture will be acceptable for serving react from the Node server
 -- I may have to move the server to the root of the project

There will be many different game options to choose from
 - Boggle
 - Chess
 - Checkers
 - Othello
 - Hive
 - Mancala
 - Hearts
 - Spades
 - Scum
 - The Great Dalmudi
 - Mastermind
 - Others

Each game will have a max number of players
Each game will either have turns or rounds
Each game will either be closed after starting or will continue to be open

Users will be able to create a game and receive a 4-letter code
User who creates game is game owner
Other users will be able to enter 4-digit code to join game

Game owner can start the game once everyone else has joined

## Tasks

SETUP
 - Set up Docker - **COMPLETE**
 - Set up React app - **COMPLETE**
 - Set up Socket server - **COMPLETE**
 - Set up routing with meiosis - **COMPLETE**
     <!-- figure out subroutes inside games -->
     <!-- figure out file structure -->
     - Landing page - **COMPLETE**
         - Join game - input a 4 digit code
         - Input name
         - List of games
             <!-- SOCKETS START HERE -->
             - Start button next to each game
                 - Generates 4 digit code
                 - Links to games waitroom
     - Wait Room - **COMPLETE**
         - List of all players
         - Start button
     - Game Room - **COMPLETE**
         - Controlled by each individual game
     - Results - **COMPLETE**
             <!-- SOCKETS END HERE -->
 - Set up rooms in Socket server - **COMPLETE**
     <!-- figure out file structure -->
     <!-- figure out 4 digit code creation -->
     - Each room is named after the 4 digit code
     - Each room contains data about the game and players
MAKE SURE THIS WORKS:
 - Max players & time limit
 - Cannot start before min players reached
 - Allowing/blocking people from joining at different times
 - Automatic starting of the game
 - Automatic ending of game / min players / time limit
 - How to control DOM with each game
TESTING
 - Test the utility functions
 - Test the socket controller
     - each method should fire the correct even in the controller
     - method names should be correctly converted (snake to space case)
 - Test the game tracker
     - create join & leave games
     - create 4 digit codes
     - delete games
     - start new game
     - track all available games
     - all errors caught
 - Test the default game
     - default values
     - add & remove players
     - start & end game
     - invokes correct method on super class
     - handles asynchronous methods
 - Test each individual game
     - 
UI
CREATE INDIVIDUAL GAMES
