export const getERC8021Attribution = () => {
  return {
    attributionCode: "[ATTRIBUTION_CODE]",
    builderCode: "bc_gt6nfpi5",
    // Base standard ERC-8021 attribution hex or encoded data can be appended to transactions
    generatePayload: (txData: `0x${string}`) => {
      // Mockup of appending attribution to txData
      return `${txData} /* ATTRIBUTED WITH ERC-8021: bc_gt6nfpi5 */`;
    }
  };
};
