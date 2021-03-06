const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express()

let corsOptions = {
    origin: "http://localhost:8081",
    allowedHeaders: "*"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

const db = require("./models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });



//set port and listen for requests

const PORT = process.env.PORT || 8082;
require("./routes/tutorial.routes")(app);
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})