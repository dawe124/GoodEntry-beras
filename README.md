# Las Beras

## Run locally

```
RPC_URL=https://arb1.arbitrum.io/rpc
anvil --fork-url $RPC_URL --chain-id 31337
yarn deploy
```

## Testing
```
forge test -vvvv --fork-url $RPC_URL
forge coverage --report summary --report lcov -vv --fork-url $RPC_URL
```


## Deployments

### Arbitrum

TokenController   0x5216d70fc19edb1ffe21f5dd390925426d89a48c
