const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();
const app = express();
app.use(express.json());

const posts = [
    {
        username: "Abid",
        title: "Post-1"
    },
    {
        username: "Ahmed",
        title: "Post-2"
    }
];

app.get("/posts",authenticateToken,(req,res)=>{

    // console.log(req.user.name)
    res.json(posts.filter(post => post.username == req.user.name))
})

const PORT = 3003;
app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}...`);
});

function authenticateToken(req,res,next){

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    
    if(token == null) return res.sendStatus(401);

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403);
        console.log(user);
        req.user = user;
        next();
    })
}