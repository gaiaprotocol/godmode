import { serve } from "https://raw.githubusercontent.com/commonmodule/deno-module/refs/heads/main/api.ts";
import { extractWalletAddressFromRequest } from "https://raw.githubusercontent.com/commonmodule/wallet-login-module/refs/heads/main/deno/auth.ts";

serve(async (req) => await extractWalletAddressFromRequest(req));
