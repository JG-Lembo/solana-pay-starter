import axios from 'axios';

const getImageData = async (imageURL) => {
    const response = await axios.get(imageURL, {responseType: "arraybuffer"});
    const image = btoa(
        new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
        )
    );
    return image;
};
    
export default getImageData;
    