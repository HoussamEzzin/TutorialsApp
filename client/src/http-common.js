import axios from "axios";

export default axios.create({
    baseURL: "http://localhosy:8082/api",
    headers:{
        "Content-type":"application/json"
    }
});