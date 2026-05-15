import axios from "axios";

const API_URL = "http://localhost:5000/issues";

export const getIssues = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getIssueById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};