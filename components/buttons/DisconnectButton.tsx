import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import React, { useCallback, useState } from "react";
import { Button } from "react-native";

import useAuthorization from "../../utils/useAuthorization";

export default function DisconnectButton() {
  const { deauthorizeSession } = useAuthorization();
  const [deauthorizationInProgress, setDeauthorizationInProgress] =
    useState(false);
  const handleConnectPress = useCallback(async () => {
    try {
      if (deauthorizationInProgress) {
        return;
      }
      setDeauthorizationInProgress(true);
      await transact(async (wallet) => {
        await deauthorizeSession(wallet);
      });
    } finally {
      setDeauthorizationInProgress(false);
    }
  }, []);
  return (
    <Button
      title="Disconnect Wallet"
      disabled={deauthorizationInProgress}
      onPress={handleConnectPress}
    />
  );
}
