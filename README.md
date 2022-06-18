# authentication-using-JWT

This repository contain the code of authentication using jwt. this project has now UI only server and authServer files contains code.
 - server.js // this is the file which is used for server-1 and it's purpose is to get post only.
 - authServer.js // this is the file which used for server-2 and it's purpose is to login user, generate token, logout or delete token
 - request.rest // this file contains all the APIs both for server-1 and server-2 to get posts delete tokect generate token and refresh token

Note: it is not compulsory to use the request.rest file. this file need vs-code extention named REST client. So you can check APIs by using postman thunder client or browser.


Add ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET in your .env file to generate random hashes write the below command in nodejs environment.

require("crypto").randomBytes(64).toString("hex")

assign the two different generate hash in .env file to both const ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET
