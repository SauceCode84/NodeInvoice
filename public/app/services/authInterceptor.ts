
class AuthInterceptor implements ng.IHttpInterceptor {

    static factory($q: ng.IQService, $location: ng.ILocationService, AuthToken: IAuthTokenService): AuthInterceptor {
        return new AuthInterceptor($q, $location, AuthToken);
    }

    constructor(private $q: ng.IQService,
        private $location: ng.ILocationService,
        private AuthToken: IAuthTokenService) {
    }

    request = (config: ng.IRequestConfig): ng.IRequestConfig => {
        var token = this.AuthToken.getToken();

        if (token) {
            config.headers['x-access-token'] = token;
        }

        return config;
    }

    repsonseError = (response) => {
        // forbidden?
        if (response.status === 403) {
            this.AuthToken.clearToken();
            this.$location.path('login');
        }

        return this.$q.reject(response);
    }
}

let httpConfig = ($httpProvider: ng.IHttpProvider) => {
    // push the factory function to the array of $httpProvider interceptors
    $httpProvider.interceptors.push(AuthInterceptor.factory);
};

angular
    .module('app')
    .config(httpConfig);
