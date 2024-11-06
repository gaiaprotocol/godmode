# godmode
An exclusive membership unlocking premium benefits and divine privileges. Reserved for The Gods NFT collectors and powerful GAIA token holders.

```
cd utils
node --loader ts-node/esm ./insert-init-data.ts
node --loader ts-node/esm ./generate-init-images.ts
node --loader ts-node/esm ./refresh-all-nfts.ts
```

```
gsutil -m setmeta -h "Cache-Control:public, max-age=31536000, immutable" gs://gaiaprotocol/god_images/**
```