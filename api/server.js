const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const signin = require('./controllers/signin')
const register = require('./controllers/register')
const image = require("./controllers/image")
const profile = require("./controllers/profile")

//$env:PORT="3000" ; node server.js

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'test',
        database : 'smart-brain'
    }
  });

const app = express()

app.use(cors())

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.post("/signin", signin.handleSignIn(db, bcrypt))
app.post("/register", (req, res) =>  {register.handleRegister(req, res, db, bcrypt)});
app.get("/profile/:id", (req, res) => {profile.handleProfile(req, res, db)})
app.put("/image", (req, res) => {image.handleImage(req, res, db)})
app.post("/imageurl", (req, res) => {image.handleApiCall(req, res)})

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`)
})
