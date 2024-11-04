import axios from "axios";

const apiReceitas = axios.create({
    baseURL: "https://api-receitas-pi.vercel.app/receitas"
})

export default apiReceitas