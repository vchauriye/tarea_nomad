import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export const populateProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/populate-products/`);
    return response.data;
  } catch (error) {
    console.error('Error populating products:', error);
    throw error;
  }
};

export const generateRandomCart = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/generate-random-cart/`);
    console.log('Random cart:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error generating random cart:', error);
    throw error;
  }
};

export const processCart = async (cart) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/process-cart/`, cart);
    return response.data;
  } catch (error) {
    console.error('Error processing cart:', error);
    throw error;
  }
};
