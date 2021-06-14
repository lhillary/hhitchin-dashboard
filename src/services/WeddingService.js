import axios from "axios";

const baseUrl = 'https://api.humphreyhillaryhitchin.com';
const number = '';

export async function getGuests(accessToken) {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    };

    try{
        let res = await axios.get(`${baseUrl}/contacts`, axiosConfig);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

export async function getChaseGuests(accessToken) {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    };

    try{
        let res = await axios.get(`${baseUrl}/chase`, axiosConfig);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

export async function getErrorYes(accessToken) {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    };

    try{
        let res = await axios.get(`${baseUrl}/chase`, axiosConfig);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

export async function getAttendingGuests(accessToken) {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    };

    try{
        let res = await axios.get(`${baseUrl}/attending`, axiosConfig);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

export async function getDeclinedGuests(accessToken) {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    };

    try{
        let res = await axios.get(`${baseUrl}/declined`, axiosConfig);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

/* message object should contain the following: 
    message {
        number: +12345678
        message: "whatever you want it to say"
    }
*/

export async function sendMessage(message, accessToken) {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    };

    try{
        let res = await axios.post(`${baseUrl}/send`, message, axiosConfig);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

export async function fetchLogs(accessToken) {
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    };

    try{
        let res = await axios.post(`${baseUrl}/fetch-logs`, number, axiosConfig);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}