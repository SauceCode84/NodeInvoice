class AuthInterceptor {
    constructor($q, $location, AuthToken) {
        this.$q = $q;
        this.$location = $location;
        this.AuthToken = AuthToken;
        this.request = (config) => {
            var token = this.AuthToken.getToken();
            if (token) {
                config.headers['x-access-token'] = token;
            }
            return config;
        };
        this.repsonseError = (response) => {
            // forbidden?
            if (response.status === 403) {
                this.AuthToken.clearToken();
                this.$location.path('login');
            }
            return this.$q.reject(response);
        };
    }
    static factory($q, $location, AuthToken) {
        return new AuthInterceptor($q, $location, AuthToken);
    }
}
let httpConfig = ($httpProvider) => {
    // push the factory function to the array of $httpProvider interceptors
    $httpProvider.interceptors.push(AuthInterceptor.factory);
};
angular
    .module('app')
    .config(httpConfig);
