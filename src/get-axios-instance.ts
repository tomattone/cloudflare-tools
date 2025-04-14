import axios from 'axios'

const CLOUDFLARE_API_BASE = 'https://api.cloudflare.com/client/v4'

const EMAIL = process.env.CLOUDFLARE_EMAIL
const API_KEY = process.env.CLOUDFLARE_API_KEY

if (!API_KEY || !EMAIL) {
  console.error(
    'Erro: Chave de API ou email não encontrados. Verifique o arquivo .env.'
  )
}

// Configuração do Axios
export const axiosInstance = axios.create({
  baseURL: CLOUDFLARE_API_BASE,
  headers: {
    'X-Auth-Email': EMAIL,
    'X-Auth-Key': API_KEY,
    'Content-Type': 'application/json',
  },
})
