import express from 'express';
import GenerateNFT from './scripts/GenerateNFT.js';
import GiveNFT from './scripts/GiveNFT.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.post('/api/createnft', async (req, res, next) => {
  const data = req.body;
  console.log("request:", data);
  try {
    const result = await GenerateNFT(data);
    res.json(result);
  } catch(err) {
    next(err);
  };
});

app.post('/api/test/createnft', async (req, res, next) => {
  const data = req.body;
  console.log("request:", data);
  try {
    const result = {
      nft_gdn_ids: '8233bb32-4437-4fef-845b-2f93ecf83cfa',
      contract_address: '0x60C013A0CACB851ee51fF1A5A3A43ee9bD2D6194',
      token_id: null,
      receiver_wallet_address: '0x155418c24f57277b4d69d226c6b37e43a78c5d15',
      status: 'initiated',
      request_metadata: {
        title: 'Nagoya Blockchain Hackathon1',
        description: 'details',
        file_fields: [ [Object] ]
      },
      metadata_url: null
    };
    res.json(result);
  } catch(err) {
    next(err);
  };
});

app.post('/api/givenft', async (req, res, next) => {
  const data = req.body;
  console.log("request:", data);
  try {
    const result = await GiveNFT(data);
    res.json(result);
  } catch(err) {
    next(err);
  };
});

app.post('/api/test/givenft', async (req, res, next) => {
  // const data = {
  //   contract_address: "0x60C013A0CACB851ee51fF1A5A3A43ee9bD2D6194",
  //   receiver_wallet_address: "0x02a28a96C7b5bD226397fE872B7657e6498e151a",
  //   event: {
  //     title: "Nagoya Blockchain Hackathon1",
  //     details: "details",
  //     image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
  //   }};
  const data = req.body;
  console.log("request:", data);
  try {
    const result = '94b2c001-8d38-4ed7-9300-b23d54bd9428';
    res.json(result);
  } catch(err) {
    next(err);
  };
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
