import { React, useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import toplusLogo from './assets/other/toplus_logo.png';
import solanaLogo from './assets/other/solanaLogo.png';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'ItToplus';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TOPLUS_LINK = `https://www.toplus.it`; 
const SOLANA_LINK = `https://solana.com/`; 


const App = () => {
// Actions
  // State
  const [walletAddress, setWalletAddress] = useState(null);
  /*
  * Declare your function
  */
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          
          /*
          * The solana object gives us a function that will allow us to connect
          * directly with the user's wallet!
          */
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Crea il tuo wallet Phantom per potere accedere! 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };
  /*
   * Let's define this method so our code doesn't break.
   * We will write the logic for this next!
   */
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
    else {
      alert('Crea il tuo wallet Phantom per potere accedere! 👻');
    }
  };

  /*
   * We want to render this UI when the user hasn't connected
   * their wallet to our app yet.
   */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );


  /*
   * When our component first mounts, let's check to see if we have a connected
   * Phantom Wallet
   */
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="hero-area">
          <h1>NFT Arte Italia <img
            src="https://flagcdn.com/w80/it.png"
            srcset="https://flagcdn.com/w160/it.png 2x"
            width="60"
            alt="Italy"/></h1> 
          <a
            className="footer-text"
            href={TOPLUS_LINK}
            target="_blank"
            rel="noreferrer"> 
            <img alt="Toplus" className="toplus-logo" src={toplusLogo} /> 
          </a>
          <h2 className="wow fadeInUp">Ottieni NFT sui monumenti italiani!</h2>
          <br/>
          <br/>
          <h3 className="wow fadeInUp">Il primo rilascio è su:</h3>
          <br/>
          <h4 className="wow fadeInUp"><b>Brescia</b></h4>
          <br/>
          <br/>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {/* Check for walletAddress and then pass in walletAddress */}
        {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
          <a
            className="footer-text"
            href={SOLANA_LINK}
            target="_blank"
            rel="noreferrer"> 
            <img alt="Solana" width="200px" src={solanaLogo} /> 
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
