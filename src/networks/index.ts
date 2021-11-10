import Ajax from "./src/main";

const axios = new Ajax({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});

export default axios;
