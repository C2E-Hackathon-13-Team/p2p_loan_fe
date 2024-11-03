
import { Contract} from '@ethersproject/contracts';
import ABI from '../artifacts/contracts/GLD.sol/LockModule#Loan.json';
import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
import useCounterStore  from '../store/useStore';
import * as web3 from 'web3';
import { message } from 'antd';


// const tokenAddress = '0xA51926D9B32622ee286cCfB41dBb53FB962E074E';
// const tokenAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// sikaiwei dev
// 2024年10月28日
const tokenAddress = '0xe4b1cE541bEb0D48b737057819E4266596299fA0';
// const tokenAddress = '0x8765C1e53c2Db3d2F9c3d631a86A568dDc6074Bc';


export function useContract(){
    const {provider, account} = useWeb3React();
    // const [balance, setBalance] = useState(0);
    // const [balanceb, setBalanceb] = useState(0);
    const [launchProjects, setlaunchProjects] = useState([]);
    const [contributeProjects, setContributeProjects] = useState([]);
    // const [allProjects, setallProjects] = useState([]);
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

    const {  tabledata, setTableData, billData, setBillData,
            msgType, setMsgType, msgContent, setMsgContent, msgDuration, setMsgDuration } = useCounterStore();
    
    // update message
    const updateMessage = (type, content, duration) => {
        setMsgType(type);
        setMsgContent(content);
        setMsgDuration(duration);
    }


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



    //   useEffect(() => {
    //     // 从 localStorage 中读取 tabledata 并更新状态
    //     const storedtabledata = localStorage.getItem('tabledata');
    //     if (storedtabledata !== null) {
    //       const parsedData = JSON.parse(storedtabledata);
    //       setallProjects(parsedData);
    //     }
    //   }, []);

      // 发布筹款 
    const createProject = async (amount, rate, term, collectEndTime, repayMethod)=>{
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        await contract.createProject(amount, rate, term, collectEndTime, repayMethod)
        .then((transactionResponse) => {
            console.log('Transaction hash:', transactionResponse.hash);
            updateMessage('loading', '提交进行中..', 0);
            return transactionResponse.wait();
          }).then((transactionReceipt) => {
            console.log('Transaction receipt:', transactionReceipt);
            updateMessage('success', '提交完成', 2);
          }).catch((error) => {
            console.error('Error:', error);
            updateMessage('error', '提交失败', 2);
          });
    }

    // 出资 contribute
    const contribute = async (projectsPid, projectsvalue)=>{
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        await contract.contribute(projectsPid, { from: account, value: projectsvalue })
         .then((transactionResponse) => {
            console.log('Transaction hash:', transactionResponse.hash);
            updateMessage('loading', '交易进行中..', 0);
            return transactionResponse.wait();
          }).then((transactionReceipt) => {
            console.log('Transaction receipt:', transactionReceipt);
            updateMessage('success', '交易完成', 2);
          }).catch((error) => {
            console.error('Error:', error);
            updateMessage('error', '交易失败', 2);
          });
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
    
    //刷新发起过的项目
    const refreshLaunchProjects = async (address)=>{
        const contract = new Contract(tokenAddress, ABI.abi, provider.getSigner());
        const rs = await contract.getLaunchProjects(address);
        setlaunchProjects(rs.map(r => respToProject(r)));
    }

    //刷新出资过的项目
    const refreshContributeProjects = async (address)=>{
        const contract = new Contract(tokenAddress, ABI.abi, provider.getSigner());
        const rs = await contract.getContributeProjects(address);
        setContributeProjects(rs.map(r => respToProject(r)));
    }

    //撤销
    const revocateProject = async (pid)=>{
        const contract = new Contract(tokenAddress, ABI.abi, provider.getSigner());
        let rs = await contract.revocateProject(pid);
        await rs.wait();
        // rs = await rs.wait();
    }

    //确认
    const confirmProject = async (pid)=>{
        const contract = new Contract(tokenAddress, ABI.abi, provider.getSigner());
        let rs = await contract.confirm(pid);
        await rs.wait();
        // rs = await rs.wait();
    }

    function respToBiil(r){
        return {
            projectId: r.projectId.toBigInt(),
            capital: r.capital.toBigInt(),
            interest: r.interest.toBigInt(),
            repaid: r.repaid.toBigInt(),
            repayTime: r.repayTime.toNumber(),
            status: r.status.toNumber()
        }
    }
    //获取项目所有账单
    const getBillsByPid = async (pid)=>{
        const contract = new Contract(tokenAddress, ABI.abi, provider.getSigner());
        let rs = await contract.getBillsByPid(pid);
        return rs.map(r => respToBiil(r))
    }
    
    //还款
    const repayProject = async (pid,value)=>{
        const contract = new Contract(tokenAddress, ABI.abi, provider.getSigner());
        let rs = await contract.repay(pid,{value:web3.utils.toWei(value,'ether')});
        rs = await rs.wait();
        console.log(rs)
    }

    function respToContribution(r){
        console.log(r)
        return {
            amount: r.amount.toBigInt(),
            investor: r.investor.toString(),
            repaid: r.repaid.toBigInt(),
            time: r.time.toNumber()
        }
    }
    //出资单
    const getContributionsByPid = async (pid)=>{
        const contract = new Contract(tokenAddress, ABI.abi, provider.getSigner());
        let rs = await contract.getContributionsByPid(pid);
        return rs.map(r => respToContribution(r))
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
        const formatted = await rs.map((a, index) => {
            return {
                pid: a.pid.toString(),
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
        // setallProjects(formatted);
        setTableData(formatted);
        console.log("tabledata:", tabledata)
    }

    // 获取单个项目账单
    const getBill = async (pid)=>{
        console.log("getBill", " in useContract.js")
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        const rs = await contract.getBill(pid);

        console.log("rs:", rs, rs.toString());
        const formatted = await rs.map((a) => {
            return {
                capital: a.capital.toString(),
                interest: a.interest.toString(),
                projectId: a.projectId.toString(),
                repaid: a.repaid.toString(),
                repayTime: a.repayTime.toString(),
                status: a.status.toString(),
            };
        });
        console.log("formatted: ", formatted);
        setBillData(formatted);
        console.log("BillData:", billData)
    }

    // 还款
    const repay = async (projectsPid, projectsvalue)=>{
        console.log("repay", " in useContract.js")
        const signer = provider.getSigner();
        if(!provider){
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        await contract.repay(projectsPid, { from: account, value: projectsvalue })
        .then((transactionResponse) => {
        console.log('Transaction hash:', transactionResponse.hash);
        return transactionResponse.wait();
        }).then((transactionReceipt) => {
        console.log('Transaction receipt:', transactionReceipt);
        }).catch((error) => {
        console.error('Error:', error);
        });
    }


    return {
        createProject,
        launchProjects,
        refreshLaunchProjects,
        contributeProjects,
        refreshContributeProjects,
        revocateProject,
        confirmProject,
        getBillsByPid,
        repayProject,
        getContributionsByPid,
        getProjects,
        Projects,
        getAllProjects,
        // allProjects,
        contribute,
        getBill,
        repay

    }
}

