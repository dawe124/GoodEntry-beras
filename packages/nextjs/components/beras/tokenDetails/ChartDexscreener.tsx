export const Chart = ({ tokenAddress }: { tokenAddress: string }) => {
  /*
<style>#dexscreener-embed{position:relative;width:100%;padding-bottom:125%;}@media(min-width:1400px){#dexscreener-embed{padding-bottom:65%;}}#dexscreener-embed iframe{position:absolute;width:100%;height:100%;top:0;left:0;border:0;}</style>
*/

  return (
    <div id="dexscreener-embed" className="w-full h-full">
      <iframe
        width="100%"
        height="100%"
        src={"https://dexscreener.com/arbitrum/" + tokenAddress + "?embed=1&theme=dark&info=0"}
      ></iframe>
    </div>
  );
};
