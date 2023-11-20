import Web3 from 'web3';
import UniversalProfileContract from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { SiweMessage } from 'siwe';

export async function getLuksoProfiles()
{
    const web3 = new Web3(window.ethereum);

    // Request the user's Universal Profile address
    await web3.eth.requestAccounts();
    const accounts = await web3.eth.getAccounts();

    const myUniversalProfileContract = new web3.eth.Contract(
        UniversalProfileContract.abi,
        accounts[0],
    );

    const hashedMessage = web3.eth.accounts.hashMessage(
        new SiweMessage({
        domain: window.location.host, // Domain requesting the signing
        address: accounts[0],           // Address performing the signing
        statement: 'By logging in you agree to the terms and conditions.', // a human-readable assertion user signs
        uri: window.location.origin,  // URI from the resource that is the subject of the signing
        version: '1',                 // Current version of the SIWE Message
        chainId: 4201,              // Chain ID to which the session is bound, 4201 is LUKSO Testnet
        resources: ['https://terms.website.com'], // Information the user wishes to have resolved as part of authentication by the relying party
        }).prepareMessage(),
    );
    // const message = new SiweMessage({
    //     domain: window.location.host,
    //     address: accounts[0],
    //     statement: 'By logging in you agree to the terms and conditions.',
    //     uri: window.location.origin,
    //     version: '1',
    //     chainId: 4201,
    // }).prepareMessage();

    // Request the user to sign the login message with his Universal Profile
    const signature = await web3.eth.sign(hashedMessage, accounts[0]);

    // const provider = new BrowserProvider(window.ethereum);
    // const signer = await provider.getSigner();
    // const signatureSiwe = await signer.signMessage(message);


    // const res = await verifySignature(hashedMessage, signature);
    try {
        const str = JSON.stringify({message: hashedMessage, signature});
        console.log(str);
        const res = await fetch('https://chain-track-back.vercel.app/verify', {
            method: "POST",
            headers: {
            // "Access-Control-Allow-Credentials" :"true" ,
            // "Access-Control-Allow-Origin" : "https://chain-track-back.vercel.app" ,
            // "Access-Control-Allow-Methods" : "GET,OPTIONS,PATCH,DELETE,POST,PUT" ,
            // "Access-Control-Allow-Headers" : "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({message: hashedMessage, signature}),
            credentials: 'include'
        });
        console.log(await res.text());
    } catch (e) {
        console.log(e);
    }
    // const isValidSignature = await myUniversalProfileContract.methods
    //     .isValidSignature(hashedMessage, signature, accounts[0])
    //     .call();
    //
    // console.log('isValidSignature', isValidSignature);
    // if (isValidSignature === '0x1626ba7e') {
    //     console.log('Log In successful!');
    // } else {
    //     console.log('Log In failed');
    // }
}

