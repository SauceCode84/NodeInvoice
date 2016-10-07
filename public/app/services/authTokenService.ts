
interface IAuthTokenService {
    getToken(): string;
    setToken(token: string): void;
    clearToken(): void;
}

class AuthTokenService implements IAuthTokenService {

    constructor(private $window: ng.IWindowService) {
    }

    getToken = (): string => {
        return this.$window.localStorage.getItem('token');
    }

    setToken = (token: string) => {
        this.$window.localStorage.setItem('token', token);
    }

    clearToken = () => {
        this.$window.localStorage.removeItem('token');
    }
}

angular
    .module('app')
    .factory('AuthToken', AuthTokenService);
