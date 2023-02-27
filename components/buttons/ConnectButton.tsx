import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { Keypair, Transaction } from "@solana/web3.js";
import React, { useCallback, useState } from "react";
import { Button } from "react-native";
import useSocialProtocolStore from "../../stores/useSocialProtocolStore";
import { ProtocolOptions, SocialProtocol } from "@spling/social-protocol";

import useAuthorization from "../../utils/useAuthorization";

export default function ConnectButton() {
  const { authorizeSession } = useAuthorization();
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  const setSocialPorotcol = useSocialProtocolStore(
    (state) => state.setSocialPotocol
  );

  const handleConnectPress = useCallback(async () => {
    try {
      if (authorizationInProgress) {
        return;
      }
      setAuthorizationInProgress(true);
      await transact(async (wallet) => {
        const account = await authorizeSession(wallet);
        console.log("Account:", account);
        const nodeWallet = {
          signTransaction: async (tx: Transaction) => {
            const transactions = await wallet.signTransactions({
              transactions: [tx],
            });
            // Mutation expected
            return Object.assign(tx, transactions[0]);
          },
          signAllTransactions(txs: Transaction[]) {
            return wallet.signTransactions({
              transactions: txs,
            });
          },
          async signMessage(message: Uint8Array) {
            return (
              await wallet.signMessages({
                addresses: [account.address],
                payloads: [message],
              })
            )[0];
          },
          publicKey: account.publicKey,
          payer: undefined as any,
        };
        try {
          const protocolOptions = {
            // rpcUrl:
            //   "https://rpc.helius.xyz/?api-key=b278509a-4b42-4167-ac24-9a6ccdded328",
            useIndexer: true,
          } as ProtocolOptions;
          console.log("Creating social protocol");

          const socialProtocol: SocialProtocol = await new SocialProtocol(
            Keypair.generate(), // user wallet
            null, // payer (optional)
            protocolOptions // protocol options defined above
          ).init();
          setSocialPorotcol(socialProtocol);
          console.log("Finished");
        } catch (error) {
          console.log("Init error:", error);
        }
      });
    } finally {
      setAuthorizationInProgress(false);
    }
  }, []);
  return (
    <Button
      title="Connect Wallet"
      disabled={authorizationInProgress}
      onPress={handleConnectPress}
    />
  );
}
