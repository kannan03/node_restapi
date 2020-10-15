var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const app = express();
const UserDataModel = require('./models/user_model');
const port = 4545;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// mongoose connection
// mongoose.connect('mongodb://user:pass@localhost:port/database', { useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true } , function(err) {
    if (err) throw err;
    console.log('Successfully connected');
  });

// mongoose ObjectId
const mongoDriverId = mongoose.Types.ObjectId();
const mongoDriverIdString = mongoose.Types.ObjectId().toString();

var Today = new Date();
var d = Today.getDate();
var m = Today.getMonth() + 1;
var y = Today.getFullYear();

if(d <= 9) {
    d = '0' + d;
}

if(m <= 9) {
    m = '0' + m;
}
var DateString = d + '-' + m + '-' + y;
console.log(DateString);

// one day before
// var yesterday = new Date();
// yesterday.setDate(Today.getDate() - 1);
// console.log(yesterday.getDate());
// console.log(yesterday);


// one day ago
// var tomorrow = new Date();
// tomorrow.setDate(Today.getDate() + 1);
// console.log(tomorrow.getDate());

// url GET method (find)
app.get('/user',  function(req, res) {
    // var q = url.parse(req.url, true);
    UserDataModel.find({}, function(err, result) {
        if (err) throw err;
        res.json(result);
      });
    });

// url GET aggreate method mongoose
    app.get('/useragg',  function(req, res) {
         var vvv = 'siva';
        // one day before
          var Today = new Date();
          var yesterday = new Date();
          yesterday.setDate(Today.getDate() - 1);
  
        //   UserDataModel.find( { created_at: {$gte :yesterday }} , function(err, result){
        //     if (err) throw err;
        //     console.log(result);
        //     res.json(result);    
        // });

        // UserDataModel.find( { username:  { $regex: "^p.*" }  } )
        // UserDataModel.find( { item: { $not: { $regex: /^p.*/ } } } )

        // starting search word  in username field case sense
        // UserDataModel.find( { username:  { $regex: "^p.*" }  } , function(err, result){
        //     if (err) throw err;
        //     console.log(result);
        //     res.json(result);    
        // });

       // starting search word  in username field case Insense(accept lowecase or uppercase)
                UserDataModel.find( { username:  { $regex: "^p.*" , $options : 'i'}  } , function(err, result){
                    if (err) throw err;
                    console.log(result);
                    res.json(result);    
                });
        
        });
    

// url GET method (insertMany, create, save)
app.get('/userinsert',  function(req, res) {
    let ObjCreateData = {username :"sivakannan", useremail:"kannan@gmail.com", userpass:"sivasiva"};
    let ObjInsertSingle = [{username :"sivakannan", useremail:"kannan@gmail.com", userpass:"sivasiva"}];
    let ObjInsertArray = [{username :"sivakannan", useremail:"kannan@gmail.com", userpass:"sivasiva"} , {username :"sivasivakannan", useremail:"kannjdjjdjdan@gmail.com", userpass:"sivasiva"}];
  
    // create method
    UserDataModel.create(ObjCreateData, function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });

    // inserMany method 
    // UserDataModel.insertMany(ObjInsertArray, function(err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     res.json(result);
    // });

    //save method
    //  var small = new UserDataModel(ObjCreateData);
    //   small.save(function (err,result) {
    //     if (err) throw err;
    //     console.log(result);
    //     res.json(result);
    //    });
});

// url GET params  method (findById)
    app.get('/user/:userId',  function(req, res) {
        let UserID = req.params.userId;
        UserDataModel.findById(UserID, function(err, result) {
            if (err) throw err;
            console.log(result);
            res.json(result);
          });
    });


// url GET params  method (findByIdAndUpdate, findOneAndUpdate, updateOne , update, deleteOne, delete, findByIdAndRemove , remove)
    app.get('/users/:userId',  function(req, res) {
        let UserID = req.params.userId;
        let Userdata = { username :"kannan577"};
        let Userdata1 = {useremasssil:"siva1@gmail5.com"};
        let Userdata1set = {username :"kannan55555" ,useremail:"siva1@gmail5555.com"};
        let Userdataset = { $set : {username :"sivakannan"} };

        // UserDataModel.findByIdAndUpdate(UserID, Userdata1set, function(err, result) {
        //     if (err) throw err;
        //     console.log(result);
        //     res.json(result);
        //   });

        // UserDataModel.findOneAndUpdate({_id:UserID}, Userdata1set ,function(err, result) {
        //     if (err) throw err;
        //     console.log(result);
        //     res.json(result);
        //   });

        // UserDataModel.updateOne({username:"sivasiva"}, Userdataset,function(err, result) { 
        //     if (err) throw err;
        //     console.log(result);
        //     res.json(result);
        // });

        UserDataModel.update({username:"sivasiva"},  Userdataset ,function(err, result) { 
            if (err) throw err;
            console.log(result);
            res.json(result);
        });

        // UserDataModel.deleteeOne({username:"sivasiva"},function(err, result) { 
        //     if (err) throw err;
        //     console.log(result);
        //     res.json(result);
        // });


        // UserDataModel.findByIdAndDelete(UserID, function(err, result) {
        //     if (err) throw err;
        //     console.log(result);
        //     res.json(result);
        //   });

        // UserDataModel.findByIdAndRemove(UserID, function(err, result) {
        //     if (err) throw err;
        //     console.log(result);
        //     res.json(result);
        //   });

        // UserDataModel.remove({username:"siva" , useremail:"kkk"}, function(err, result) {
        //     if (err) throw err;
        //     console.log(result);
        //     res.json(result);
        //   });

    });

    
// url POST method
app.post('/user', function(req, res) {
    var uuu = req.body.message;
    res.status(200).send(uuu);
});

// url Delete method
app.delete('/user', function(req, res) {
    let data = {
        response: 'You sent: ' + req.body.message
    };
    // Do something, like query a database or save data
    res.status(200).send(data);
});

// url put method
app.put('/user', function(req, res) {
    let data = {
        response: 'You sent: ' + req.body.message
    };
    // Do something, like query a database or save data
    res.status(200).send(data);
});

// url patch method
app.patch('/user', function(req, res) {
    let data = {
        response: 'You sent: ' + req.body.message
    };
    // Do something, like query a database or save data
    res.status(200).send(data);
});

// url 404 page 
app.get('*', function(req, res) {
    let data = {
        message: '404 page!'
    };
    res.status(404).send(data);
});

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});

