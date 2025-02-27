import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://mytinerary-server.onrender.com/api/cities";

export default function useFetchCities() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(API_URL);
        setCities(response.data.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);
  return { cities, loading, error };
}
