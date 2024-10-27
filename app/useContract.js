
import { Contract} from '@ethersproject/contracts';
import ABI from '../artifacts/contracts/GLD.sol/LockModule#Loan.json';
import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
// const tokenAddress = '0xA51926D9B32622ee286cCfB41dBb53FB962E074E';
const tokenAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export function useContract(){
    const {provider, account} = useWeb3React();
    // const [balance, setBalance] = useState(0);
    // const [balanceb, setBalanceb] = useState(0);
    const [launchProjects, setlaunchProjects] = useState([]);
    const [allProjects, setallProjects] = useState("");
    const [Projects, setProjects] = useState({
        amount: 0,
        rate: 0,
        term: 0,
        collectEndTime: 0,
        repayMethod: 0,
        status: 0,
        launcher: '0x0',
        collected: 0,
        currentBill: 0
    });
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

      useEffect(() => {
        console.log("Projects: ", Projects);
      }, [Projects]);

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




    function respToProject(r){
        console.log(r.collected.toBigInt())
        return {
            pid: r.pid.toBigInt(),
            amount: r.amount.toBigInt(),
            rate: r.rate.toNumber(),
            term: r.term.toNumber(),
            createTime: r.createTime.toNumber(),
            collectEndTime: r.collectEndTime.toNumber(),
            repayMethod: r.repayMethod,
            status: r.status,
            launcher: r.launcher,
            collected: r.collected.toBigInt(),
            currentBill: r.currentBill.toBigInt()
        }
    }
    

    const refreshLaunchProjects = async (address)=>{
        const contract = new Contract(tokenAddress, ABI.abi, provider.getSigner());
        const rs = await contract.getLaunchProjects(address);
        setlaunchProjects(rs.map(r => respToProject(r)));
    }

    const getProjects = async (pid)=>{
        console.log("getProjects", " in useContract.js")
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        const rs = await contract.projects(pid);
        const formattedrs = {
            amount: rs.amount.toString(),
            rate: rs.rate.toString(),
            term: rs.term.toString(),
            collectEndTime: rs.collectEndTime.toString(),
            repayMethod: rs.repayMethod.toString(),
            status: rs.status.toString(),
            launcher: rs.launcher.toString(),
            collected: rs.collected.toString(),
            currentBill: rs.currentBill.toString()
        };
        console.log("rs.amount:", rs.amount.toString());
        setProjects(formattedrs);
    }

    // 获取所有项目信息
    const getAllProjects = async ()=>{
        console.log("getAllProjects", " in useContract.js")
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        const rs = await contract.getAllProjects();

        console.log("rs:", rs, rs.toString());
        const formatted = rs.map((a, index) => {
            return {
                amount: a.amount.toString(),
                rate: a.rate.toString(),
                term: a.term.toString(),
                collectEndTime: a.collectEndTime.toString(),
                repayMethod: a.repayMethod.toString(),
                status: a.status.toString(),
                launcher: a.launcher.toString(),
                collected: a.collected.toString(),
                currentBill: a.currentBill.toString(),
                key: (index + 1).toString()
            };
        });
        console.log("formatted: ", formatted);
        setallProjects(formatted);
    }

    return {
        createProject,
        launchProjects,
        refreshLaunchProjects,
        getProjects,
        Projects,
        getAllProjects,
        allProjects

    }
}

