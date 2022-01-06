const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express()

let corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

const db = require("./server/models");
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

app.get("/", (req,res) =>{
    res.json({ message:"hello world"})
})

//set port and listen for requests

const PORT = process.env.PORT || 8082;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})