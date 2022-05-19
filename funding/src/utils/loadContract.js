import contract from '@truffle/contract';
const loadContract = async (name,provider) =>{
    const res=await fetch(`/contracts/${name}.json`);
    const Artifact=await res.json();
    const _contract=await contract(Artifact);
    _contract.setProvider(provider);
    const deployedContact= await _contract.deployed();
    return deployedContact;

}
export default loadContract;