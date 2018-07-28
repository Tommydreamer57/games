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
     - Express
     - Socket.io
 - Redis
 - PostgreSQL
     - Massive

## Plan

 -- I need to check and make sure that current architecture will be acceptable for serving react from the Node server
 -- I may have to move the server to the root of the project

There will be many different game options to choose from
 - Boggle
 - Chess
 - Checkers
 - Othello
 - Hive
 - Hearts
 - Others

Each game will have a max number of players
Each game will either have turns or rounds
Each game will either be closed after starting or will continue to be open

Users will be able to create a game and receive a 4-letter code
User who creates game is game owner
Other users will be able to enter 4-digit code to join game

Game owner can start the game once everyone else has joined

