import { createPublicClient, http } from "https://esm.sh/viem@2.21.47";
import { mainnet } from "https://esm.sh/viem@2.21.47/chains";
import GaiaProtocolGodsArtifact from "./artifacts/GaiaProtocolGods.json" with {
  type: "json",
};
import ParsingNFTDataArtifact from "./artifacts/ParsingNFTData.json" with {
  type: "json",
};

const INFURA_API_KEY = Deno.env.get("INFURA_API_KEY")!;
const THE_GODS_ADDRESS = "0x134590ACB661Da2B318BcdE6b39eF5cF8208E372";
const PARSING_NFT_DATA_ADDRESS = "0x06f98E2E91E64103d612243a151750d14e5EDacC";

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`),
});

export async function getGodBalance(walletAddress: string): Promise<bigint> {
  return await publicClient.readContract({
    address: THE_GODS_ADDRESS,
    abi: GaiaProtocolGodsArtifact.abi,
    functionName: "balanceOf",
    args: [walletAddress],
  });
}

export async function getGodBalances(
  walletAddresses: string[],
): Promise<Record<string, bigint>> {
  const result = await publicClient.readContract({
    address: PARSING_NFT_DATA_ADDRESS,
    abi: ParsingNFTDataArtifact.abi,
    functionName: "getERC721BalanceList_OneToken",
    args: [THE_GODS_ADDRESS, walletAddresses],
  });

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
  const owner = await publicClient.readContract({
    address: THE_GODS_ADDRESS,
    abi: GaiaProtocolGodsArtifact.abi,
    functionName: "ownerOf",
    args: [tokenId],
  });

  if (owner === walletAddress) {
    return true;
  }

  return false;
}
