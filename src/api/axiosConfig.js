import axios from "axios";

export default axios.create({
  baseURL: " https://ec9d-103-199-174-183.in.ngrok.io ",
  headers: { "ngrok-skip-browser-warning": "true" },
});
