const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { restart } = require("nodemon");

dotenv.config();
const app = express();
app.use(express.json());


let refreshTokens = [];



app.post("/login",(req,res)=>{
    // Authentication 

    const username = req.body.username;
    const user = {name:username};
    const access_token= generateAccessToken(user); 
    
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken);
    
    res.json({accessToken:access_token, refreshToken:refreshToken});
})

function generateAccessToken(user){
    // Here the average time for token expire is 15min so keep it based on your application scenario
    // for test purpose i am using short time (20s)
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"2000s"}); 
}

app.post("/token",(req,res)=>{
    const refreshToken = req.body.token;

    if(refreshToken==null)  return res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403);
        const accessToken = generateAccessToken({name: user.name});
        res.json({accessToken:accessToken})
    })
})

app.delete("/logout",(req,res)=>{
    refreshTokens = refreshTokens.filter(token=> token != req.body.token)
    res.sendStatus(204)
})

const PORT = 3004;
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}...`);
});


// function authenticateToken(req,res,next){

//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(" ")[1];
    
//     if(token == null) return res.sendStatus(401);

//     jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
//         if(err) return res.sendStatus(403);
//         console.log(user);
//         req.user = user;
//         next();
//     })
// }