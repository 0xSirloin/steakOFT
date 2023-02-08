const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")
const {CHAIN_STAGE, ChainStage, ChainKey} = require("@layerzerolabs/lz-sdk");

const NETWORKS = [ChainKey.AVALANCHE]
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
        skipIfAlreadyDeployed: true
    })
}

function getDependencies() {
    if (hre.network.name === "hardhat" || CHAIN_STAGE[hre.network.name] === ChainStage.TESTNET || CHAIN_STAGE[hre.network.name] === ChainStage.TESTNET_SANDBOX) {
        return ["Token"]
    }
}
module.exports.dependencies = getDependencies()
module.exports.tags = ["STEAKProxyOFT"]