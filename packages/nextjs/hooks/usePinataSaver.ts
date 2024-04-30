import { useState } from "react";
import axios from "axios";

/* eslint-disable @typescript-eslint/no-var-requires */
const FormData = require("form-data");

const JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxMDAxYmE1Yi1jOTBkLTQ5YWQtYjQ5MC02NDNkNGM2MjkyMzMiLCJlbWFpbCI6ImxhcGluZ2Fyb3VAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjBhYWYwNmUzZGU1NmVkMGZhMDE3Iiwic2NvcGVkS2V5U2VjcmV0IjoiZDRmNGZjN2I4MGZmMmE2OTZlMTZkOTJkMWY0MjhhYjNlMzQ1MmM4NDYzYjliZDUxNTI5OTY0YzBlNTg0MTE1YiIsImlhdCI6MTcxNDEwOTk3MX0.ONhbuND1ZpzWD3bjJd6E58wQemoHstq0cRpWkWDLYME";

export const usePinataSaver = () => {
  const [ipfsHash, setIpfsHash] = useState("QmdfoZ6Up3iNLF92ZRXhJTN7Rd3HTtrno3Db9iqyq3vBcg");

  const upload = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);

    const pinataMetadata = JSON.stringify({
      name: "File name",
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: 2500000,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`,
        },
      });
      console.log(res.data);
      setIpfsHash(res.data.IpfsHash);
    } catch (error) {
      console.log(error);
    }
  };

  return { upload: upload, ipfsHash: ipfsHash };
};
