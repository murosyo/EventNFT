import axios from 'axios';


const CreateCollection = async (data) => {
  const response = await axios.post(
    'https://api.nftgarden.app/api/v1/createcollection',
    // '{"wallet_address": "0x0518edba2dbfafd7e7470be118b5e2777182f051", "blockchain": "astar", "name": "event name", "description": "description", "image": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"}',
    {
      'wallet_address': '0x0518edba2dbfafd7e7470be118b5e2777182f051',
      'blockchain': 'polygon',
      'name': 'Nagoya Blockchain Hackathon',
      'description': 'description',
      'image': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '75e44adf7869a77d51f1653dd8d3f85c-bc5807bf6cb29abae14126460149430062b37813b2666ca2434b514e4272889c'
      }
    })
    .then((res) => {
      console.log("success", res.data.response);
      return (res.data.response);
    }).catch((err) => {
      console.error("error", err.response.data);
      return (err);
    });
    return (response);
};

const ContractGeneration = async (data) => {
  const contract_address = await CreateCollection()
    .then( async (transaction_gdn_ids) => {
      const contract_address = GetCollections();
      return (contract_address);
    })
  return (contract_address);
}

export default ContractGeneration;