
import { Contract} from '@ethersproject/contracts';
// import ABI from '../artifacts/contracts/GLD.sol/GLD.json';
import ABI from '../artifacts/contracts/GLD.sol/LockModule#Loan.json';
import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
const tokenAddress = '0xA51926D9B32622ee286cCfB41dBb53FB962E074E';
// const a = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
// const b = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

/**
 * 1. a账户初始有10个代币
 * 2. a给b的账户转3个币
 * 
 * 3. 切换到A的账户，授权B账户可以从A的账户转3个代币
 * 4. 切换到B的账户上，从A里面转3个代币到B账户
 * 
 * 5. A有4个代币，B有6个代币
 */
export function useContract(){
    const {provider, account} = useWeb3React();
    // const [balance, setBalance] = useState(0);
    // const [balanceb, setBalanceb] = useState(0);
    const [launchProjects, setlaunchProjects] = useState("");
    // useEffect(()=>{
    //     const signer = provider.getSigner();
    //     if(!provider){
    //         return;
    //     }
    //     const contract = new Contract('tokenAddress',ABI.abi,signer);
    //     contract.deployed().then((contract)=>{
    //         contract.transfer(b,3);
    //     })
    // },[provider, connector, account])

    useEffect(() => {
        console.log("launchProjects：", launchProjects);
      }, [launchProjects]);

    const createProject = async (amount, rate, term, collectEndTime, repayMethod)=>{
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        await contract.createProject(amount, rate, term, collectEndTime, repayMethod);
    }


    // const addCandidate = async (candidateName)=>{
    //     console.log(candidateName, " in useContract.js")
    //     const signer = provider.getSigner();
    //     if(!provider){
    //         return;
    //     }
    //     const contract = new Contract(tokenAddress, ABI.abi, signer);
    //     await contract.addCandidate(candidateName);
    // }
    

    const getLaunchProjects = async (theAddress, pid)=>{
        console.log("getLaunchProjects", " in useContract.js", theAddress)
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        const rs = await contract.launchProjects(theAddress, pid);
        console.log("rs:", rs, "account: ", account);
        setlaunchProjects(rs.toString());
        // console.log("launchProjects：", launchProjects, launchProjects.toString());
    }



    return {
        createProject,
        getLaunchProjects,
        launchProjects,
    }
}

