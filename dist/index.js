const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4YmI5OTNiNi02ZWVlLTRhZjAtYmQzYy1kM2M2YWNjMTM1NzAiLCJlbWFpbCI6ImVtbWFraWxiZXJ0dXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImIyZWYxMDNjMzc0NmEwM2RmMzc1Iiwic2NvcGVkS2V5U2VjcmV0IjoiYjc5NzQ5ZjU0MGZkMDFiZDI4NzRjNGQ4MjgwZjM4MDAyMTQ3YTFiNDM4MmM3N2FjYzc3N2JhOTllZGUwZTQyMCIsImlhdCI6MTcwNzc0MzYzMn0.VKkqFgOxn-eqOqRXtj0WYk2vcJ97ToXmB7GH36pVYhU'

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "C:/Users/emmak/Desktop/A4/DecentralizationTechnologies/TD2/IPFS-command.png";

    const file = fs.createReadStream(src)
    formData.append('file', file)

    const pinataMetadata = JSON.stringify({
        name: 'File name',
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`
            }
        });
        console.log(res.data);
    } catch (error) {
        console.log(error);
    }
}

pinFileToIPFS()
