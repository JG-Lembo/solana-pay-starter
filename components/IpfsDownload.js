import React, {useState, useEffect}  from 'react';
import useIPFS from '../hooks/useIPFS';
import getImageData from '../hooks/getImageData';

const IPFSDownload = ({ hash, filename }) => {

  const [url, setUrl] = useState(null);

  const imagePath = useIPFS(hash, filename);

  useEffect(() => {
    async function getImageUrl(path) {
      const imagedata = await getImageData(path);
      const imageUrl = 'data:application/octet-stream;base64,' + imagedata;
      setUrl(imageUrl);
    }
    getImageUrl(imagePath);
  }, []);

  return (
    <div>
      {imagePath ? (
        url ? (
          <div className="download-component">
            <a className="download-button" href={url} download={filename}>Download ⇩</a>
          </div>
        ) : (
          <div className="download-component">
            <button className="download-button" disabled>Download ⇩</button>
          </div>
        )
      ) : (
        <p>Fazendo download do arquivo...</p>
      )}
    </div>
  );
};

export default IPFSDownload;