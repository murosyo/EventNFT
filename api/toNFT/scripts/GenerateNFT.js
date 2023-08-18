import axios from 'axios';
import { nftgarden } from './../config/nftgarden.js';


const CreateCollection = async (data) => {
  console.log("CreateCollection");
  const body = {
    'wallet_address': data.wallet_address,
    'blockchain': nftgarden.body.blockchain,
    'name': data.event.title,
    'description': data.event.details,
    'image': data.image,
    'enable_transfer': true
  };
  const response = await axios.post(
    nftgarden.baseURL + '/createcollection', body, { headers: nftgarden.headers1 })
    .then((res) => {
      console.log("success:", res.data.response);
      console.log(res.data.response.transaction_gdn_id);
      return (res.data.response.transaction_gdn_id);
    }).catch((err) => {
      console.error("error:", err.response.data);
      return (err);
    });
  return (response);
};

const GetCollections = async (transaction_gdn_id) => {
  console.log("GetCollections");
  const body = {
    "transaction_gdn_ids": [transaction_gdn_id]
  };
  const response = await axios.post(
    nftgarden.baseURL + '/getcollections', body, {headers: nftgarden.headers1})
      .then((res) => {
        console.log("success:", res.data);
        console.log(res.data.collections[0].contract_address);
        return (res.data.collections[0].contract_address);
      }).catch((err) => {
        console.error("error:", err);
        return (err);
      });
  return (response);
};

const CreateNFT = async (data, contract_address) => {
  console.log("CreateNFT");
  const body = {
    "contract_address": contract_address,
    "blockchain": nftgarden.body.blockchain,
    "receiver_wallet_address": data.wallet_address,
    "metadata": [{
        "title": data.event.title,
        "description": data.event.details,
        "file_fields": [{
            "key": "image",
            "url": data.event.image
        }]
    }]};
  const response = await axios.post(
    nftgarden.baseURL + '/createnft', body, { headers: nftgarden.headers1 })
    .then((res) => {
      console.log("success:", res.data.nfts);
      console.log(res.data.nfts[0].nft_gdn_ids);
      return (res.data.nfts[0].nft_gdn_ids);
    }).catch((err) => {
      console.error("error:", err.response.data);
      return (err);
    });
  return (response);
};

const GetNFTs = async (nft_gdn_ids) => {
  const body = {
    "nft_gdn_ids": [nft_gdn_ids],
  };
  const response = await axios.post(
    nftgarden.baseURL + '/getnfts', body, {headers: nftgarden.headers1})
    .then((res) => {
      console.log("success:", res.data);
      console.log(res.data.nfts[0]);
      return (res.data.nfts[0]);
    }).catch((err) => {
      console.error("error:", err);
      return (err);
    });
  return (response);
};

const GenerateNFT = async (data) => {
  console.log("GenerateNFT");
  const transaction_gdn_id = await CreateCollection(data);
  const contract_address = await GetCollections(transaction_gdn_id);
  const nft_gdn_ids = await CreateNFT(data, contract_address);
  const nft = await GetNFTs(nft_gdn_ids);
  return (nft);
};

export default GenerateNFT;
