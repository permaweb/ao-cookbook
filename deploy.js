import { readFileSync } from "node:fs";

import { WarpFactory, defaultCacheOptions } from "warp-contracts";
import Arweave from "arweave";

function env(key) {
  if (!process.env[key]) {
    throw new Error(`Error with ENV VAR: ${key}`);
  }
  return process.env[key];
}

const actions = {
  async UPDATE_ARNS() {
    const WALLET = env("WALLET");
    const MANIFEST_ID = env("MANIFEST_ID");

    const jwk = JSON.parse(readFileSync(WALLET));

    /**
     * The ao ANT Contract
     * See https://sonar.warp.cc/?#/app/contract/uOf4TMgQxdaSXgcZ778PZR13UQPKJoZVK2ZvLAE90Xg?network=mainnet%23
     */
    const ANT = "uOf4TMgQxdaSXgcZ778PZR13UQPKJoZVK2ZvLAE90Xg";

    const arweave = Arweave.init({
      host: "arweave.net",
      port: 443,
      protocol: "https",
    });
    const warp = WarpFactory.forMainnet(defaultCacheOptions, true, arweave);

    // Update the ao ANT Contract to point to the new install script
    const aoAntContract = warp.contract(ANT).connect(jwk);
    const antUpdate = await aoAntContract.writeInteraction({
      function: "setRecord",
      subDomain: "cookbook",
      transactionId: MANIFEST_ID,
    });

    console.log("Updated ao ANT record", antUpdate.interactionTx);

    return MANIFEST_ID;
  },
};

const ACTION = env("ACTION");
if (!actions[ACTION]) throw new Error(`'${ACTION}' is not a valid action`);

actions[ACTION]();
