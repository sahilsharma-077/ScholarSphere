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
__________________________________________________________________________________________

## Day 7
- Implemented post interaction features
- Added Like Post API
- Added Comment Post API
- Implemented Share/Repost functionality
- Updated Post schema to support likes, comments, and shared posts

Problems faced:
- Route testing errors due to incorrect HTTP methods (GET vs PUT)
- Resolved by correctly using PUT for like endpoints and restarting server
__________________________________________________________________________________________

## Day 8
- Implemented Edit Post functionality with owner authorization
- Implemented Delete Post functionality with authorization checks
- Added feed pagination for scalable post loading
- Improved overall backend production readiness

Problems faced:
- Pagination understanding and testing issues
- Resolved by implementing page query parameter testing (`?page=1`)
________________________________________________________________________________

## Day 9
- Implemented Follow and Unfollow functionality using MongoDB and Mongoose
- Created Followers and Following API endpoints for user relationship retrieval
- Established social graph foundation required for feed personalization
- Verified API functionality using Thunder Client and MongoDB shell
- Cleaned inconsistent test data and ensured ObjectId-based references for user relationships

Problems faced:
- MongoDB shell (mongosh) was initially not recognized due to PATH configuration issues
- Follow records were initially inserted using string IDs instead of ObjectIds, causing validation errors
- Resolved by installing MongoDB Shell properly, updating environment PATH, and recreating follow records using valid MongoDB ObjectIds
_____________________________________________________________________________

## Day 10
- Implemented personalized feed endpoint using follow-based filtering
- Created feed route to fetch posts from users that the current user follows
- Integrated Follow and Post models to generate dynamic user feeds
- Tested personalized feed using Thunder Client with sample follow relationships and posts

Problems faced:
- Feed initially returned empty results due to missing follow relationships and test post data
- Resolved by creating proper follow records and inserting sample posts with correct ObjectId references
______________________________________________________________________________

## Day 11
- Upgraded personalized feed to hybrid feed (following + explore posts)
- Implemented additional query to fetch recent posts from non-followed users
- Combined following and explore posts into a single ordered feed response
- Prepared feed architecture for future AI recommendation integration

Problems faced:
- Duplicate posts appeared during initial merge testing
- Resolved by separating following and non-following queries using $in and $nin filters
_______________________________________________________________________________

## Day 12
- Integrated Socket.io for real-time chat functionality
- Configured Express server to run with HTTP + Socket.io instance
- Created Message and Conversation schemas for chat persistence
- Implemented message API endpoints for sending and retrieving chat history
- Enabled automatic message storage when messages are sent through Socket.io events
- Verified real-time messaging and database persistence through testing

Problems faced:
- Server initialization error due to using Express app before declaration
- Socket events initially transmitted messages but did not persist them in the database
- Resolved by correcting server initialization order and saving messages inside socket event handler
__________________________________________________________________________________

## Day 13
- Initialized React frontend project and established folder structure (pages, components)
- Integrated Lovable-generated UI components into the frontend project
- Created Feed page and successfully rendered frontend UI skeleton
- Connected Feed API to frontend using fetch and displayed real posts from backend
- Implemented Follow button component and integrated frontend follow interaction with backend Follow API
- Verified full backend–frontend pipeline for feed and follow interaction

Problems faced:
- Module resolution issues due to incorrect file paths and TypeScript/JavaScript file mismatch
- Frontend server start errors caused by running commands outside the frontend directory
- Feed initially displayed empty results due to missing follow relationships and test post data
- Resolved by correcting file structure, restarting frontend server, and inserting valid follow/post records
__________________________________________________________________________________

## Day 14
- Implemented Like data model for tracking user engagement on posts
- Created Like and Unlike API endpoints for post interactions
- Integrated Like button component into Feed UI
- Connected frontend Like interaction with backend API
- Verified Like records stored successfully in MongoDB for engagement tracking

Problems faced:
- JSX placement errors while integrating LikeButton inside post rendering loop
- Duplicate export error in Feed component causing build failure
- Resolved by restructuring Feed component and ensuring a single default export
_________________________________________________________________________________

## Day 15
- Implemented Save (Bookmark) system with backend model, API routes, and frontend Save button integration
- Developed Comment system allowing users to write and view comments in real-time under posts
- Added Share functionality with clipboard link copying and backend share tracking
- Implemented Repost feature enabling users to repost existing content to their network
- Integrated all engagement actions (Like, Save, Comment, Share, Repost) into the Feed UI
- Established complete engagement signal layer required for recommendation engine development

Problems faced:
- JSX placement issues causing undefined variable errors while integrating new buttons
- Backend–frontend code mix-up when React imports were mistakenly placed in backend model files
- Route connection errors due to missing API registration in server configuration
- Resolved by restructuring component placement, correcting backend model files, and properly registering API routes
__________________________________________________________________________________

## Day 16
- Implemented rule-based recommendation engine for feed ranking using engagement signals (likes, saves, comments, shares, reposts, follow relationships)
- Updated feed API to compute engagement-based post scores and return ranked posts instead of chronological ordering
- Integrated engagement models (Like, Save, Comment, Share, Repost) into feed scoring logic
- Corrected Follow button placement to appear per post author instead of globally on the feed
- Verified dynamic ranking behavior and correct follow interaction tied to content authors

Problems faced:
- Initial follow button placement incorrectly implemented as global feed action instead of author-level interaction
- Minor route logic adjustments required to ensure engagement counts were calculated correctly for scoring
- Resolved by restructuring frontend Follow button placement and updating backend feed ranking logic
__________________________________________________________________________________
## Day 17
- Implemented suggested users recommendation API based on mutual follow relationships
- Added backend logic to filter already-followed users and return potential new connections
- Created SuggestedUsers frontend component and integrated it into Feed and Profile pages
- Enabled basic people recommendation system alongside engagement-based content recommendation
- Improved frontend layout by preparing placement for sidebar user discovery panel

Problems faced:
- Component resolution errors due to missing SuggestedUsers file in components directory
- Import path issues causing module not found errors in Feed and Profile pages
- Resolved by creating the component file in the correct directory and restarting the frontend server
__________________________________________________________________________________

## Day 18
- Implemented notification system with Notification data model and API routes
- Added automatic notification generation for user actions including likes, comments, follows, and reposts
- Integrated notification fetching endpoint to retrieve user-specific notifications
- Enabled frontend notification panel component for displaying activity alerts
- Configured application routing using react-router-dom for multi-page navigation

Problems faced:
- Initial notification setup only fetched data without automatic creation on user actions
- Route integration issues due to missing Notification model imports in engagement routes
- Resolved by updating action routes to generate notifications dynamically and restarting backend services

