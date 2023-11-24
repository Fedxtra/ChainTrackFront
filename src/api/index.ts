// Imports
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import erc725schema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import { UserData } from '@/helper/types';
import { FetchDataOutput } from '@erc725/erc725.js/build/main/src/types/decodeData';

const RPC_ENDPOINT = 'https://rpc.testnet.lukso.gateway.fm';
const IPFS_GATEWAY = 'https://api.universalprofile.cloud/ipfs';

const config = { ipfsGateway: IPFS_GATEWAY };

const mapProfileMetadata = (profileMetadata: FetchDataOutput): UserData => {
  const { value = {} } = profileMetadata;

  if (value && typeof value === 'object' && 'LSP3Profile' in value) {
    const userData: UserData = {
      name: value.LSP3Profile?.name,
    };

    const { profileImage = [] } = value.LSP3Profile;
    const fullSizeProfileImage = profileImage[0]?.url || '';
    userData.profileImageUrl = fullSizeProfileImage.replace(
      'ipfs:/',
      IPFS_GATEWAY,
    );

    return userData;
  }

  throw new Error('No user data');
};

export const getProfileMetadata = async (
  address: string,
): Promise<UserData | undefined> => {
  if (!address) {
    throw new Error('No address');
  }

  try {
    const myErc725 = new ERC725(
      erc725schema as ERC725JSONSchema[],
      address,
      RPC_ENDPOINT,
      config,
    );
    const profileMetadata = await myErc725.fetchData('LSP3Profile');
    return mapProfileMetadata(profileMetadata);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
