// Imports
import { ERC725, ERC725JSONSchema } from '@erc725/erc725.js';
import erc725schema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';
import { UserData } from '@/helper/types';
import { FetchDataOutput } from '@erc725/erc725.js/build/main/src/types/decodeData';
import {User} from "@/api/api";

const RPC_ENDPOINT = 'https://rpc.testnet.lukso.gateway.fm';
const IPFS_GATEWAY = 'https://api.universalprofile.cloud/ipfs';

const config = { ipfsGateway: IPFS_GATEWAY };

const mapProfileMetadata = (user: User, profileMetadata: FetchDataOutput): UserData => {
  const { value = {} } = profileMetadata;

  if (value && typeof value === 'object' && 'LSP3Profile' in value) {
    const userData: UserData = {
      ...user,
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
  user: User,
): Promise<UserData> => {
  if (!user || !user.address) {
    throw new Error('No user or user address');
  }

  try {
    const myErc725 = new ERC725(
      erc725schema as ERC725JSONSchema[],
      user.address,
      RPC_ENDPOINT,
      config,
    );
    const profileMetadata = await myErc725.fetchData('LSP3Profile');
    return mapProfileMetadata(user, profileMetadata);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
