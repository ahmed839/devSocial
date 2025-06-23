AuthRouter

- POST/signup
- POST/login
- POST/logout

ProfileRouter

- GET/profile/view
- PATCH/profile/edit
- PATCH/profile/password

ConnectionRequestRouter

- POST/request/send/interested/:userId
- POST/request/send/ignore/:userId

- POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId

user

- GET user/connection
- GET user/request/recieved
- GET user/feed - get profile of other user on platform

Stattus: ignore/interested/acepted/rejected
