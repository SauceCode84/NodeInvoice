class MainController {
    constructor($scope, $rootScope, $location, Auth) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$location = $location;
        this.Auth = Auth;
        this.onRouteChangeStart = () => {
            this.loggedIn = this.Auth.isLoggedIn();
            this.Auth
                .getUser()
                .then((data) => {
                this.user = data;
            });
        };
        this.doLogin = () => {
            var loginData = this.$scope.loginData;
            this.Auth
                .logIn(loginData.username, loginData.password)
                .then((data) => {
                this.$location.path('/users');
            });
        };
        this.doLogout = () => {
            this.Auth
                .logOut();
            this.user = {};
            this.$location.path('/');
        };
        this.loggedIn = Auth.isLoggedIn();
        $rootScope.$on('$routeChangeStart', this.onRouteChangeStart);
    }
}
angular
    .module('app')
    .controller('mainController', MainController);
