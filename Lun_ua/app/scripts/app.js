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
                templateUrl: 'views/step1.html'
            })
            .state('form.step2', {
                url: '/step2',
                templateUrl: 'views/step2.html'
            })
            .state('form.step3', {
                url: '/step3',
                templateUrl: 'views/step3.html'
            })
            .state('form.step4', {
                url: '/step4',
                templateUrl: 'views/step4.html'
            })
            .state('form.submission_preview', {
                url: '/submission_preview',
                templateUrl: 'views/submission_preview.html'
            });

        $urlRouterProvider.otherwise('/form/step1');
    })
    .controller('formController', function ($scope, $http, $filter) {
        $scope.user = {
            name: "",
            email: "",
            selectedCountry: "",
            selectedCity: "",
            selectedImage: {}
        };

        $scope.social = [
            {
                id: "facebook",
                name: "Facebook",
                checked: false,
                link: ""
            },
            {
                id: "vkontakte",
                name: "Вконтакте",
                checked: false,
                link: ""
            },
            {
                id: "twitter",
                name: "Twitter",
                checked: false,
                link: ""
            },
            {
                id: "odnoklassniki",
                name: "Одноклассники",
                checked: false,
                link: ""
            }
        ];

        $scope.selectSocial = function () {
            $scope.selectedSocialList = $filter('filter')($scope.social, {
                checked: true
            });
        };

        $scope.countries = [];
        $http.get('countries.json').then(function (response) {
            var countries = response.data;
            for (var key in countries) {
                if (countries.hasOwnProperty(key)) {
                    var item = {
                        id: key,
                        name: countries[key]
                    };
                    $scope.countries.push(item);
                }
            }
        }, function () {
            alert("Something wrong!");
        });

        $scope.cities = [];
        $http.get('cities.json').then(function (response) {
            var cities = response.data;
            for (var key in cities) {
                if (cities.hasOwnProperty(key)) {
                    var item = {
                        id: key,
                        name: cities[key].name,
                        countryID: cities[key].country
                    };
                    $scope.cities.push(item);
                    /*console.log(key + " -> " + cities[key].name);*/
                }
            }
        }, function () {
            alert("Something wrong!");
        });


        $scope.filterByCountry = function (countryID, selectedCountry) {
            if (countryID == selectedCountry) {
                return true;
            }
            return false;
        };


        $scope.images = [
            {
                src: 'images/cat1.jpg',
                alt: 'cat'
    },
            {
                src: 'images/cat2.jpg',
                alt: 'cat'
    },
            {
                src: 'images/cat3.jpg',
                alt: 'cat'
    },
            {
                src: 'images/dog4.jpg',
                alt: 'dog'
    }
                    ];
        $scope.choseImage = function (index) {
            $scope.selectedImg = $scope.images[index];
        };

        $scope.indexSelectedImage = {};
        $scope.changeBorder = function (index) {
            $scope.indexSelectedImage = index;
            $scope.isEnable = $scope.selectedImg.alt == 'cat' ? true : false;

        };


        $scope.submitForm = function () {
            $scope.user = {
                name: "",
                email: "",
                selectedCountry: "",
                selectedCity: ""
            };

            for (var i = 0; i < $scope.social.length; i++) {
                $scope.social[i].checked = false;
                $scope.social[i].link = "";
            }

             $scope.selectedSocialList = {};
            $scope.indexSelectedImage = undefined;
            $scope.selectedImg = {};
            $scope.myForm.$setPristine();
            $scope.isEnable = false;
        };

    });