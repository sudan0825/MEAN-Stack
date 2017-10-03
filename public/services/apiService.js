angular.module('apiService', [])
   .factory('httpService', ['$http', function($http){
       
       return {
           get:function(){
               return $http.get('/api/dbcontent');
           },
           create :function(data){
               return $http.post('/api/saveContent', data);
           },
           delete : function(id){
               return $http.delete('/api/saveContent/' +id);
           }
           
       }
  
   }]);