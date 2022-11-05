const express = require('express');
const app = express();
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');

app.use(bodyParser.json());

//Import routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

//Routes
app.get('/', (req, res) => {
    res.send('Hello from \'/\' home');
})


//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION, 
    () => console.log("Connected to the cluster.")
);


//Listen to server
app.listen(3000);