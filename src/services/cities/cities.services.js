import { citiesApi } from "./api"

export const getCities = async () => {
    try {
        const {data} = await citiesApi.get("/cities")
        const response = data.data
        return response
    } catch (error) {
        console.log(error)
        throw "Could not load cities..."
    }
};

export const getCity = async (id) => {
    console.log('getCity llamado con ID:', id);
    try {
      const {data} = await citiesApi.get(`/cities/`+ id); 
      console.log(`URL de la API: /cities/${id}`);
      const response = data.data
      return response
    } catch (error) {
      console.error("Error fetching city:", error);
      throw "Error fetching city:"; 
    }
  };