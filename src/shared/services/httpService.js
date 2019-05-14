import axios from 'axios'

export default axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': 'Mon, 26 Jul 1997 05:00:00 GMT',          
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US'
  }
})
