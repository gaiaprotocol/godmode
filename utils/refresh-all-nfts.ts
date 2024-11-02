import "dotenv/config";

const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY!;

class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "APIError";
  }
}

async function main() {
  for (let i = 1739; i < 3333; i++) {
    const _try = async () => {
      const response = await fetch(
        `https://api.opensea.io/api/v2/chain/ethereum/contract/0x134590acb661da2b318bcde6b39ef5cf8208e372/nfts/${i}/refresh`,
        { method: "POST", headers: { "X-API-KEY": OPENSEA_API_KEY } },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new APIError(
          response.status,
          `OpenSea API error: ${errorText}`,
        );
      }
    };

    while (true) {
      try {
        await _try();
        break;
      } catch (error) {
        console.error(error);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
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
