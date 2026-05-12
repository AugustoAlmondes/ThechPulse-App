import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout:10000,
    headers:{
        "Content-Type":"application/json",
        "X-App-Key":process.env.EXPO_PUBLIC_APP_KEY,
        "User-Agent":"TeachPulse/1.0.0 ReactNative"
    }
})