import axios from 'axios';

import Router from 'next/router';




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


let instance = axios.create({baseURL: 'http://localhost:5000'})


//Will pass Bearer token before every API Request
instance.interceptors.request.use(
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
instance.interceptors.response.use((response) => {
    return response
 }, function (error) {
    const originalRequest = error.config;
    console.log("Called");

    if (error.response.status === 422){
        return Promise.reject(error)
    }

    
    if (error.response.status === 401 && originalRequest.url === 'http://localhost:5000/token') {
        return Promise.reject(error);
    }
 
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorageService.getRefreshToken();
        return fetch("http://localhost:5000/token", {method: 'POST', headers: {Authorization: 'Bearer ' + refreshToken}}).then(resp => resp.json()).then(data => {
            localStorageService.setToken(data);
            return instance(originalRequest); //finish handling original stuff
        });
    }
    return Promise.reject(error);
 });


export default instance;

