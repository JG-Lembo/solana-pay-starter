import axios from "axios"
import styles from "../styles/CreateProduct.module.css";

const JWT = `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`

const PinataUpload = ({setFile, setUploading}) => {

  const changeHandler = async (event) => {

    setUploading(true);

    const file = event.target.files[0];

    const formData = new FormData();
    
    formData.append('file', file)

    const metadata = JSON.stringify({
      name: file.name,
    });
    formData.append('pinataMetadata', metadata);
    
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT
        }
      });
      console.log(res.data.IpfsHash);
      setFile({filename: file.name, hash: res.data.IpfsHash});
      setUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <input type="file"
        className={styles.input}
        accept = ".jpeg,.png,.jpg"
        onChange={changeHandler}/>
    </>
  )
}

export default PinataUpload