import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

/**
 * @example
 * const externalContracts = {
 *   1: {
 *     DAI: {
 *       address: "0x...",
 *       abi: [...],
 *     },
 *   },
 * } as const;
 */
const externalContracts = {
  31337: {
    HONEY: {
      address: "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B",
      abi: [
        {
          constant: true,
          inputs: [],
          name: "name",
          outputs: [
            {
              name: "",
              type: "string",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_spender",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_from",
              type: "address",
            },
            {
              name: "_to",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [
            {
              name: "",
              type: "uint8",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              name: "_owner",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              name: "balance",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "symbol",
          outputs: [
            {
              name: "",
              type: "string",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_to",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              name: "_owner",
              type: "address",
            },
            {
              name: "_spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          payable: true,
          stateMutability: "payable",
          type: "fallback",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
      ],
    },
    ERC20: {
      address: "0x5216d70fc19edb1ffe21f5dd390925426d89a48c",
      abi: [
        {
          inputs: [
            {
              internalType: "string",
              name: "name_",
              type: "string",
            },
            {
              internalType: "string",
              name: "symbol_",
              type: "string",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "subtractedValue",
              type: "uint256",
            },
          ],
          name: "decreaseAllowance",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "addedValue",
              type: "uint256",
            },
          ],
          name: "increaseAllowance",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
    Token: {
      address: "0x5216d70fc19edb1ffe21f5dd390925426d89a48c",
      abi: [
        {
          type: "constructor",
          inputs: [
            { name: "name", type: "string", internalType: "string" },
            { name: "symbol", type: "string", internalType: "string" },
            { name: "_desc", type: "string", internalType: "string" },
            { name: "_totalSupply", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "allowance",
          inputs: [
            { name: "owner", type: "address", internalType: "address" },
            { name: "spender", type: "address", internalType: "address" },
          ],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "approve",
          inputs: [
            { name: "spender", type: "address", internalType: "address" },
            { name: "amount", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "balanceOf",
          inputs: [{ name: "account", type: "address", internalType: "address" }],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "decimals",
          inputs: [],
          outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "decreaseAllowance",
          inputs: [
            { name: "spender", type: "address", internalType: "address" },
            { name: "subtractedValue", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "desc",
          inputs: [],
          outputs: [{ name: "", type: "string", internalType: "string" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "increaseAllowance",
          inputs: [
            { name: "spender", type: "address", internalType: "address" },
            { name: "addedValue", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "name",
          inputs: [],
          outputs: [{ name: "", type: "string", internalType: "string" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "symbol",
          inputs: [],
          outputs: [{ name: "", type: "string", internalType: "string" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "totalSupply",
          inputs: [],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "transfer",
          inputs: [
            { name: "to", type: "address", internalType: "address" },
            { name: "amount", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "transferFrom",
          inputs: [
            { name: "from", type: "address", internalType: "address" },
            { name: "to", type: "address", internalType: "address" },
            { name: "amount", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "Approval",
          inputs: [
            { name: "owner", type: "address", indexed: true, internalType: "address" },
            { name: "spender", type: "address", indexed: true, internalType: "address" },
            { name: "value", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Transfer",
          inputs: [
            { name: "from", type: "address", indexed: true, internalType: "address" },
            { name: "to", type: "address", indexed: true, internalType: "address" },
            { name: "value", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
      ],
    },
  },
  80085: {
    HONEY: {
      address: "0x7EeCA4205fF31f947EdBd49195a7A88E6A91161B",
      abi: [
        {
          constant: true,
          inputs: [],
          name: "name",
          outputs: [
            {
              name: "",
              type: "string",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_spender",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_from",
              type: "address",
            },
            {
              name: "_to",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [
            {
              name: "",
              type: "uint8",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              name: "_owner",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              name: "balance",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "symbol",
          outputs: [
            {
              name: "",
              type: "string",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_to",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              name: "_owner",
              type: "address",
            },
            {
              name: "_spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          payable: true,
          stateMutability: "payable",
          type: "fallback",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
      ],
    },
    ERC20: {
      address: "0x5216d70fc19edb1ffe21f5dd390925426d89a48c",
      abi: [
        {
          inputs: [
            {
              internalType: "string",
              name: "name_",
              type: "string",
            },
            {
              internalType: "string",
              name: "symbol_",
              type: "string",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "subtractedValue",
              type: "uint256",
            },
          ],
          name: "decreaseAllowance",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "addedValue",
              type: "uint256",
            },
          ],
          name: "increaseAllowance",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
    Token: {
      address: "0x5216d70fc19edb1ffe21f5dd390925426d89a48c",
      abi: [
        {
          type: "constructor",
          inputs: [
            { name: "name", type: "string", internalType: "string" },
            { name: "symbol", type: "string", internalType: "string" },
            { name: "_desc", type: "string", internalType: "string" },
            { name: "_totalSupply", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "allowance",
          inputs: [
            { name: "owner", type: "address", internalType: "address" },
            { name: "spender", type: "address", internalType: "address" },
          ],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "approve",
          inputs: [
            { name: "spender", type: "address", internalType: "address" },
            { name: "amount", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "balanceOf",
          inputs: [{ name: "account", type: "address", internalType: "address" }],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "decimals",
          inputs: [],
          outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "decreaseAllowance",
          inputs: [
            { name: "spender", type: "address", internalType: "address" },
            { name: "subtractedValue", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "desc",
          inputs: [],
          outputs: [{ name: "", type: "string", internalType: "string" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "increaseAllowance",
          inputs: [
            { name: "spender", type: "address", internalType: "address" },
            { name: "addedValue", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "name",
          inputs: [],
          outputs: [{ name: "", type: "string", internalType: "string" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "symbol",
          inputs: [],
          outputs: [{ name: "", type: "string", internalType: "string" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "totalSupply",
          inputs: [],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "transfer",
          inputs: [
            { name: "to", type: "address", internalType: "address" },
            { name: "amount", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "transferFrom",
          inputs: [
            { name: "from", type: "address", internalType: "address" },
            { name: "to", type: "address", internalType: "address" },
            { name: "amount", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "Approval",
          inputs: [
            { name: "owner", type: "address", indexed: true, internalType: "address" },
            { name: "spender", type: "address", indexed: true, internalType: "address" },
            { name: "value", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Transfer",
          inputs: [
            { name: "from", type: "address", indexed: true, internalType: "address" },
            { name: "to", type: "address", indexed: true, internalType: "address" },
            { name: "value", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
      ],
    },
    TokenController: {
      address: "0x3e2089b51fdcf66d571f31e1d598d9529205b2c0",
      abi: [
        {
          type: "constructor",
          inputs: [{ name: "_ammRouter", type: "address", internalType: "address" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "TOTAL_SUPPLY",
          inputs: [],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "ammRouter",
          inputs: [],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "balances",
          inputs: [{ name: "", type: "address", internalType: "address" }],
          outputs: [
            { name: "baseBalance", type: "uint256", internalType: "uint256" },
            { name: "quoteBalance", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "buy",
          inputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "minBoughtTokens", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "baseAmount", type: "uint256", internalType: "uint256" }],
          stateMutability: "payable",
        },
        {
          type: "function",
          name: "buyTicket",
          inputs: [{ name: "token", type: "address", internalType: "address" }],
          outputs: [
            { name: "payout", type: "uint256", internalType: "uint256" },
            { name: "strike", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "payable",
        },
        {
          type: "function",
          name: "claim",
          inputs: [{ name: "token", type: "address", internalType: "address" }],
          outputs: [{ name: "payout", type: "uint256", internalType: "uint256" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "createToken",
          inputs: [
            { name: "name", type: "string", internalType: "string" },
            { name: "symbol", type: "string", internalType: "string" },
            { name: "desc", type: "string", internalType: "string" },
          ],
          outputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "baseAmount", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "payable",
        },
        {
          type: "function",
          name: "dailyJackpot",
          inputs: [{ name: "", type: "uint32", internalType: "uint32" }],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "dailyVolumeLeaders",
          inputs: [
            { name: "", type: "uint32", internalType: "uint32" },
            { name: "", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        { type: "function", name: "depositJackpots", inputs: [], outputs: [], stateMutability: "payable" },
        {
          type: "function",
          name: "distributeDailyJackpot",
          inputs: [{ name: "round", type: "uint32", internalType: "uint32" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "distributeHourlyJackpot",
          inputs: [{ name: "_hhour", type: "uint32", internalType: "uint32" }],
          outputs: [
            { name: "winner", type: "address", internalType: "address" },
            { name: "jackpot", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "nonpayable",
        },
        { type: "function", name: "distributeJackpots", inputs: [], outputs: [], stateMutability: "nonpayable" },
        {
          type: "function",
          name: "ejectToAmm",
          inputs: [{ name: "token", type: "address", internalType: "address" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "getAmountSale",
          inputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "baseAmount", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "quoteAmount", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getBuyAmount",
          inputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "quoteAmount", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "buyAmount", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getDailyVolumeLeaders",
          inputs: [{ name: "_day", type: "uint32", internalType: "uint32" }],
          outputs: [
            { name: "leaders", type: "address[3]", internalType: "address[3]" },
            { name: "volumes", type: "uint256[3]", internalType: "uint256[3]" },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getLastTokens",
          inputs: [],
          outputs: [{ name: "lastTokens", type: "address[]", internalType: "address[]" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getLotterySettings",
          inputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "round", type: "uint32", internalType: "uint32" },
          ],
          outputs: [
            { name: "strike", type: "uint256", internalType: "uint256" },
            { name: "payoutPerTicket", type: "uint256", internalType: "uint256" },
            { name: "totalOI", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getMcap",
          inputs: [{ name: "token", type: "address", internalType: "address" }],
          outputs: [{ name: "mcap", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getPrice",
          inputs: [{ name: "token", type: "address", internalType: "address" }],
          outputs: [{ name: "price", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getTokenDailyVolume",
          inputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "_day", type: "uint32", internalType: "uint32" },
          ],
          outputs: [{ name: "volume", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getTokenHourlyVolume",
          inputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "_hhour", type: "uint32", internalType: "uint32" },
          ],
          outputs: [{ name: "volume", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getTokensLength",
          inputs: [],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getUserLotteryPayout",
          inputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "round", type: "uint32", internalType: "uint32" },
            { name: "user", type: "address", internalType: "address" },
          ],
          outputs: [{ name: "userPayout", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "hhour",
          inputs: [],
          outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "hourlyJackpot",
          inputs: [{ name: "", type: "uint32", internalType: "uint32" }],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "hourlyVolumeLeader",
          inputs: [{ name: "", type: "uint32", internalType: "uint32" }],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "isDistributedDailyJackpot",
          inputs: [{ name: "", type: "uint32", internalType: "uint32" }],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "isDistributedHourlyJackpot",
          inputs: [{ name: "", type: "uint32", internalType: "uint32" }],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "isLotteryRunning",
          inputs: [],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "lotteryThreshold",
          inputs: [],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "mcapToAmm",
          inputs: [],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        { type: "function", name: "renounceOwnership", inputs: [], outputs: [], stateMutability: "nonpayable" },
        {
          type: "function",
          name: "sell",
          inputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "baseAmount", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "quoteAmount", type: "uint256", internalType: "uint256" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setAmmRouter",
          inputs: [{ name: "_ammRouter", type: "address", internalType: "address" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setLotteryRunning",
          inputs: [{ name: "isRunning", type: "bool", internalType: "bool" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setLotteryThreshold",
          inputs: [{ name: "_lotteryThreshold", type: "uint256", internalType: "uint256" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setMcapToAmm",
          inputs: [{ name: "_mcapToAmm", type: "uint256", internalType: "uint256" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setSlope",
          inputs: [{ name: "_slope", type: "uint256", internalType: "uint256" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setTradingFees",
          inputs: [
            { name: "_tradingFee", type: "uint16", internalType: "uint16" },
            { name: "_treasuryFee", type: "uint16", internalType: "uint16" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setTreasury",
          inputs: [{ name: "_treasury", type: "address", internalType: "address" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "slope",
          inputs: [],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tickers",
          inputs: [{ name: "", type: "string", internalType: "string" }],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "today",
          inputs: [],
          outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tokenDailyCloses",
          inputs: [
            { name: "", type: "address", internalType: "address" },
            { name: "", type: "uint32", internalType: "uint32" },
          ],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tokenDailyLotterySettings",
          inputs: [
            { name: "", type: "address", internalType: "address" },
            { name: "", type: "uint32", internalType: "uint32" },
          ],
          outputs: [
            { name: "strike", type: "uint256", internalType: "uint256" },
            { name: "payoutPerTicket", type: "uint256", internalType: "uint256" },
            { name: "totalOI", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tokenDailyLotteryUserBalances",
          inputs: [
            { name: "", type: "address", internalType: "address" },
            { name: "", type: "uint32", internalType: "uint32" },
            { name: "", type: "address", internalType: "address" },
          ],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tokenDailyVolume",
          inputs: [
            { name: "", type: "address", internalType: "address" },
            { name: "", type: "uint32", internalType: "uint32" },
          ],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tokenHourlyVolume",
          inputs: [
            { name: "", type: "address", internalType: "address" },
            { name: "", type: "uint32", internalType: "uint32" },
          ],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tokens",
          inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tradingFee",
          inputs: [],
          outputs: [{ name: "", type: "uint16", internalType: "uint16" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "transferOwnership",
          inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "treasury",
          inputs: [],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "treasuryFee",
          inputs: [],
          outputs: [{ name: "", type: "uint16", internalType: "uint16" }],
          stateMutability: "view",
        },
        {
          type: "event",
          name: "Buy",
          inputs: [
            { name: "user", type: "address", indexed: true, internalType: "address" },
            { name: "token", type: "address", indexed: true, internalType: "address" },
            { name: "amount", type: "uint256", indexed: false, internalType: "uint256" },
            { name: "quoteAmount", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "BuyTicket",
          inputs: [
            { name: "user", type: "address", indexed: true, internalType: "address" },
            { name: "token", type: "address", indexed: true, internalType: "address" },
            { name: "amount", type: "uint256", indexed: false, internalType: "uint256" },
            { name: "round", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "CreateToken",
          inputs: [
            { name: "user", type: "address", indexed: true, internalType: "address" },
            { name: "token", type: "address", indexed: true, internalType: "address" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Ejected",
          inputs: [
            { name: "token", type: "address", indexed: true, internalType: "address" },
            { name: "amountBase", type: "uint256", indexed: false, internalType: "uint256" },
            { name: "amountQuote", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "HourlyJackpot",
          inputs: [
            { name: "token", type: "address", indexed: true, internalType: "address" },
            { name: "jackpot", type: "uint256", indexed: false, internalType: "uint256" },
            { name: "volume", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "OwnershipTransferred",
          inputs: [
            { name: "previousOwner", type: "address", indexed: true, internalType: "address" },
            { name: "newOwner", type: "address", indexed: true, internalType: "address" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Sell",
          inputs: [
            { name: "user", type: "address", indexed: true, internalType: "address" },
            { name: "token", type: "address", indexed: true, internalType: "address" },
            { name: "amount", type: "uint256", indexed: false, internalType: "uint256" },
            { name: "quoteAmount", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "SetLotteryThreshold",
          inputs: [{ name: "lotteryThreshold", type: "uint256", indexed: false, internalType: "uint256" }],
          anonymous: false,
        },
        {
          type: "event",
          name: "SetMcapToAmm",
          inputs: [{ name: "mcapToAmm", type: "uint256", indexed: false, internalType: "uint256" }],
          anonymous: false,
        },
        {
          type: "event",
          name: "SetSlope",
          inputs: [{ name: "slope", type: "uint256", indexed: false, internalType: "uint256" }],
          anonymous: false,
        },
        {
          type: "event",
          name: "SetTradingFees",
          inputs: [
            { name: "tradingFee", type: "uint256", indexed: false, internalType: "uint256" },
            { name: "treasuryFee", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "SetTreasury",
          inputs: [{ name: "treasury", type: "address", indexed: false, internalType: "address" }],
          anonymous: false,
        },
        {
          type: "event",
          name: "WinningClaim",
          inputs: [
            { name: "user", type: "address", indexed: true, internalType: "address" },
            { name: "token", type: "address", indexed: true, internalType: "address" },
            { name: "amount", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
      ],
      inheritedFunctions: {},
    },
  },
  42161: {
    ERC20: {
      address: "0x5216d70fc19edb1ffe21f5dd390925426d89a48c",
      abi: [
        {
          inputs: [
            {
              internalType: "string",
              name: "name_",
              type: "string",
            },
            {
              internalType: "string",
              name: "symbol_",
              type: "string",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "subtractedValue",
              type: "uint256",
            },
          ],
          name: "decreaseAllowance",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "addedValue",
              type: "uint256",
            },
          ],
          name: "increaseAllowance",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
    },
    Token: {
      address: "0x5216d70fc19edb1ffe21f5dd390925426d89a48c",
      abi: [
        {
          type: "constructor",
          inputs: [
            { name: "name", type: "string", internalType: "string" },
            { name: "symbol", type: "string", internalType: "string" },
            { name: "_desc", type: "string", internalType: "string" },
            { name: "_totalSupply", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "allowance",
          inputs: [
            { name: "owner", type: "address", internalType: "address" },
            { name: "spender", type: "address", internalType: "address" },
          ],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "approve",
          inputs: [
            { name: "spender", type: "address", internalType: "address" },
            { name: "amount", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "balanceOf",
          inputs: [{ name: "account", type: "address", internalType: "address" }],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "decimals",
          inputs: [],
          outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "decreaseAllowance",
          inputs: [
            { name: "spender", type: "address", internalType: "address" },
            { name: "subtractedValue", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "desc",
          inputs: [],
          outputs: [{ name: "", type: "string", internalType: "string" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "increaseAllowance",
          inputs: [
            { name: "spender", type: "address", internalType: "address" },
            { name: "addedValue", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "name",
          inputs: [],
          outputs: [{ name: "", type: "string", internalType: "string" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "symbol",
          inputs: [],
          outputs: [{ name: "", type: "string", internalType: "string" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "totalSupply",
          inputs: [],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "transfer",
          inputs: [
            { name: "to", type: "address", internalType: "address" },
            { name: "amount", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "transferFrom",
          inputs: [
            { name: "from", type: "address", internalType: "address" },
            { name: "to", type: "address", internalType: "address" },
            { name: "amount", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "Approval",
          inputs: [
            { name: "owner", type: "address", indexed: true, internalType: "address" },
            { name: "spender", type: "address", indexed: true, internalType: "address" },
            { name: "value", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Transfer",
          inputs: [
            { name: "from", type: "address", indexed: true, internalType: "address" },
            { name: "to", type: "address", indexed: true, internalType: "address" },
            { name: "value", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
      ],
    },
    TokenController: {
      address: "0x00b9C39788d876DD710dAA897046fC9b6B56cF18",
      abi: [
        {
          type: "constructor",
          inputs: [{ name: "_ammRouter", type: "address", internalType: "address" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "TOTAL_SUPPLY",
          inputs: [],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "ammRouter",
          inputs: [],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "balances",
          inputs: [{ name: "", type: "address", internalType: "address" }],
          outputs: [
            { name: "baseBalance", type: "uint256", internalType: "uint256" },
            { name: "quoteBalance", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "buy",
          inputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "minBoughtTokens", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "baseAmount", type: "uint256", internalType: "uint256" }],
          stateMutability: "payable",
        },
        {
          type: "function",
          name: "buyTicket",
          inputs: [{ name: "token", type: "address", internalType: "address" }],
          outputs: [
            { name: "payout", type: "uint256", internalType: "uint256" },
            { name: "strike", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "payable",
        },
        {
          type: "function",
          name: "claim",
          inputs: [{ name: "token", type: "address", internalType: "address" }],
          outputs: [{ name: "payout", type: "uint256", internalType: "uint256" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "createToken",
          inputs: [
            { name: "name", type: "string", internalType: "string" },
            { name: "symbol", type: "string", internalType: "string" },
            { name: "desc", type: "string", internalType: "string" },
          ],
          outputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "baseAmount", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "payable",
        },
        {
          type: "function",
          name: "dailyJackpot",
          inputs: [{ name: "", type: "uint32", internalType: "uint32" }],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "dailyVolumeLeaders",
          inputs: [
            { name: "", type: "uint32", internalType: "uint32" },
            { name: "", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        { type: "function", name: "depositJackpots", inputs: [], outputs: [], stateMutability: "payable" },
        {
          type: "function",
          name: "distributeDailyJackpot",
          inputs: [{ name: "round", type: "uint32", internalType: "uint32" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "distributeHourlyJackpot",
          inputs: [{ name: "_hhour", type: "uint32", internalType: "uint32" }],
          outputs: [
            { name: "winner", type: "address", internalType: "address" },
            { name: "jackpot", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "nonpayable",
        },
        { type: "function", name: "distributeJackpots", inputs: [], outputs: [], stateMutability: "nonpayable" },
        {
          type: "function",
          name: "ejectToAmm",
          inputs: [{ name: "token", type: "address", internalType: "address" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "getAmountSale",
          inputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "baseAmount", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "quoteAmount", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getBuyAmount",
          inputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "quoteAmount", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "buyAmount", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getDailyVolumeLeaders",
          inputs: [{ name: "_day", type: "uint32", internalType: "uint32" }],
          outputs: [
            { name: "leaders", type: "address[3]", internalType: "address[3]" },
            { name: "volumes", type: "uint256[3]", internalType: "uint256[3]" },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getLastTokens",
          inputs: [],
          outputs: [{ name: "lastTokens", type: "address[]", internalType: "address[]" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getLotterySettings",
          inputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "round", type: "uint32", internalType: "uint32" },
          ],
          outputs: [
            { name: "strike", type: "uint256", internalType: "uint256" },
            { name: "payoutPerTicket", type: "uint256", internalType: "uint256" },
            { name: "totalOI", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getMcap",
          inputs: [{ name: "token", type: "address", internalType: "address" }],
          outputs: [{ name: "mcap", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getPrice",
          inputs: [{ name: "token", type: "address", internalType: "address" }],
          outputs: [{ name: "price", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getTokenDailyVolume",
          inputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "_day", type: "uint32", internalType: "uint32" },
          ],
          outputs: [{ name: "volume", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getTokenHourlyVolume",
          inputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "_hhour", type: "uint32", internalType: "uint32" },
          ],
          outputs: [{ name: "volume", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getTokensLength",
          inputs: [],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getUserLotteryPayout",
          inputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "round", type: "uint32", internalType: "uint32" },
            { name: "user", type: "address", internalType: "address" },
          ],
          outputs: [{ name: "userPayout", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "hhour",
          inputs: [],
          outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "hourlyJackpot",
          inputs: [{ name: "", type: "uint32", internalType: "uint32" }],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "hourlyVolumeLeader",
          inputs: [{ name: "", type: "uint32", internalType: "uint32" }],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "initialize",
          inputs: [{ name: "_ammRouter", type: "address", internalType: "address" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "isDistributedDailyJackpot",
          inputs: [{ name: "", type: "uint32", internalType: "uint32" }],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "isDistributedHourlyJackpot",
          inputs: [{ name: "", type: "uint32", internalType: "uint32" }],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "isLotteryRunning",
          inputs: [],
          outputs: [{ name: "", type: "bool", internalType: "bool" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "lotteryThreshold",
          inputs: [],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "mcapToAmm",
          inputs: [],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        { type: "function", name: "renounceOwnership", inputs: [], outputs: [], stateMutability: "nonpayable" },
        {
          type: "function",
          name: "sell",
          inputs: [
            { name: "token", type: "address", internalType: "address" },
            { name: "baseAmount", type: "uint256", internalType: "uint256" },
          ],
          outputs: [{ name: "quoteAmount", type: "uint256", internalType: "uint256" }],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setAmmRouter",
          inputs: [{ name: "_ammRouter", type: "address", internalType: "address" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setLotteryRunning",
          inputs: [{ name: "isRunning", type: "bool", internalType: "bool" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setLotteryThreshold",
          inputs: [{ name: "_lotteryThreshold", type: "uint256", internalType: "uint256" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setMcapToAmm",
          inputs: [{ name: "_mcapToAmm", type: "uint256", internalType: "uint256" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setSlope",
          inputs: [{ name: "_slope", type: "uint256", internalType: "uint256" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setTradingFees",
          inputs: [
            { name: "_tradingFee", type: "uint16", internalType: "uint16" },
            { name: "_treasuryFee", type: "uint16", internalType: "uint16" },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setTreasury",
          inputs: [{ name: "_treasury", type: "address", internalType: "address" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "slope",
          inputs: [],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tickers",
          inputs: [{ name: "", type: "string", internalType: "string" }],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "today",
          inputs: [],
          outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tokenDailyCloses",
          inputs: [
            { name: "", type: "address", internalType: "address" },
            { name: "", type: "uint32", internalType: "uint32" },
          ],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tokenDailyLotterySettings",
          inputs: [
            { name: "", type: "address", internalType: "address" },
            { name: "", type: "uint32", internalType: "uint32" },
          ],
          outputs: [
            { name: "strike", type: "uint256", internalType: "uint256" },
            { name: "payoutPerTicket", type: "uint256", internalType: "uint256" },
            { name: "totalOI", type: "uint256", internalType: "uint256" },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tokenDailyLotteryUserBalances",
          inputs: [
            { name: "", type: "address", internalType: "address" },
            { name: "", type: "uint32", internalType: "uint32" },
            { name: "", type: "address", internalType: "address" },
          ],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tokenDailyVolume",
          inputs: [
            { name: "", type: "address", internalType: "address" },
            { name: "", type: "uint32", internalType: "uint32" },
          ],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tokenHourlyVolume",
          inputs: [
            { name: "", type: "address", internalType: "address" },
            { name: "", type: "uint32", internalType: "uint32" },
          ],
          outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tokens",
          inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "tradingFee",
          inputs: [],
          outputs: [{ name: "", type: "uint16", internalType: "uint16" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "transferOwnership",
          inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "treasury",
          inputs: [],
          outputs: [{ name: "", type: "address", internalType: "address" }],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "treasuryFee",
          inputs: [],
          outputs: [{ name: "", type: "uint16", internalType: "uint16" }],
          stateMutability: "view",
        },
        {
          type: "event",
          name: "Buy",
          inputs: [
            { name: "user", type: "address", indexed: true, internalType: "address" },
            { name: "token", type: "address", indexed: true, internalType: "address" },
            { name: "amount", type: "uint256", indexed: false, internalType: "uint256" },
            { name: "quoteAmount", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "BuyTicket",
          inputs: [
            { name: "user", type: "address", indexed: true, internalType: "address" },
            { name: "token", type: "address", indexed: true, internalType: "address" },
            { name: "amount", type: "uint256", indexed: false, internalType: "uint256" },
            { name: "round", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "CreateToken",
          inputs: [
            { name: "user", type: "address", indexed: true, internalType: "address" },
            { name: "token", type: "address", indexed: true, internalType: "address" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Ejected",
          inputs: [
            { name: "token", type: "address", indexed: true, internalType: "address" },
            { name: "amountBase", type: "uint256", indexed: false, internalType: "uint256" },
            { name: "amountQuote", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "HourlyJackpot",
          inputs: [
            { name: "token", type: "address", indexed: true, internalType: "address" },
            { name: "jackpot", type: "uint256", indexed: false, internalType: "uint256" },
            { name: "volume", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "OwnershipTransferred",
          inputs: [
            { name: "previousOwner", type: "address", indexed: true, internalType: "address" },
            { name: "newOwner", type: "address", indexed: true, internalType: "address" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Sell",
          inputs: [
            { name: "user", type: "address", indexed: true, internalType: "address" },
            { name: "token", type: "address", indexed: true, internalType: "address" },
            { name: "amount", type: "uint256", indexed: false, internalType: "uint256" },
            { name: "quoteAmount", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "SetLotteryThreshold",
          inputs: [{ name: "lotteryThreshold", type: "uint256", indexed: false, internalType: "uint256" }],
          anonymous: false,
        },
        {
          type: "event",
          name: "SetMcapToAmm",
          inputs: [{ name: "mcapToAmm", type: "uint256", indexed: false, internalType: "uint256" }],
          anonymous: false,
        },
        {
          type: "event",
          name: "SetSlope",
          inputs: [{ name: "slope", type: "uint256", indexed: false, internalType: "uint256" }],
          anonymous: false,
        },
        {
          type: "event",
          name: "SetTradingFees",
          inputs: [
            { name: "tradingFee", type: "uint256", indexed: false, internalType: "uint256" },
            { name: "treasuryFee", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "SetTreasury",
          inputs: [{ name: "treasury", type: "address", indexed: false, internalType: "address" }],
          anonymous: false,
        },
        {
          type: "event",
          name: "WinningClaim",
          inputs: [
            { name: "user", type: "address", indexed: true, internalType: "address" },
            { name: "token", type: "address", indexed: true, internalType: "address" },
            { name: "amount", type: "uint256", indexed: false, internalType: "uint256" },
          ],
          anonymous: false,
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
