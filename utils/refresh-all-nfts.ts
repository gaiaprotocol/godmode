import "dotenv/config";

const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY!;

class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "APIError";
  }
}

async function main() {
  for (let i = 0; i < 3333; i++) {
    const response = await fetch(
      `https://api.opensea.io/api/v2/chain/ethereum/contract/0x134590acb661da2b318bcde6b39ef5cf8208e372/nfts/${i}/refresh`,
      { headers: { "X-API-KEY": OPENSEA_API_KEY } },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new APIError(
        response.status,
        `OpenSea API error: ${errorText}`,
      );
    }

    console.log(`Refreshed NFT ${i}`);
  }

  console.log("All NFTs refreshed");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
