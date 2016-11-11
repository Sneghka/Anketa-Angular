'use strickt';

angular.module('myApp', ['ui.router'])

.constant("baseURL", "http://localhost:3000/")

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('form', {
            url: '/form',
            templateUrl: 'views/form.html',
            controller: "formController"
        })
        .state('form.step1', {
            url: '/step1',
            templateUrl: 'views/step1.html',
            /*controller: "formController"*/
        })

    .state('form.step2', {
        url: '/step2',
        templateUrl: 'views/step2.html',
        /*controller: "formController"*/
    })
    .state('form.step3', {
        url: '/step3',
        templateUrl: 'views/step3.html',
        /*controller: "formController"*/
    });

    $urlRouterProvider.otherwise('/form/step1');
})


.controller('formController', function ($scope, $http) {

    $scope.user = {
        name: "",
        email: "",
        country: "",
        city: "",
        social: "",
        img: ""
    };
    
     $http.get('countries.json').then(function (response) {
       $scope.countries = response.data;
        
    }, function () {
        alert("Something wrong!");
    });
  
});
