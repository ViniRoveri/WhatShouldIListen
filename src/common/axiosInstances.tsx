import axios from "axios";

export const axiosMusicas = axios.create({
    baseURL: 'https://viniroveri.github.io/MyAPIs/json/WhatShouldIListen.json'
})