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

    function _setUserDetails(username, id){
        localStorage.setItem("username", username);
        localStorage.setItem("user_id", id);
    }

    function _removeUserDetails(){
        localStorage.removeItem("username");
        localStorage.removeItem("user_id");
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
        clearToken : _clearToken,
        setUserDetails : _setUserDetails,
        removeUserDetails : _removeUserDetails
    }
    
})();


export const localStorageService = LocalStorageService.getService(); //IIFE Pattern


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

    
    if (error.response.status === 400){
        console.log(error);
    }
    
    if (error.response.status === 409){
        throw new axios.Cancel({"Duplicate Entry": 409});
    }
    //JWT Missing - Need to Handle This more Deeply
    if (error.response.status === 422){
        return Promise.reject(error)
    }
    
    //Prevent infinite JWT Refresh Token Loop
    if (error.response.status === 401 && originalRequest.url === 'http://localhost:5000/token') {
        return Promise.reject(error);
    }
    
    //Attempting to Get new Access Token (as it was rejected previously) when it expires via Refresh Token
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorageService.getRefreshToken();
        return fetch("http://localhost:5000/token", {method: 'POST', headers: {Authorization: 'Bearer ' + refreshToken}}).then(resp => resp.json()).then(data => {
        console.log("Token Set : " + token);
        localStorageService.setToken(data);
            return instance(originalRequest); //finish handling original stuff
        });
    }

    //Unauthorized - Gets handlled in the catch block of WithAuth HOC
    if (error.response.status === 401 ){
        throw new axios.Cancel({Unauthorized: 401});
    }

    return Promise.reject(error);
 });


export default instance;

