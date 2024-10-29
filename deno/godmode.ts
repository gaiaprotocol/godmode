import { Contract, JsonRpcProvider } from "https://esm.sh/ethers@6.7.0";
import GaiaProtocolGodsABI from "./abis/GaiaProtocolGods.json" assert {
  type: "json",
};
import { GaiaProtocolGods } from "./abis/GaiaProtocolGods.ts";

const INFURA_API_KEY = Deno.env.get("INFURA_API_KEY")!;
const THE_GODS_ADDRESS = "0x134590ACB661Da2B318BcdE6b39eF5cF8208E372";

export async function isGodModeEligible(
  walletAddress: string,
): Promise<boolean> {
  const provider = new JsonRpcProvider(
    `https://mainnet.infura.io/v3/${INFURA_API_KEY}`,
  );

  const contract: GaiaProtocolGods = new Contract(
    THE_GODS_ADDRESS,
    GaiaProtocolGodsABI,
    provider,
  );

  const balance = await contract.balanceOf(walletAddress);
  if (balance > 0n) {
    return true;
  }

  return false;
}
