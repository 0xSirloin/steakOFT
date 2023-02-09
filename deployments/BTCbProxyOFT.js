const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")
const {CHAIN_STAGE, ChainStage, ChainKey} = require("@layerzerolabs/lz-sdk");

const NETWORKS = [ChainKey.ARBITRUM]
const BTCB = {
    [ChainStage.MAINNET]: "0xb279f8DD152B99Ec1D84A489D32c35bC0C7F5674",
}

module.exports = async function ({ deployments, getNamedAccounts }) {
    if(!NETWORKS.includes(hre.network.name)) {
        throw new Error(`Can only deploy ProxyOFT on ${NETWORKS}`)
    }

    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    console.log(`>>> your address: ${deployer}`)

    const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name]
    console.log(`[${hre.network.name}] Endpoint Address: ${lzEndpointAddress}`)

    const stage = CHAIN_STAGE[hre.network.name]
    let tokenAddress = BTCB[stage] //|| (await deployments.get("Token")).address
    console.log(`Token Address: ${tokenAddress}`)

    await deploy("STEAKProxyOFT", {
        from: deployer,
        args: [tokenAddress, lzEndpointAddress],
        log: true,
        waitConfirmations: 1,
        skipIfAlreadyDeployed: true, 
        gasLimit: 50000000
    })
}

function getDependencies() {
    if (hre.network.name === "hardhat" || CHAIN_STAGE[hre.network.name] === ChainStage.TESTNET || CHAIN_STAGE[hre.network.name] === ChainStage.TESTNET_SANDBOX) {
        return ["Token"]
    }
}
module.exports.dependencies = getDependencies()
module.exports.tags = ["STEAKProxyOFT"]

/*
npx hardhat verify --contract contracts/BTCbProxyOFT.sol --network avalanche 0x2ec2fcEfFeA8BCA4E60C2c813F81F9adE7d323D2 0xb279f8DD152B99Ec1D84A489D32c35bC0C7F5674 0x3c2269811836af69497E5F486A85D7316753cf62

*/