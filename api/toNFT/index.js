import express from 'express';
import ContractGeneration from './scripts/NFTGarden.js';

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.get('/api/nftgarden', async (req, res, next) => {
  try {
    const data = {
      title: "Nagoya Blockchain Hackathon",
      wallet_address: "0x0518edba2dbfafd7e7470be118b5e2777182f051",
      image: "https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm251-mind-instgram-03.jpg?w=1200&h=1200&dpr=1&fit=clip&crop=default&fm=jpg&q=75&vib=3&con=3&usm=15&cs=srgb&bg=F4F4F3&ixlib=js-2.2.1&s=4bc1691a099a543f697bdb6ae8806d0c"
    }
    const result = await ContractGeneration(data);
    res.json(result);
  } catch(err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
