import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

export const Jackpot = () => {
  const { targetNetwork } = useTargetNetwork();

  return (
    <div className="md:w-1/3 md:h-[150px] w-1/2 rounded-[1rem] bg-gradient-to-tr from-[#0F161D] via-[#ecefb7] to-[#0F161D] hover:shadow-center hover:shadow-[#FFB702] duration-300 p-[1px] overflow-y-hidden">
      <div className="card rounded-[1rem] h-full image-full overflow-hidden md:text-base text-xs">
        <div className="relative card-body p-0 pl-2 bg-gradient-to-tl from-orange-600 to-[#88562d] md:flex-col flex-row bg-opacity-60 pointer-events-none">
          <img
            className="z-10 absolute opacity-40 md:h-[150px] h-[90px] md:w-[150px] w-[90px] right-0 bottom-0"
            src={"/placeholders/jackpot.png"}
            alt="Jackpot"
          />
          <div className="z-20 flex flex-row my-auto items-center w-full h-full md:py-0 py-2">
            <div className="w-full h-full flex flex-col justify-between md:p-2">
              <span className="md:text-xl text-base oonga-boonga">DAILY JACKPOT</span>
              <div className="flex flex-row items-center">
                <span className="text-neutral text-base font-bold">Embrace your Oooga Booga</span>
              </div>
              <div className="flex md:flex-row flex-col w-full md:gap-2 gap-1">
                <div className="md:w-1/3 w-full flex md:flex-col flex-row">
                  <span className="text-neutral">Today&apos;s Pot:</span>
                  <div className="flex flex-row pt-0 m-0">
                    <p className="text-accent m-0 p-0 md:pl-0 pl-1">666 {targetNetwork.nativeCurrency.symbol}</p>
                  </div>
                </div>
                <div className="md:w-2/3 w-full flex md:flex-col flex-row">
                  <span className="text-neutral">Yesterday&apos;s Earnings:</span>
                  <p className="text-accent m-0 p-0 md:pl-0 pl-1">666 {targetNetwork.nativeCurrency.symbol}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
