import React, { useState } from "react";
import styles from "../styles/CreateProduct.module.css";
import PinataUpload from "./PinataUpload";

const CreateProduct = () => {

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image_url: "",
    description: "",
  });
  
  const [file, setFile] = useState({});

  const [uploading, setUploading] = useState(false);

  const createProduct = async () => {
    try {
      // Combine dados do produto e file.name
      const product = { ...newProduct, ...file };
      console.log("Enviando produto para api",product);
      const response = await fetch("../api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (response.status === 200) {
        alert("Produto adicionado!");
      }
      else{
        alert("Não foi possível adicionar o produto: ", data.error);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.background_blur}>
      <div className={styles.create_product_container}>
        <div className={styles.create_product_form}>
          <header className={styles.header}>
            <h1>Criar Produto</h1>
          </header>

          <div className={styles.form_container}>
            <PinataUpload setFile={setFile} setUploading={setUploading}/>
            {file.name != null && <p className="file-name">{file.filename}</p>}
            <div className={styles.flex_row}>
              <input
                className={styles.input}
                type="text"
                placeholder="Product Name"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, name: e.target.value });
                }}
              />
              <input
                className={styles.input}
                type="text"
                placeholder="0.01 USDC"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, price: e.target.value });
                }}
              />
            </div>
            
            <div className={styles.flex_row}>
              <input
                className={styles.input}
                type="url"
                placeholder="Image URL ex: https://i.imgur.com/rVD8bjt.png"
                onChange={(e) => {
                  setNewProduct({ ...newProduct, image_url: e.target.value });
                }}
              />
            </div>      
            <textarea
              className={styles.text_area}
              placeholder="Descrição aqui..."
              onChange={(e) => {
                setNewProduct({ ...newProduct, description: e.target.value });
              }}
            />

            <button
              className={styles.button}
              onClick={() => {
                createProduct();
              }}
              disabled={uploading}
            >
              Criar Produto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;