const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")

module.exports = async function ({ deployments, getNamedAccounts }) {
    //const { deploy } = deployments
    //const { deployer } = await getNamedAccounts()
    console.log(`>>> GENERATING`)

    //const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name]
    //console.log(`[${hre.network.name}] Endpoint Address: ${lzEndpointAddress}`)

    // the trusted remote (or sometimes referred to as the path or pathData)
    // is the packed 40 bytes object of the REMOTE + LOCAL user application contract addresses
    let trustedRemote1 = hre.ethers.utils.solidityPack(
        ['address','address'],
        ['0xddBfBd5dc3BA0FeB96Cb513B689966b2176d4c09', '0x2ec2fcEfFeA8BCA4E60C2c813F81F9adE7d323D2']
        //arb address, avax address
    )

    

    console.log(trustedRemote1, '<- CHAIN 106: trusted AVAX')

    let trustedRemote2 = hre.ethers.utils.solidityPack(
        ['address','address'],
        ['0x2ec2fcEfFeA8BCA4E60C2c813F81F9adE7d323D2', '0xddBfBd5dc3BA0FeB96Cb513B689966b2176d4c09']
        //avax address, arb address
    )
    console.log(trustedRemote2, '<- CHAIN 110: trusted ARB')

    let adapterParams = hre.ethers.utils.solidityPack(
        ["uint16", "uint", "uint", "address"],
        [2, 200000, '1000000000000000000', "0x6A70c42Cf31275BDdf9522B61109FaAdBF8Cf228"]
    )
    console.log(adapterParams, '<- adapterParams')
}

//module.exports.tags = ["SteakOFT"]
//JOE TRUSTED REMOTE
//ChainId = 110
//0x371c7ec6d8039ff7933a2aa28eb827ffe1f52f07371c7ec6d8039ff7933a2aa28eb827ffe1f52f07
//ARB OFT => 0x371c7ec6d8039ff7933a2aa28eb827ffe1f52f07

//STEAK 
//0xddBfBd5dc3BA0FeB96Cb513B689966b2176d4c09ddBfBd5dc3BA0FeB96Cb513B689966b2176d4c09

//0x371c7ec6d8039ff7933a2aa28eb827ffe1f52f07371c7ec6d8039ff7933a2aa28eb827ffe1f52f07
//0x0002000000000000000000000000000000000000000000000000000000000030d40000000000000000000000000000000000000000000000000000000000000000006a70c42cf31275bddf9522b61109faadbf8cf228
//0x00020000000000000000000000000000000000000000000000000000000000030d4000000000000000000000000000000000000000000000000000000000000000006a70c42cf31275bddf9522b61109faadbf8cf228


//AVALANCHE 
//CHAIN_ID: 106
//TrustedRemote: 0xddbfbd5dc3ba0feb96cb513b689966b2176d4c092ec2fceffea8bca4e60c2c813f81f9ade7d323d2