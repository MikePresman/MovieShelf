import axios from 'axios';
import { useRouter } from 'next/router';

axios.defaults.baseURL = 'http://localhost:5000';

//This is a LocalStorageService
const LocalStorageService = (() => {
    let _service;

    function _getService(){
        if (!_service){
            _service = this;
            return _service;
        }
        return _service;
    }

    function _setToken(tokenObj) {
        localStorage.setItem('access_token', tokenObj.access_token);
        localStorage.setItem('refresh_token', tokenObj.refresh_token);
    }

    function _getAccessToken() {
        return localStorage.getItem('access_token');
    }
    
    function _getRefreshToken() {
        return localStorage.getItem('refresh_token');
    }
    
    function _clearToken() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
    
    return {
        getService : _getService,
        setToken : _setToken,
        getAccessToken : _getAccessToken,
        getRefreshToken : _getRefreshToken,
        clearToken : _clearToken
    }
})();


export const localStorageService = LocalStorageService.getService(); //new 'instance', wtf is javascript


//Will pass Bearer token before every API Request
axios.interceptors.request.use(
    config => {
        const token = localStorageService.getAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });
 

//the idea is that we try to make a request, if the response fails because access token expired, so we make a request to /token which gets a new access and refresh token
//we set up those new refresh and access tokens, and we move on