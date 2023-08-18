import axios from 'axios';
import { nftgarden } from "./../config/nftgarden.js";


const GiveNFT = async (data) => {
  console.log("GiveNFT");
  const body = {
    "contract_address": data.contract_address,
    "blockchain": nftgarden.body.blockchain,
    "receiver_wallet_address": data.receiver_wallet_address,
    "metadata": [{
        "title": data.event.title,
        "description": data.event.details,
        "file_fields": [{
            "key": "image",
            "url": data.event.image
        }]
  }]};
  const response = await axios.post(
    nftgarden.baseURL + '/createnfttrans', body, { headers: nftgarden.headers1 })
    .then((res) => {
      console.log("success:", res.data);
      console.log(res.data.response[0].transaction_gdn_id);
      console.log(res.data.response[0].transaction_gdn_id);
      return (res.data.response[0].transaction_gdn_id);
    }).catch((err) => {
      console.error("error:", err.response.data);
      return (err);
    });
  return (response);
};

export default GiveNFT;
