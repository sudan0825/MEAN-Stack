var mongoose = require('mongoose');


mongoose.connection.on('connected', ()=>{
    console.log("connected to database mongodb mean @27017");
})

mongoose.connection.on('error', (err)=>{
    if(err){
        console.log("something wrong. cannot connect to mongodb: "+ err)
}
});


var myModel = mongoose.model('userInfo', new mongoose.Schema({
     name:{type: String, require: true },
     password:{type:String, require: true},
     age:Number

}));


module.exports = myModel;