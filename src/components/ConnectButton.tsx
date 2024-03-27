"use client";

import { Network, NetworkType } from "@airgap/beacon-sdk";
import { type BeaconWallet } from "@taquito/beacon-wallet";
import { useState, useEffect } from "react";

const TezosMainnet: Network & { rpcUrl: string } = {
  type: NetworkType.MAINNET,
  rpcUrl: "https://mainnet.api.tez.ie",
};

const ConnectButton = () => {
  const [beaconWallet, setBeaconWallet] = useState<BeaconWallet | null>(null);

  useEffect(() => {
    const initTezos = async () => {
      if (beaconWallet != null) {
        return;
      }

      const { TezosToolkit } = await import("@taquito/taquito");
      const { BeaconWallet } = await import("@taquito/beacon-wallet");

      const Tezos = new TezosToolkit(TezosMainnet.rpcUrl);
      const wallet = new BeaconWallet({
        name: "Gamefi ID React",
        network: TezosMainnet,
      });
      Tezos.setWalletProvider(wallet);
      setBeaconWallet(wallet);
    };

    initTezos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConnect = async () => {
    if (!beaconWallet) {
      return;
    }

    // Disconnect to make sure user can change wallet provider
    await beaconWallet.clearActiveAccount();

    await beaconWallet.client.requestPermissions();
  };

  if (!beaconWallet) {
    return <div></div>;
  }

  return (
    <button
      type="button"
      className="px-6 py-3 bg-blue-400 rounded-lg"
      onClick={handleConnect}
    >
      Connect
    </button>
  );
};

export default ConnectButton;
