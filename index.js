var express = require('express');
var app = express();
app.listen(3002);
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

console.log("Microservice is run @ http://localhost:3001");