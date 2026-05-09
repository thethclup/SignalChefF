import React from 'react';
import { useAccount, useConnect, useDisconnect, useSendTransaction } from 'wagmi';
import { getERC8021Attribution } from '../lib/erc8021';
import { base } from 'wagmi/chains';
import { stringToHex } from 'viem';

export function Web3Widgets({ totalScore }: { totalScore: number }) {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { sendTransaction } = useSendTransaction();

  const handleSayGM = async () => {
    try {
      const attribution = getERC8021Attribution();
      // Dummy transaction to self with 0 value just to put data on-chain
      // We encode the ERC8021 string as data
      sendTransaction({
        to: address,
        value: 0n,
        data: stringToHex(`GM! Score: ${totalScore}. ${attribution.attributionCode}: ${attribution.builderCode}`)
      });
    } catch (e) {
      console.error(e);
      alert('Transaction failed. See console.');
    }
  };

  if (!isConnected) {
    return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => connect({ connector: connectors[0] })}
        className="px-6 py-2 bg-pink-600/20 border border-pink-500/50 hover:bg-pink-600/40 text-pink-400 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-[0_0_15px_rgba(236,72,153,0.2)]"
      >
        Connect Wallet (Base)
      </button>
    </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="hidden sm:flex flex-col text-right">
        <span className="text-[10px] uppercase font-bold text-slate-500 mb-1">Reputation Link</span>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] animate-pulse" />
           <span className="font-bold text-sm text-white bg-white/10 px-3 py-1 rounded-full border border-white/5">
             {address?.slice(0, 6)}...{address?.slice(-4)}
           </span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={handleSayGM}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all border border-orange-500/50 shadow-[0_0_15px_rgba(234,88,12,0.3)]"
        >
          <span>🔥</span> Say GM
        </button>
        <button
          onClick={() => disconnect()}
          className="px-3 py-2 bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
