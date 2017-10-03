
angular.module('sample1',[]).controller('sample1Ctrl', ['$scope', '$http', function($scope, $http){
    
    
      //get the content from database
    $http({
      method: 'GET',
      url: '/api/display',
      headers: {
           
      }
   }).then(function (res){
     
         $scope.userList=res.data;
           console.log($scope.userList);
         
        

   },function (error){
        var x=JSON.stringify(error);
      console.log('Error ' + x);
   });
    
    $scope.deleteInfo=function(id){
       
         //For passing one parameters only, we do not need $.param function
        
         $http.delete('/api/display/'+ id).then((res)=>{
               //display user info after deleting
               $scope.userList=res.data;
            
        
    }, (err)=>{
    
    
      console.log(err);
    
    });
    }
   
}] )
