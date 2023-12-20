/* eslint-disable */

import Web3 from 'web3';
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { SiweMessage } from 'siwe';
import useWeb3Onboard from './useWeb3Onboard';
// @ts-ignore
import EthereumProvider from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';

class Auth {
  web3?: Web3;

  async connect(): Promise<string | undefined> {
    const web3Onboard = useWeb3Onboard();
    const primaryWallet =
      (await web3Onboard.setupWeb3Onboard()) as EthereumProvider;
    console.log('primaryWallet', primaryWallet);
    if (!primaryWallet) {
      return;
    }

    this.web3 = new Web3(primaryWallet.provider);
    window.web3 = this.web3;

    const address = primaryWallet.accounts[0].address;
    console.log('address', address);
    return address;
  }

  async sign(address: string): Promise<boolean> {
    if (!this.web3) {
      throw new Error('Web3 is not initialized');
    }
    const myUniversalProfileContract = new this.web3.eth.Contract(
      UniversalProfileContract.abi as any,
      address,
    );

    let nonce;
    try {
      const res = await fetch('https://chain-track-back.vercel.app/nonce', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      nonce = await res.text();
    } catch (e) {
      console.log(e);
      throw new Error('Failed to fetch nonce');
    }

    console.log('nonce', nonce);

    const chainId = await this.web3.eth.getChainId();
    console.log('chainId', chainId);

    const msg = {
      domain: window.location.host, // Domain requesting the signing
      address: address, // Address performing the signing
      statement: 'Hi!.', // a human-readable assertion user signs
      uri: window.location.origin, // URI from the resource that is the subject of the signing
      version: '1', // Current version of the SIWE Message
      chainId: 4201, // Chain ID to which the session is bound, 4201 is LUKSO Testnet
      nonce: nonce, // A random number used to prevent replay attacks
      resources: ['https://terms.website.com'], // Information the user wishes to have resolved as part of authentication by the relying party
    };
    console.log('msg', msg);

    const siweMessage = new SiweMessage(msg);
    console.log('siweMessage', siweMessage);

    const message = siweMessage.prepareMessage();
    console.log('message', message);

    // Request the user to sign the login message with his Universal Profile
    const signature = await this.web3.eth.sign(message, address);
    console.log('signature', signature);

    const messageHash = this.web3.eth.accounts.hashMessage(message);
    console.log('messageHash', messageHash);

    const isValidSignature = await myUniversalProfileContract.methods
      .isValidSignature(messageHash, signature)
      .call();

    console.log('isValidSignature', isValidSignature);

    try {
      const str = JSON.stringify({ message: message, signature });
      console.log(str);
      const res = await fetch('https://chain-track-back.vercel.app/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          hashedMessage: messageHash,
          signature,
        }),
      });
      console.log(res);
      const verifyResult = await res.text();
      console.log(verifyResult);
    } catch (e) {
      console.log(e);
    }

    if (isValidSignature === '0x1626ba7e') {
      console.log('Log In successful!');
      return true;
    } else {
      console.log('Log In failed');
      return false;
    }
  }
}

export default new Auth();
