import express , { Request, Response } from 'express';
import { config } from 'dotenv';
import axios from 'axios';
const reqIp = require('request-ip');
const geoip = require('geoip-lite');

config();


const app = express();

app.use(express.json())
app.set('trust proxy', true);

const port = 3000;

app.get('/api/hello', async (req: Request, res: Response) => {
   try {
     const {visitor_name} = req.query;
     const ip = reqIp.getClientIp(req);
     const geo = geoip.lookup(ip);
     const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${geo.city}&aqi=yes`
     const resp = await axios.get(url);
     return res.status(200).send({
         client_ip: `${ip}`,
         location: `${geo.city}`, 
         greeting: `Hello, ${visitor_name}!, the temperature is ${resp.data.current.temp_c} degrees Celcius in ${geo.city}`
     });
   } catch (error) {
    return res.status(500).send("Something went wrong, pls try again");
   }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});