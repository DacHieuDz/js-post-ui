import axios from "axios"; // default import

// Use custom instance
const axiosClient = axios.create({
  baseURL: "https://dachieu-api.onrender.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use(
  function (config) {
    // Logic
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (!error.response) {
      throw new Error("Network Error. Please try again");
    }
    if (error.response.status == 401) {
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
/* Tạo ra biến axiosClient bằng axios và config theo nhu cầu
 tức là những config này chỉ có axios axiosClient là có
*/
