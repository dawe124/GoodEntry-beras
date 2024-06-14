"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Token {
  _id: string;
  symbol: string;
  name: string;
  icon: string;
}

export const TokenSearch = () => {
  const [tokenList, setTokenList] = useState<Token[]>([]);
  const [input, setInput] = useState<string>("");
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch(`/api/search?token=${input}`, {
          cache: "no-store",
        });
        const data = await response.json();
        const { tokens } = data;

        setTokenList(tokens?.length > 0 ? tokens : []);
      } catch (error) {
        console.error("Error fetching token list:", error);
        setTokenList([]);
      }
    };

    if (input.length > 0) {
      fetchTokens();
    } else {
      setTokenList([]);
    }
  }, [input]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        dropdownRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value.length > 0) {
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        className="input w-full input-bordered focus:outline-none focus:ring-2 focus:ring-accent"
        placeholder="Search for Tokens"
      />
      {isDropdownVisible && tokenList.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute rounded-[4px] p-2 z-20 md:left-0 right-0 mt-2 bg-base-100 border-accent border-[1px] md:w-[600px] w-[350px] max-h-[300px] overflow-clip"
        >
          {tokenList.map((token, index) => (
            <Link href={`/token/${token._id}`} key={index}>
              <div className="flex flex-row gap-2 p-2 text-neutral hover:text-accent overflow-clip">
                <span>{token.symbol}</span>
                <span>{token.name}</span>
                <span>{token._id}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
