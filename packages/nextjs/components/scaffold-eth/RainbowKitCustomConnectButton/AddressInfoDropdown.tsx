import { useRef, useState } from "react";
import { NetworkOptions } from "./NetworkOptions";
import CopyToClipboard from "react-copy-to-clipboard";
import { getAddress } from "viem";
import { Address } from "viem";
import { useDisconnect } from "wagmi";
import {
  ArrowLeftOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  FaceSmileIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { isENS } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const allowedNetworks = getTargetNetworks();

type AddressInfoDropdownProps = {
  address: Address;
  blockExplorerAddressLink: string | undefined;
  displayName: string;
};

export const AddressInfoDropdown = ({ address, displayName, blockExplorerAddressLink }: AddressInfoDropdownProps) => {
  const { disconnect } = useDisconnect();
  const checkSumAddress = getAddress(address);

  const [addressCopied, setAddressCopied] = useState(false);

  const [selectingNetwork, setSelectingNetwork] = useState(false);
  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const closeDropdown = () => {
    setSelectingNetwork(false);
    dropdownRef.current?.removeAttribute("open");
  };
  useOutsideClick(dropdownRef, closeDropdown);

  return (
    <>
      <details ref={dropdownRef} className="dropdown dropdown-end leading-3 mx-2">
        <summary
          tabIndex={0}
          className="group btn rounded-[4px] bg-accent hover:bg-transparent hover:border-accent hover:text-accent btn-sm py-0 shadow-md dropdown-toggle gap-0 !h-auto w-40 md:w-44"
        >
          <span className="ml-2 mr-1 text-neutral group-hover:text-accent">
            {isENS(displayName) ? displayName : checkSumAddress?.slice(0, 6) + "..." + checkSumAddress?.slice(-6)}
          </span>
          <ChevronDownIcon className="h-6 w-4 ml-0 md:ml-2 text-neutral group-hover:text-accent" />
        </summary>
        <ul
          tabIndex={0}
          className="dropdown-content menu z-[2] p-2 mt-2 shadow-center shadow-accent text-white bg-base-100 rounded-[4px] gap-1"
        >
          <NetworkOptions hidden={!selectingNetwork} />
          <li
            className={
              selectingNetwork
                ? "hidden"
                : "hover:bg-transparent border-transparent border-[1px] rounded-[4px] hover:border-accent hover:text-accent md:block hidden"
            }
          >
            <button
              className="w-full menu-item btn-sm !rounded-[4px] hover:bg-transparent border-base-300 flex gap-3 py-3"
              type="button"
            >
              <FaceSmileIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <a href={`/profile/${checkSumAddress}`} rel="noopener noreferrer" className="whitespace-nowrap">
                Profile
              </a>
            </button>
          </li>
          <li
            className={
              selectingNetwork
                ? "hidden"
                : "hover:bg-transparent border-transparent border-[1px] rounded-[4px] hover:border-accent hover:text-accent md:block hidden"
            }
          >
            {addressCopied ? (
              <div className="w-full menu-item btn-sm !rounded-[4px] hover:bg-transparent border-base-300 flex gap-3 py-3">
                <CheckCircleIcon
                  className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                  aria-hidden="true"
                />
                <span className=" whitespace-nowrap">Copy address</span>
              </div>
            ) : (
              <CopyToClipboard
                text={checkSumAddress}
                onCopy={() => {
                  setAddressCopied(true);
                  setTimeout(() => {
                    setAddressCopied(false);
                  }, 800);
                }}
              >
                <div className="w-full menu-item btn-sm !rounded-[4px] hover:bg-transparent border-base-300 flex gap-3 py-3">
                  <DocumentDuplicateIcon
                    className="text-xl font-normal h-6 w-4 cursor-pointer ml-2 sm:ml-0"
                    aria-hidden="true"
                  />
                  <span className=" whitespace-nowrap">Copy address</span>
                </div>
              </CopyToClipboard>
            )}
          </li>
          <li
            className={
              selectingNetwork
                ? "hidden"
                : "hover:bg-transparent border-transparent border-[1px] rounded-[4px] hover:border-accent hover:text-accent md:block hidden"
            }
          >
            <label
              htmlFor="qrcode-modal"
              className="w-full menu-item btn-sm !rounded-[4px] hover:bg-transparent border-base-300 flex gap-3 py-3"
            >
              <QrCodeIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <span className="whitespace-nowrap">View QR Code</span>
            </label>
          </li>
          <li
            className={
              selectingNetwork
                ? "hidden"
                : "hover:bg-transparent border-transparent border-[1px] rounded-[4px] hover:border-accent hover:text-accent md:block hidden"
            }
          >
            <button
              className="w-full menu-item btn-sm !rounded-[4px] hover:bg-transparent border-base-300 flex gap-3 py-3"
              type="button"
            >
              <ArrowTopRightOnSquareIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <a
                target="_blank"
                href={blockExplorerAddressLink}
                rel="noopener noreferrer"
                className="whitespace-nowrap"
              >
                View on Block Explorer
              </a>
            </button>
          </li>
          {allowedNetworks.length > 1 ? (
            <li
              className={
                selectingNetwork
                  ? "hidden"
                  : "hover:bg-transparent border-transparent border-[1px] rounded-[4px] hover:border-accent hover:text-accent md:block hidden"
              }
            >
              <button
                className="btn-sm !rounded-[4px] flex gap-3 py-3"
                type="button"
                onClick={() => {
                  setSelectingNetwork(true);
                }}
              >
                <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Switch Network</span>
              </button>
            </li>
          ) : null}
          <li
            className={
              selectingNetwork
                ? "hidden"
                : "!rounded-[4px] border-[1px] border-transparent bg-transparent hover:border-red-600"
            }
          >
            <button
              className="menu-item bg-transparent hover:bg-transparent text-error btn-sm !rounded-[4px] flex gap-3 py-3 hover:text-red-500"
              type="button"
              onClick={() => disconnect()}
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" /> <span>Disconnect</span>
            </button>
          </li>
        </ul>
      </details>
    </>
  );
};
