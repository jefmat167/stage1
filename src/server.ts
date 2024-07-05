import express , { Request, Response } from 'express';
const reqIp = require('request-ip');
const geoip = require('geoip-lite');

const app = express();

app.use(express.json())
app.set('trust proxy', true);

const port = 3000;

app.get('/api/hello', async (req: Request, res: Response) => {
    const {visitor_name} = req.query;
    const ip = reqIp.getClientIp(req);
    const geo = geoip.lookup(ip);
    return res.send({
        client_ip: `${ip}`,
        location: `${geo.city}`, 
        greeting: `Hello, ${visitor_name}!, the temperature is 11 degrees Celcius in ${geo.city}`
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});