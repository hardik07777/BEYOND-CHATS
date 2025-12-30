import axios from "axios";

const API = process.env.LARAVEL_API_BASE;

export async function fetchArticles() {
  const res = await axios.get(`${API}/articles`);
  return res.data.data;
}
