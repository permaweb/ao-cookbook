import { readFileSync } from "node:fs";

import { ANT, ArweaveSigner } from "@ar.io/sdk";

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
    // const ANT = "uOf4TMgQxdaSXgcZ778PZR13UQPKJoZVK2ZvLAE90Xg";
    const ANT_PROCESS = "YFbfeqZMbPVGFjQ-PHJY-Y99JQu7O3Jdet06pJnD5iI";

    const signer = new ArweaveSigner(jwk);
    const ant = ANT.init({ processId: ANT_PROCESS, signer });

    await ant
      .setRecord({
        undername: "cookbook",
        transactionId: MANIFEST_ID,
        ttlSeconds: 3600,
      })
      .then((res) => console.log("Updated ao ANT record", res.id));

    return MANIFEST_ID;
  },
};

const ACTION = env("ACTION");
if (!actions[ACTION]) throw new Error(`'${ACTION}' is not a valid action`);

actions[ACTION]();
