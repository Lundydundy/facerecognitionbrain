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
        connectionString: process.env.DATABASE_URL,
        ssl: {rejectUnauthorized: false},
        host : process.env.DATABASE_HOST,
        user : process.env.DATABASE_USER,
        password : process.env.DATABASE_PW,
        database : process.env.DATABASE_DB
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
