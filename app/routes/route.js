var mongoose = require('mongoose');
var myModel  = require('../models/userInfo');
var express  = require('express');
var router   = express.Router();
const util = require('util');




//GET request
router.get('/api/dbcontent',(req, res,next)=>{
  myModel.find(function(err, tasks){
      if(err){
          res.send(err);
      }
      res.json(tasks);
  }) 
})

//post request
router.post('/api/dbcontent', (req, res, next)=>{
    var task=req.body;
  
    console.log("what is the wrong " +JSON.stringify(task));
   if(!task.title||(task.isDone +'')){
       res.status(400);
       res.json({
           "Error":"some thing wrong"
       });
   }else{
       myModel.create(task,function(err, task){

       if(err){
           
         res.send(err);
       }  
           res.json(task);
       })
   }
})

//delete request
router.delete('/api/saveContent/:id', (req, res, next)=>{
    myModel.remove({
        _id:req.params.id
    }, function(err, data){
        if(err)
            res.send(err);
        
    })
     
});

router.get('*', (req, res)=>{
    res.sendFile('/index.html');
    // load the single view file (angular will handle the page changes on the front-end)
})


module.exports=router;