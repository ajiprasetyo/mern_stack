const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); // config env mongodb connection => ATLAS_URI=mongodb+srv://dbUser:123qwe@cluster0-deshu.gcp.mongodb.net/test?retryWrites=true&w=majority

const app = express(); // add value express
const port = process.env.PORT || 5000; // set port 

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection establised successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});