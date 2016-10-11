
interface ILoginData {
    username: string;
    password: string;
}

interface IMainScope extends ng.IScope {
    loggedIn: boolean;
    loginData: ILoginData;
    doLogin(): void;
    doLogout(): void;
}

class MainController {

    public user: IUserModel;

    constructor(private $scope: IMainScope,
        private $rootScope: ng.IScope,
        private $location: ng.ILocationService,
        private Auth: IAuthService) {
        
        this.$scope.loggedIn = Auth.isLoggedIn();

        $rootScope.$on('$routeChangeStart', this.onRouteChangeStart);
    }

    private onRouteChangeStart = () => {
        console.log('onRouteChangeStart');

        this.$scope.loggedIn = this.Auth.isLoggedIn();

        console.log('$scope.loggedIn: ' + this.$scope.loggedIn);

        this.Auth
            .getUser()
            .then((data) => {
                this.user = data;
            });
    }

    doLogin = () => {
        var loginData = this.$scope.loginData;

        this.Auth
            .logIn(loginData.username, loginData.password)
            .then((data) => {
                this.$location.path('/users');
            });
    }

    doLogout = () => {
        this.Auth
            .logOut();
        
        this.user = {};
        this.$location.path('/');
    }
}

angular
    .module('app')
    .controller('mainController', MainController);
