import Onboard from "@web3-onboard/core";
import luksoModule from "@lukso/web3-onboard-config";
import injectedModule from '@web3-onboard/injected-wallets';
import {ConnectModalOptions} from "@web3-onboard/core/dist/types";

const lukso = luksoModule();

const injected = injectedModule({
    custom: [lukso],
    sort: (wallets) => {
        const sorted = wallets.reduce<any[]>((sorted, wallet) => {
            if (wallet.label === "Universal Profiles") {
                sorted.unshift(wallet);
            } else {
                sorted.push(wallet);
            }
            return sorted;
        }, []);
        return sorted;
    },
    displayUnavailable: ["Universal Profiles"],
});

const chains = [
    {
        id: 1,
        token: "LYX",
        label: "LUKSO Mainnet",
        rpcUrl: "https://rpc.lukso.gateway.fm/",
    },
    {
        id: 2,
        token: "LYXt",
        label: "LUKSO Testnet",
        rpcUrl: "https://rpc.testnet.lukso.gateway.fm/",
    },
];

const LOGO = `<svg></svg>`;

const appMetadata = {
    name: "LUKSO Test dApp",
    icon: LOGO,
    logo: LOGO,
    description: "My test dApp using Web3 Onboard",
    recommendedInjectedWallets: [
        {
            name: "Universal Profiles",
            url: "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en",
        },
    ],
};

const connect: ConnectModalOptions = {
    iDontHaveAWalletLink:
        "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en",
    removeWhereIsMyWalletWarning: true,
};

export const onboard = Onboard({
    wallets: [injected],
    chains,
    appMetadata,
    connect,
});