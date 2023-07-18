import React, { useState, useEffect} from "react";
import CreateProduct from "../components/CreateProduct";
import Product from "../components/Product";
import HeadComponent from '../components/Head';

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const App = () => {
  const { publicKey } = useWallet();
  const isOwner = ( publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );
  const [creating, setCreating] = useState(false);
  const [products, setProducts] = useState([]);
 
  const renderNotConnectedContainer = () => (
    <div>
      <img src="https://64.media.tumblr.com/326f907a6fd9bf251779cd0fdbb27bb7/tumblr_mrjd9jshOz1s4m43ho1_500.gif" alt="emoji" />

      <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button" />
      </div>    
    </div>
  );
 
  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log("Produtos", data);
        });
    }
  }, [publicKey]);

  useEffect(() => {
    if (!creating) {
      fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log("Produtos", data);
        });
    }
  }, [creating])

  const renderItemBuyContainer = () => (
    <div className="products-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );

  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
          <div className="title">
                    <img alt="Pokeball" className="pokeball" src="pokeball.svg"/>
                    <p className="header">Loja de Imagens Pokémon</p>
                    <img alt="Pokeball" className="pokeball" src="pokeball.svg"/>
          </div>
          <p className="sub-text">A única loja de imagens Pokémon em USDC</p>

          {isOwner && (
            <button className="create-product-button" onClick={() => setCreating(!creating)}>
              {creating ? "Close" : "Criar Produto"}
            </button>
          )}
        </header>

        <main>
          {creating && <CreateProduct />}
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
        </main>

      </div>
    </div>
  );
};

export default App;  