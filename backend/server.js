const { generateUploadURL } = require("./config/s3")
const dotenv = require('dotenv')
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const courses = require("./routes/api/courses");
const tests = require("./routes/api/tests");
const feedback = require("./routes/api/feedback");
const reports = require("./routes/api/reports");

const app = express();

const cors = require('cors');

app.use(cors())

dotenv.config()

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

const db = process.env.mongoURI;

app.get('/s3Url', async (req, res) => {
    try{
        const url = await generateUploadURL()
        res.send({url})
    } catch(error){
        console.log(error)
    }
    
})

mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/courses", courses);
app.use("/api/tests", tests);
app.use("/api/feedback", feedback);
app.use("/api/reports", reports);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} !`));