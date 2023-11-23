import Web3 from 'web3';
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { SiweMessage } from 'siwe';
import useWeb3Onboard from './useWeb3Onboard';
import { ERC725 } from '@erc725/erc725.js';
import lsp3ProfileSchema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json' assert { type: 'json' };

const web3Onboard = useWeb3Onboard();

export async function getLuksoProfiles()
{
    const primaryWallet = await web3Onboard.setupWeb3Onboard();
    const web3 = new Web3(primaryWallet.provider);
    window.web3 = web3;

    const address = primaryWallet.accounts[0].address;
    // Request the user's Universal Profile address
    // await web3.eth.requestAccounts();
    // const accounts = await web3.eth.getAccounts();
    // console.log('accounts', accounts);
    // const address = accounts[0];

    console.log('address', address);

    const myUniversalProfileContract = new web3.eth.Contract(
        UniversalProfileContract.abi,
        address,
    );

    let nonce;
    try {
        const res = await fetch('https://chain-track-back.vercel.app/nonce', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        nonce = await res.text();
    } catch (e) {
        console.log(e);
    }

    console.log('nonce', nonce);

    const chainId = await web3.eth.getChainId();
    console.log('chainId', chainId);

    const msg = {
        domain: window.location.host, // Domain requesting the signing
        address: address,           // Address performing the signing
        statement: 'Hi!.', // a human-readable assertion user signs
        uri: window.location.origin,  // URI from the resource that is the subject of the signing
        version: '1',                 // Current version of the SIWE Message
        chainId: 4201,              // Chain ID to which the session is bound, 4201 is LUKSO Testnet
        nonce: nonce,               // A random number used to prevent replay attacks
        resources: ['https://terms.website.com'], // Information the user wishes to have resolved as part of authentication by the relying party
    };
    console.log('msg', msg);

    const siweMessage = new SiweMessage(msg);
    console.log('siweMessage', siweMessage);

    const message = siweMessage.prepareMessage();
    console.log('message', message);

    // Request the user to sign the login message with his Universal Profile
    const signature = await web3.eth.sign(message, address);
    console.log('signature', signature);

    const messageHash = web3.eth.accounts.hashMessage(message);
    console.log('messageHash', messageHash);

    const isValidSignature = await myUniversalProfileContract.methods
        .isValidSignature(messageHash, signature)
        .call();

    console.log('isValidSignature', isValidSignature);

    // const provider = new BrowserProvider(window.ethereum);
    // const signer = await provider.getSigner();
    // const signatureSiwe = await signer.signMessage(message);


    // const res = await verifySignature(hashedMessage, signature);

    try {
        const str = JSON.stringify({message: message, signature});
        console.log(str);
        const res = await fetch('https://chain-track-back.vercel.app/verify', {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({message, hashedMessage: messageHash, signature}),
        });
        console.log(res);
        const verifyResult = await res.text();
        console.log(verifyResult);
    } catch (e) {
        console.log(e);
    }

    if (isValidSignature === '0x1626ba7e') {
        console.log('Log In successful!');
    } else {
        console.log('Log In failed');
    }



    const erc725js = new ERC725(lsp3ProfileSchema, '0x83849043074C286e5078679Eaed7F6585F80AB13', 'https://rpc.testnet.lukso.gateway.fm',
        {
            ipfsGateway: 'https://api.universalprofile.cloud/ipfs',
        },
    );

    // Get all profile data keys of the smart contract
    const profileData = await erc725js.getData();
    console.log('profileData', profileData);

    const profileMetaData = await erc725js.fetchData('LSP3Profile');
    console.log('profileMetaData', profileMetaData);
}

