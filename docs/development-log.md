# ScholarSphere Development Log

## Day 1
- Setup MERN project structure
- Installed dependencies
- Created Express server

Problems faced:
- Node path issue while running server
- Fixed by navigating to correct directory
_____________________________________________________________________________

## Day 2
- Connected MongoDB Atlas
- Created User model

Problems faced:
- Environment variables not loading correctly
- Fixed by explicitly loading dotenv using:
  require("dotenv").config({ path: __dirname + "/.env" });
______________________________________________________________________________

## Day 3
- Implemented user signup API
- Added password hashing using bcrypt
- Successfully stored users in MongoDB

Problems faced:
- req.body undefined due to incorrect JSON request
- Fixed by setting request body type to JSON

