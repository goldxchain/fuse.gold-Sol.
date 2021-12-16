/**
 * This file helps to provide implementations to perform request operations
 *
 *
 */
import axios from 'axios';

/**
 * Set config defaults when creating the instance
 * @param {*} hostUrl
 * @param {*} token
 */
function initializeInstance(hostUrl, token, access_token){
    let instance = {};
    if(hostUrl != undefined){
        instance = axios.create({
            baseURL: hostUrl,
            timeout: 250000
        });
    }

    if(token != undefined){
        instance.defaults.headers.common['Authorization'] = token;
    }
    
    if(access_token != undefined){
        instance.defaults.headers.common['x-access-token'] = access_token;
    }

    return instance;
}

/**
 * Helps to execute a get request
 * @param {*} hostUrl 
 * @param {*} token 
 * @param {*} endPoint 
 * @param {*} urlParams 
 */
async function getRequest(hostUrl, token, access_token, endPoint, urlParams){
    let instance = initializeInstance(hostUrl, token, access_token);

    if(urlParams==undefined){
        return await instance.get(endPoint, {headers: {'x-access-token': access_token}});
    }
    else{
        return await instance.get(endPoint+"?"+urlParams);
    }
    
}

/**
 * Helps to execute a post request
 * @param {*} hostUrl 
 * @param {*} token 
 * @param {*} endPoint 
 * @param {*} data 
 */
async function postRequest(hostUrl, token, access_token, endPoint, data){
    let instance = initializeInstance(hostUrl, token, access_token);

    return await instance.post(endPoint, data);
}

/**
 * Helps to execute a put request
 * @param {*} hostUrl 
 * @param {*} token 
 * @param {*} endPoint 
 * @param {*} data 
 */
async function putRequest(hostUrl, token, access_token, endPoint, data){
    let instance = initializeInstance(hostUrl, token, access_token);

    return await instance.put(endPoint, data);
}

export default {
    getRequest,
    postRequest,
    putRequest
}