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

### Testnet

TokenController   0xc9b953528F4674f23dbF952553a9a460a2CAB96f


### Arbitrum
