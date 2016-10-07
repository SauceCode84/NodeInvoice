angular
    .module('app')
    .config(($routeProvider, $locationProvider) => {
    $routeProvider
        .when('/', {
        template: 'app/views/pages/home.html'
    })
        .when('/login', {
        template: 'app/views/pages/login.html',
        controller: 'mainController'
    });
    $locationProvider.html5Mode(false);
});
