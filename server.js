//require modules =====================
var express=require('express');
var app =express();
var mongoose =require('mongoose');
var bodyParser =require('body-parser');
var methodOverride =require('method-override');
var morgan = require('morgan');


    //configuration 


var url = "mongodb://localhost:27017/mean";

mongoose.connect(url);

//database schema
var userInfo=require('./app/models/userInfo');




var port = process.env.PORT || 8888; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json



app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use('/node_modules', express.static(__dirname + '/node_modules')) //After install AngularJS, we need to use node modules before using Angular js in index file
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT




// router API



//set up connection between views and back-end controllers. You must create this connection after using expess.static





// routes ==================================================


// populated 
var myModel  = require('./app/models/userInfo');

//GET request. Set API URL to any URL except the routes to views
app.get('/api/display',(req, res,next)=>{
   
  myModel.find(function(err, tasks){
      if(err){
          res.send("what is wrong : "+err);
      }
      
               res.json(tasks);
        
  }) 
})

//post request. Set API URL to any URL except the routes to views
app.post('/api/save', (req, res, next)=>{
    
    var info=req.body;
 
     console.log(info);
   
   
       myModel.create(info,function(err, convertJson){

       if(err){
           console.log(err);
         res.send(err);
       }  
           
       })
   
})

//delete request. Set API URL to any URL except the routes to views
app.delete('/api/display/:_id', (req, res, next)=>{
   
   console.log(req.params._id);
    myModel.remove({
        _id:req.params._id
    }, function(err, data){
        if(err)
            res.send(err);
         else {
             console.log("any data" +data);
         }
        myModel.find(function(err, info){
           
            
               if(err){
                   res.send(err);
               }
              else{
                  console.log("new info");
                res.json(info);  
              }
              
           })
        
    })
     
});

// application -------------------------------------------------------------
app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app