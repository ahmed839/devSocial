1st Day

- create the repository
- Initialize the repository
- node modules package.json , package-lock.json
- create a server
- listen to port 7777
- install nodemon and update script inside package.json
- what are dependecies
- what is use of "-g" while npm install
- difrence between create carel and telda (^ vs ~)

2nd Day

- initialize git and git ignore
- create a remote repo on git hub
- Push all code to remote origion
- play with rout extention ex. /hello and /hello/2
- Install postmen and make a worksplace/collection --> test api call
- Explore Routing and use of ?, +, \*, in the routes
- use of Regex in Routes
- Reading the query and params in the Routes

3rd Day (Routhing and MiddleWare)

- Multiple Rout Handler Play with the code
- next()
- next() function and error along with res.send()
- app.use ("/route", rH, rH2, rH3, rH4, rH5)
- what is MiddleWare
- How Express Handles Requests Behind the Scenes
- Diffrerence beween app.use() and app.all().
- write a dummy auth middleware for all user Route axept user Login

- install cookie Parser
- just send a dummy cookie to user
- create a profile api and check cookie get back
- install jsonwebtoken
- in login api after email and password validation create JWT token and send to the user
- read the cookies inside your profile find out who is loged in
- userAuth middleware
- Add the userAuth middleware in profile and connection Api
- set the expiree jwt token and cookis for a 7 day
- create userSchema method to getJWT
- create userSchema method to compare password
- Explore Tinder APi
- create a list api you think in the Devtinder
- Group multiple routes and repetive roters
- Read Documentation for express.Router
- Create Routes folder auth,profile and request
- create all the roters
- import all the routers in the app.js
