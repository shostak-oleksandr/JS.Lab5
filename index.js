const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();
 
const userScheme = new Schema({firstname: String, lastname: String, age: Number, phone: Number}, {versionKey: false});
const User = mongoose.model("User", userScheme);
 
app.use(express.static(__dirname + "/public"));
 
mongoose.connect("mongodb://localhost:27017/usersdb", { useUnifiedTopology: true, useNewUrlParser: true}, function(err){
    if(err) return console.log(err);
    app.listen(3000, function(){
        console.log("Сервер очікує підключення...");
    });
});
  
app.get("/api/masters", function(req, res){
        
    User.find({}, function(err, users){
 
        if(err) return console.log(err);
        res.send(users)
    });
});
 
app.get("/api/masters/:id", function(req, res){
         
    const id = req.params.id;
    User.findOne({_id: id}, function(err, user){
          
        if(err) return console.log(err);
        res.send(user);
    });
});
    
app.post("/api/masters", jsonParser, function (req, res) {
        
    if(!req.body) return res.sendStatus(400);
        
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const age = req.body.age;
    const phone = req.body.phone;

    const user = new User({firstname: firstName, lastname: lastName, age: age, phone: phone});
        
    user.save(function(err){
        if(err) return console.log(err);
        res.send(user);
    });
});
     
app.delete("/api/masters/:id", function(req, res){
         
    const id = req.params.id;
    User.findByIdAndDelete(id, function(err, user){
                
        if(err) return console.log(err);
        res.send(user);
    });
});
    
app.put("/api/masters", jsonParser, function(req, res){
         
    if(!req.body) return res.sendStatus(400);
    const id = req.body.id;

    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const age = req.body.age;
    const phone = req.body.phone;
    
    const newUser = {firstname: firstName, lastname: lastName, age: age, phone: phone};
     
    User.findOneAndUpdate({_id: id}, newUser, {new: true}, function(err, user){
        if(err) return console.log(err); 
        res.send(user);
    });
});
