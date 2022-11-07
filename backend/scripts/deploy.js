const main = async() => {
  const ContractFactory = await ethers.getContractFactory('TwContract')
  const Contract = await ContractFactory.deploy()
  await Contract.deployed()
  console.log("Contract deployed, address: ", Contract.address)
}
const runMain = async() => {
  try {
    await main()
    process.exit(0)
  } catch(error) {
    console.log(error)
    process.exit(1)
  }
}
runMain()