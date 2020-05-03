var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();

//mongoose connection
mongoose.connect("mongodb://localhost/todo", { useNewUrlParser: true , useUnifiedTopology: true})

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

//mongoose schema

var todoSchema = new mongoose.Schema({
    name: String
});

var Todo = mongoose.model("Todo", todoSchema);



// var todoList = [
//     "wash the casr & change oil",
//     "Do laundry",
//     "Buy groceries & make dinner"
// ]


// Express routes here
//default route
app.get("/",(req, res)=>{
    Todo.find({}, (err, todoList)=>{
        if(err)
            console.log(err);
        else
            res.render("index.ejs", {todoList: todoList});
    })
});

// //submit button route
// app.post('/newtodo', (req, res)=>{
//     console.log("item submitted");
//     var newItem = new Todo({
//         name = req.body.item
//     }); 
//     Todo.create(newItem, (err, Todo)=>{
//         if(err)
//             console.log(err);
//         else
//             console.log("Inserted item:"+newItem);
//     })
//     res.redirect("/");
// });

//catch all other routes
app.get("*", (req, res)=>{
    res.send("<h1>Invalid Page</h1>")
});

// server listening
app.listen(3000, ()=>{
    console.log("Server started on port 3000");
})