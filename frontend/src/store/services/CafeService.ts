import { CafeDto } from "../../models/dto/CafeDto";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/api";

export const getCafes = async (): Promise<CafeDto[]> => {
  try {
    const response = await axios.get(`${API_URL}/Cafes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cafes:", error);
    throw error;
  }
};

export const getCafeById = async (id: string): Promise<CafeDto> => {
  try {
    const response = await axios.get(`${API_URL}/cafes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching cafe with ID ${id}:`, error);
    throw error;
  }
};

export const createCafe = async (cafe: CafeDto): Promise<CafeDto> => {
  try {
    const response = await axios.post(`${API_URL}/cafes`, cafe);
    return response.data;
  } catch (error) {
    console.error("Error creating cafe:", error);
    throw error;
  }
};

export const updateCafe = async (cafe: CafeDto): Promise<CafeDto> => {
  try {
    const response = await axios.put(`${API_URL}/cafes/${cafe.id}`, cafe);
    return response.data;
  } catch (error) {
    console.error(`Error updating cafe with ID ${cafe.id}:`, error);
    throw error;
  }
};

export const deleteCafe = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/cafes/${id}`);
  } catch (error) {
    console.error(`Error deleting cafe with ID ${id}:`, error);
    throw error;
  }
};

export default {
  getCafes,
  getCafeById,
  createCafe,
  updateCafe,
  deleteCafe,
};