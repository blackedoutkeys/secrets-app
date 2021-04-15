//dependencies 
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require("mongoose")


const app = express();


//app set up to populate public folder
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));
//connects to database
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

//creates new schema for database user data
const userSchema = {
    email: String,
    password: String
}
//creates new user
const User = new mongoose.model("User", userSchema)

//routes
app.get("/", function (req, res){
    res.render("home");
});

app.get("/login", function (req, res){
    res.render("login");
});

app.get("/register", function (req, res){
    res.render("register");
});

//post routes that once user registers if no errors takes to main page
app.post("/register", function(req, res) {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save(function (err){
        if(err) {
            console.log(err);
        } else {
            res.render("secrets")
        }
    })
})

app.post("/login", function(req, res){
    const username = req.body.username
    const password = req.body.password

    User.findOne({email: username}, function(err, foundUser))
})


//port listening
app.listen(3000, function() {
    console.log("server is listening on port 3000");
})