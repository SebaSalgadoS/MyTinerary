import axios from "axios"

export const citiesApi = axios.create({baseURL:"https://mytinerary-server.onrender.com/api"});