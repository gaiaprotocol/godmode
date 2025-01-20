import { serve } from "https://raw.githubusercontent.com/yjgaia/deno-module/refs/heads/main/api.ts";
//import { extractWalletAddressFromRequest } from "https://raw.githubusercontent.com/yjgaia/wallet-login-module/refs/heads/main/deno/auth.ts";
import { create, verify, decode } from "https://deno.land/x/djwt@v3.0.1/mod.ts";

//const JWT_SECRET = Deno.env.get("JWT_SECRET")!;

export function extractWalletAddressFromRequest(req: Request): `0x${string}` {
  ㅊonst token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) throw new Error("Missing token");

  // Verify the token using the secret
  const decoded = verify(token, "") as
    | { wallet_address?: `0x${string}` }
    | undefined;
  if (!decoded?.wallet_address) throw new Error("Invalid token");

  return decoded.wallet_address;*/
  verify
  return "0x1234567890";
}

serve(async (req) => {
  return "TEST!";
  //return extractWalletAddressFromRequest(req);
});
