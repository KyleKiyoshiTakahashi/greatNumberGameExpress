const path = require('path')
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
app.use(session({
    secret: 'great_num_game',
    resave: false,
    saveUninitialized: true,
  }))
  
var random = Math.floor(Math.random() * 100)+1;
console.log("the random number is ", random);
var count = 0;
console.log("the count is", count);
var chancesLeft =10;
app.get('/', function(req,res){
    
    if(!req.session.guess){
        var result = {
            num: "",
            message: "",
            resetBtn: ""
        }
    }
    else{
        if(req.session.guess > random){
            var result = {
                num: "",
                message: "Too High!",
                resetBtn: ""
            }

        }

        else if(req.session.guess < random){
            var result = {
                num: "",
                message: "Too low!",
                resetBtn: ""
            }

        }
        else{
            var result = {
                num: req.session.guess,
                message: "!!!  You guessed the number!",
                resetBtn: "reset"
            }
        }
    }

    if( count < 10){
        var die = {
            message: ""
        };
    } else {
        var die = {
            message: "YOU ARE DEAD!!!!!!!!!!!!! "
        };
    }

    if( chancesLeft === 10){
        var chances= {
            num: "10"
        }
    } else if (chancesLeft === 9){
        var chances= {
            num: "9"
        }
    } else if (chancesLeft === 8){
        var chances= {
            num: "8"
        }
    } else if (chancesLeft === 7){
        var chances= {
            num: "7"
        }
    } else if (chancesLeft === 6){
        var chances= {
            num: "6"
        }
    } else if (chancesLeft === 5){
        var chances= {
            num: "5"
        }
    } else if (chancesLeft === 4){
        var chances= {
            num: "4"
        }
    } else if (chancesLeft === 3){
        var chances= {
            num: "3"
        }
    } else if (chancesLeft === 2){
        var chances= {
            num: "2"
        }
    } else if(chancesLeft ===1){
        var chances= {
            num: '1'
        }
    } else {
        var chances ={
            num: '0'
        }
        
    }
    
    
    res.render("index", {result: result, die: die, num: chances}, );

       
});

app.post("/guess", function(req, res){
    req.session.guess = req.body.guess;
    console.log("you guessed ", req.session.guess);
    count += 1;
    chancesLeft -=1;
    console.log(count);
    res.redirect("/");
})

app.get('/reset', function(req, res){
    
    random = Math.floor(Math.random() * 100)+1;
    req.session.guess = null;
    console.log("the new random number is ", random )
    res.redirect("/");
})

app.listen(8000, function() {
    console.log("listening on port 8000")
});