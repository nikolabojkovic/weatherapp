import axios from 'axios'
import config from '../../../public/config'

export default axios.create({
  baseURL: config.apiUrl,
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
