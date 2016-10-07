class AuthService {
    constructor($http, $q, AuthToken) {
        this.$http = $http;
        this.$q = $q;
        this.AuthToken = AuthToken;
        this.logIn = (username, password) => {
            return this.$http
                .post('/api/authenticate', {
                username: username,
                password: password
            })
                .then((response) => {
                this.AuthToken.setToken(response.data.token);
                return response.data;
            });
        };
        this.logOut = () => {
            this.AuthToken.clearToken();
        };
        this.isLoggedIn = () => {
            var token = this.AuthToken.getToken();
            if (token) {
                return true;
            }
            else {
                return false;
            }
        };
        this.getUser = () => {
            var token = this.AuthToken.getToken();
            if (token) {
                return this.$http.get('/api/me');
            }
            else {
                return this.$q.reject({ message: 'No token present' });
            }
        };
    }
}
angular
    .module('app')
    .factory('Auth', ['$http', '$q', 'AuthToken', AuthService]);
