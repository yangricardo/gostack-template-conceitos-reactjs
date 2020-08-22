import axios from "axios";

const api = axios.create({
  baseURL: "http://172.22.167.69:3333",
});

export default api;
