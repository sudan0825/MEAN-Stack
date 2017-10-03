var meanApp = angular.module('meanApp', ['ngRoute', 'sample1','sample2','sample3']);
meanApp.config(function($routeProvider, $locationProvider){
    $routeProvider
        .when('/',{
        templateUrl: 'views/home.html',
        controller:'homeCtrl'
    })
        .when('/views/sample1',{
        templateUrl:'views/sample1.html',
        controller:'sample1Ctrl'
    })
        .when('/views/sample2',{
        templateUrl:'views/sample2.html',
        controller:'sample2Ctrl'
    })
        .when('/views/sample3',{
        templateUrl:'views/sample3.html',
        controller:'sample3Ctrl'
    })
    $locationProvider.html5Mode(true);
})
meanApp.controller('homeCtrl',['$scope', '$http', '$httpParamSerializer', function($scope, $http, $httpParamSerializer){

    $scope.createInfo = function(){
    
        if($scope.data.name == null|| $scope.data.password==null){
            $scope.required="name && password are required";
            
        }else{
           
            
            var config = {
                headers:{
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            }
           //WRAP THE DATA IN ONE POCKET
           var myData = $.param({
               name: $scope.data.name,
               password: $scope.data.password,
               age: $scope.data.age
           })
          console.log(myData);
            
            $http.post('/api/save', myData, config)
            .then((response)=>{
 
               console.log("success " + response);
            
            }, (response)=>{
               
                var x= JSON.stringify(response);
                 console.log("Error" + x);
               
            });
        }
                //set the input area to {} instead of "" because "" will set the input content to null, you cannot in
                $scope.data={};
               
    }




}] )


