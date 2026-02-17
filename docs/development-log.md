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
____________________________________________________________________________________

## Day 4
- Implemented user login API with password verification using bcrypt
- Added JWT authentication and token generation
- Created protected routes using JWT middleware
- Refactored authentication logic into MVC structure (controllers, routes)
- Centralized MongoDB connection using config/db.js

Problems faced:
- Token validation initially failed due to incorrect header format
- Middleware path issues resolved by creating proper middleware folder
______________________________________________________________________________________

## Day 5
- Implemented user profile module
- Created profile fetch API using JWT-based user identification
- Added profile update API
- Connected user routes to main server

Problems faced:
- Route path and middleware import issues resolved by restructuring routes folder
_________________________________________________________________________________________

## Day 6
- Implemented community posts module
- Created Post schema with likes and comments structure
- Developed Create Post API (JWT protected)
- Implemented Feed API to fetch all posts

Problems faced:
- Route connection issues due to incorrect server.js order
- Fixed by registering routes before app.listen()

