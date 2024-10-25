
import { Contract} from '@ethersproject/contracts';
import ABI from '../artifacts/contracts/GLD.sol/GLD.json';
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
const tokenAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';
const a = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const b = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

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
    // const {provider,connector,account} = useWeb3React();
    const {provider} = useWeb3React();
    const [balance, setBalance] = useState(0);
    const [balanceb, setBalanceb] = useState(0);
    const [voteRes, setvoteRes] = useState([]);
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

    const approve = async ()=>{
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        await contract.approve(b,3);
    }

    const transfer = async ()=>{
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        await contract.transferFrom(a, b, 3);
    }

    const balanceOf = async ()=>{
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        const balance = await contract.balanceOf(a);
        const balanceb = await contract.balanceOf(b);
        setBalance(balance.toString());
        setBalanceb(balanceb.toString());
        console.log("balancea",balance.toString());
        console.log("balanceb",balanceb.toString());
    }

    const addCandidate = async (candidateName)=>{
        console.log(candidateName, " in useContract.js")
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        await contract.addCandidate(candidateName);
    }
    
    const vote = async (candidateId)=>{
        console.log(candidateId, " in useContract.js")
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        await contract.vote(candidateId);
    }
    
    const getAllCandidates = async ()=>{
        console.log("getAllCandidates", " in useContract.js")
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        const voteRes = await contract.getAllCandidates();
        setvoteRes(voteRes);
        console.log("投票数据：", voteRes)
    }


    return {
        approve,
        transfer,
        balanceOf,
        balance,
        balanceb,
        addCandidate,
        vote,
        getAllCandidates,
        voteRes
    }
}

