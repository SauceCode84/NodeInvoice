
angular
    .module('app')
    .config(($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) => {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/pages/home.html'
            })
            .when('/login', {
                templateUrl: 'app/views/pages/login.html',
                controller: 'mainController'
            });
        
        $locationProvider.html5Mode(true);
    });
