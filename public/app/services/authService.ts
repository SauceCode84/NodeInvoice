
interface IAuthService {
    logIn(username: string, password: string): ng.IPromise<ITokenModel>;
    logOut(): void;
    isLoggedIn(): boolean;
    getUser(): ng.IPromise<IUserModel>;
}

interface ITokenModel {
    token: string;
}

interface IUserModel {
    name?: string
    username?: string
}

class AuthService implements IAuthService {
    
    constructor(private $http: ng.IHttpService,
        private $q: ng.IQService,
        private AuthToken: IAuthTokenService) {
    }
    
    logIn = (username: string, password: string) => {
        return this.$http
            .post<ITokenModel>('/api/authenticate', {
                username: username,
                password: password
            })
            .then((response) => {
                this.AuthToken.setToken(response.data.token);
                return response.data;
            });
    }

    logOut = () => {
        this.AuthToken.clearToken();
    }

    isLoggedIn = (): boolean => {
        var token = this.AuthToken.getToken();

        if (token) {
            return true;
        }
        else {
            return false;
        }
    }

    getUser = (): ng.IPromise<IUserModel> => {
         var token = this.AuthToken.getToken();

         if (token) {
             return this.$http.get<IUserModel>('/api/me');
         }
         else {
             return this.$q.reject({ message: 'No token present' });
         }
    }
}

angular
    .module('app')
    .factory('Auth', ['$http', '$q', 'AuthToken', AuthService]);
