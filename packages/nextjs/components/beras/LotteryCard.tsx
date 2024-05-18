// import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
// import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

export const LotteryCard = () => {
  return (
    <div className="md:block hidden md:w-1/3 md:h-[150px] w-1/2 rounded-[1rem] bg-gradient-to-tr bg-base-100 hover:shadow-center duration-300 p-[1px] overflow-y-hidden cursor-not-allowed">
      <div className="card rounded-[1rem] h-full image-full overflow-hidden md:text-base text-xs">
        <div className="relative card-body p-0 pl-2 bg-gradient-to-tl from-base-200 to-base-100 md:flex-col flex-row bg-opacity-60 pointer-events-none">
          <img
            className="z-10 absolute opacity-40 md:h-[150px] h-[90px] md:w-[150px] w-[90px] right-0 bottom-0"
            src={"/placeholders/lottery.png"}
            alt="Lottery"
          />
          <div className="z-20 flex flex-row my-auto items-center w-full h-full md:py-0 py-2">
            <div className="w-full h-full flex flex-col justify-between md:p-2">
              <span className="md:text-xl text-base oonga-boonga">LOTTERY</span>
              <div className="flex flex-row items-center">
                <span className="text-neutral text-base font-bold">Coming Soon!</span>
              </div>
              <div className="flex md:flex-row flex-col w-full md:gap-2 gap-1">
                <div>*OOGA BOOGA INTENSIFIES*</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
