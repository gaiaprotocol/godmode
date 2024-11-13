import { Contract, JsonRpcProvider } from "https://esm.sh/ethers@6.7.0";
import GaiaProtocolGodsABI from "./abis/GaiaProtocolGods.json" with {
  type: "json",
};
import { GaiaProtocolGods } from "./abis/GaiaProtocolGods.ts";
import ParsingNFTDataABI from "./abis/ParsingNFTData.json" with {
  type: "json",
};
import { ParsingNFTData } from "./abis/ParsingNFTData.ts";

const INFURA_API_KEY = Deno.env.get("INFURA_API_KEY")!;
const THE_GODS_ADDRESS = "0x134590ACB661Da2B318BcdE6b39eF5cF8208E372";
const PARSING_NFT_DATA_ADDRESS = "0x06f98E2E91E64103d612243a151750d14e5EDacC";

export async function getGodBalance(walletAddress: string): Promise<bigint> {
  const provider = new JsonRpcProvider(
    `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
  );

  const contract: GaiaProtocolGods = new Contract(
    THE_GODS_ADDRESS,
    GaiaProtocolGodsABI.abi,
    provider,
  ) as any;

  return await contract.balanceOf(walletAddress);
}

export async function getGodBalances(
  walletAddresses: string[],
): Promise<Record<string, bigint>> {
  const provider = new JsonRpcProvider(
    `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
  );

  const contract: ParsingNFTData = new Contract(
    PARSING_NFT_DATA_ADDRESS,
    ParsingNFTDataABI.abi,
    provider,
  ) as any;

  const result = await contract.getERC721BalanceList_OneToken(
    THE_GODS_ADDRESS,
    walletAddresses,
  );

  const balanceList: Record<string, bigint> = {};
  for (let i = 0; i < walletAddresses.length; i++) {
    balanceList[walletAddresses[i]] = result[i];
  }

  return balanceList;
}

export async function isGodModeEligible(
  walletAddress: string,
): Promise<boolean> {
  const balance = await getGodBalance(walletAddress);
  return balance > 0n;
}

export async function checkGodHolder(
  tokenId: number,
  walletAddress: string,
): Promise<boolean> {
  const provider = new JsonRpcProvider(
    `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
  );

  const contract: GaiaProtocolGods = new Contract(
    THE_GODS_ADDRESS,
    GaiaProtocolGodsABI.abi,
    provider,
  ) as any;

  const owner = await contract.ownerOf(tokenId);
  if (owner === walletAddress) {
    return true;
  }

  return false;
}
