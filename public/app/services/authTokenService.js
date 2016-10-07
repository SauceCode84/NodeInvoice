class AuthTokenService {
    constructor($window) {
        this.$window = $window;
        this.getToken = () => {
            return this.$window.localStorage.getItem('token');
        };
        this.setToken = (token) => {
            this.$window.localStorage.setItem('token', token);
        };
        this.clearToken = () => {
            this.$window.localStorage.removeItem('token');
        };
    }
}
angular
    .module('app')
    .factory('AuthToken', AuthTokenService);
