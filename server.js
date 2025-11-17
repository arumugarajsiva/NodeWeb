var express = require('express');
var app = express();
const port = process.env.PORT || 3002;
app.listen(port);
app.use(express.json());
app.use("/",express.static("webapp/"))
var data = require('./vendors.json');
app.get("/", (req, res) => {
    res.send("First Microservice for first")
});

app.get("/vendors", (req,res) => {
    res.json(data);
});

app.get("/vendors/:id", (req, res) => {
    var id = parseInt(req.params.id);
    var singleUser = data.vendors.find(vendor => vendor.id === id);

    if (singleUser){
        res.json(singleUser);
    }else{
        res.send("No vendor exists");
    }
})

app.post("/vendors", (req, res) => {
    var postRequestData = req.body;
    var uuid = crypto.randomUUID();
    postRequestData.id = uuid;
    res.json(postRequestData);
})

app.get("/index.html", (req,res) => {
    res.sendFile(__dirname + '/webapp/index.html');
})
console.log("Microservice is run @ http://localhost:3002");