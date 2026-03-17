# OSS-fuzz libpng project

## Project Description
This is an attempt at solving the ELCA EDI Challenge. This application mints badges on the Polygon Amoy testnet. Please note that I was unable to fully test the whole pipeline as I was unable to get access to testnet tokens. Therefore I was not able to complete the challenge and send my nft badge to the examiner's wallet.
## Link to project
https://johannayara.github.io/elca_challenge/index.html
## Project structure

## Setup
``` 
.
├── contracts/
│   ├── Badge.sol //smart contract used for minting badges
│   └── Box.sol // test contract
├── index.html // code for web interface
├── README.md
├── code_image.jpeg // test image for the website
├── scripts/
│   └── deploy.js // Script to depoly Badge.sol contract
├── test // Smart contract test files 
│   ├── Badge.js
└── └── Box.js
```
### Clone Repository

#### Via HTTPS:
```bash
git clone https://github.com/johannayara/elca_challenge.git
```

#### Via SSH:
```bash
git clone git@github.com:johannayara/elca_challenge.git
```
---
