"use client";
import { Web3Provider } from '../Web3Provider.jsx'
import Navigate from '../navigate/navigate';
import { useWeb3React } from '@web3-react/core';
import { Col, Row } from 'antd';
import styles  from  './page.module.scss';
import { useContract } from '../useContract.js'
import { useEffect } from 'react';
import { TransactionOutlined,CloseCircleOutlined,FastForwardOutlined,RiseOutlined  } from '@ant-design/icons';
import { Avatar, Card, Flex, Switch,Tabs,Modal,Button,Space     } from 'antd';
import type { TabsProps } from 'antd';
import React, { useState } from 'react';
import * as web3 from 'web3'
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { Table } from "antd" ;
import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';
import { motion } from 'framer-motion';





function Me(){
    // 连接钱包
    const { isActive, account,  connector,  provider } = useWeb3React();
    // 用户发起的项目  和 用户出资的项目
    const { launchProjects,refreshLaunchProjects,contributeProjects, refreshContributeProjects,revocateProject,confirmProject,getBillsByPid,repayProject,getContributionsByPid } = useContract()

    //控制加载画面
    const [loading, setLoading] = useState<boolean>(true);
    //选项卡
    const [tabKey, setTabKey] = useState<string>('1');

    //对话框Model
    const [isRevocateModalOpen, setIsRevocateModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isRepayModalOpen, setIsRepayModalOpen] = useState(false);
    const [isInvestInfoModalOpen, setIsInvestInfoModalOpen] = useState(false);

    //当前项目ID
    const [selectedProject, setSelectedProject] = useState<BigInt>(BigInt(0));
    //账单数据
    const [billDataSource, setBillDataSource] = useState<any[]>([]);
    //偿还金额
    const [repayAmount, setRepayAmount] = useState<number>(0);
    //投资信息
    const [investDataSource, setInvestDataSource] = useState<any[]>([]);

    

    function truncateStr(str:string) {
        if (str.length <= 10)  return str; 
        const start = str.slice(0, 6); // 前6位
        const end = str.slice(-4); // 后4位
        return `${start}...${end}`; // 用省略号连接
    }



    useEffect(function(){
        if(isActive && account ) {//账号状态修改的时候更新
            if(!isRevocateModalOpen && !isConfirmModalOpen && !isRepayModalOpen){//对话框关闭的时候才更新
                setLoading(true)
                if(tabKey == '1'){
                    refreshLaunchProjects(account)
                }else if(tabKey == '2'){
                    refreshContributeProjects(account)
                }
                setLoading(false)
                setRepayAmount(0)
            }
            
        }
    },[isActive,account,tabKey,isRevocateModalOpen,isConfirmModalOpen,isRepayModalOpen])



    function getStatusByProject(p:any):string{
        const current = Math.floor(Date.now() / 1000);
        if( p.status == 1 && current < p.collectEndTime && p.collected < p.amount ){
            return 'Financing';//筹资期
        }else if( p.status == 1 && ( current > p.collectEndTime || p.collected >= p.amount ) ){
            return 'To be confirmed';//待确认
        }else if( p.status == 2 ){
            return 'Repaying';//还款期
        }else if( p.status == 3 ){
            return 'Closed';//已结束
        }else if( p.status == 4 ){
            return 'Withdrawn';//已撤销
        }else{
            return 'Error'
        }
    }

    function formatAmount(wei){

        if( wei > 1000000000000000000 ){
            return Number(web3.utils.fromWei(wei,'ether')).toFixed(4) + ' Ether'
        }else if( wei > 1000000000 ){
            return Number(web3.utils.fromWei(wei,'gwei')).toFixed(4) + ' Gwei'
        }else{
            return wei + ' Wei'
        }

    }

  


    const revocate = async () => {
        await revocateProject(selectedProject)
        setIsRevocateModalOpen(false);
    };
    const openRevocate = (pid:BigInt) => {
        setSelectedProject(pid)
        setIsRevocateModalOpen(true)
    };

    const confirm = async () => {
        await confirmProject(selectedProject)
        setIsConfirmModalOpen(false);
    };
    const openConfirm = (pid:BigInt) => {
        setSelectedProject(pid)
        setIsConfirmModalOpen(true)
    };

    async function refreshBills(pid){
        let bills = await getBillsByPid(pid)
        bills.forEach((b,i)=>{
            b.key = i;
            b.capital = formatAmount(b.capital);
            b.interest = formatAmount(b.interest);
            b.repaid = formatAmount(b.repaid);
            b.status = getBillStatus(b);
            b.repayTime = format(new Date(b.repayTime * 1000), 'yyyy-MM-dd HH:mm:ss');
        })
        setBillDataSource(bills)
    }

    const repay = async () => {
        await repayProject(selectedProject,repayAmount)
        refreshBills(selectedProject)
        setRepayAmount(0)
    };

    function getBillStatus(b):string{
        if( b.tatus == 1 && (Date.now() / 1000) < b.repayTime ){
            return 'Not started';
        }else if(b.status == 1 && (Date.now() / 1000) >= b.repayTime ){
            return 'Repaying';
        }else if(b.status == 2){
            return 'Over';
        }
    }

    const openRepay = async (pid:BigInt) => {
        setSelectedProject(pid)
        refreshBills(pid)
        setIsRepayModalOpen(true)
    };



    const billColumns = [
        {
            title: 'Capital',
            dataIndex: 'capital',
            key: 'capital',
        },
        {
            title: 'Interest',
            dataIndex: 'interest',
            key: 'interest',
        },
        {
            title: 'Repay Time',
            dataIndex: 'repayTime',
            key: 'repayTime',
        },
        {
            title: 'Repaid',
            dataIndex: 'repaid',
            key: 'repaid',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },

    ]


    const investColumns = [
        {
            title: 'Investor',
            dataIndex: 'investor',
            key: 'investor',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Invest Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Repaid',
            dataIndex: 'repaid',
            key: 'repaid',
        },

    ]


    // async function refreshInvestInfo(pid){
        
    // }

    const openInvestInfo = async (pid:BigInt) => {
        setSelectedProject(pid)

        let cons = await getContributionsByPid(pid)
        
        cons.forEach((c,i)=>{
            c.key = i;
            c.amount = formatAmount(c.amount);
            c.investor = truncateStr(c.investor);
            c.repaid = formatAmount(c.repaid);
            c.time = format(new Date(c.time * 1000), 'yyyy-MM-dd HH:mm:ss');
        })
        setInvestDataSource(cons)


        setIsInvestInfoModalOpen(true)
    };


    function getActionDoc(p): React.ReactNode[]{
        let result:React.ReactNode[] = [];

        if(tabKey == '1'){//我发起的项目

            const current = Math.floor(Date.now() / 1000);
            if( p.status == 1 && ( current > p.collectEndTime || p.collected >= p.amount ) ){//可以确认
                result.push((
                    <div onClick={()=>openConfirm(p.pid)}>
                        <TransactionOutlined key='confirm' className={styles.projectIcon} />Comfirm
                    </div>
                ))
            }

            if(p.status == 1){//可以撤销
                result.push((
                    <div onClick={()=>openRevocate(p.pid)}>
                        <CloseCircleOutlined key='revocate' className={styles.projectIcon}  /> Revocate
                    </div>
                ))
            }

            if(p.status == 2){//可以还款
                result.push((
                    <div onClick={()=>openRepay(p.pid)}>
                        <FastForwardOutlined key='repay' className={styles.projectIcon}  /> Repay
                    </div>
                ))
            }

        }else if(tabKey == '2'){//我出资的项目

        }

        if(p.status >= 2){//可以查看出资单
            result.push((
                <div onClick={()=>openInvestInfo(p.pid)}>
                    <RiseOutlined key='investInfo' className={styles.projectIcon}  /> Invest Info
                </div>
            ))
        }

        

        return result

    }


    const onRepayInputChange: InputNumberProps['onChange'] = (value) => setRepayAmount(Number(value.toString()));






    function getProjectDoc(projects){

        return (
            <>
                <Flex wrap gap="small">
                    {
                        projects.map(p=>{
                            return (
                                <Card loading={loading} actions={getActionDoc(p)} style={{ minWidth: 300 }} key={p['pid']}>
                                    <Card.Meta
                                        // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
                                        title={"Project "+p.pid}
                                        description={
                                            <>
                                                <div>  
                                                    <span className={styles.proFieldName} >Amount:</span>
                                                    <span>{formatAmount(p.amount)}</span>
                                                </div>
                                                <div>
                                                    <span className={styles.proFieldName} >Rate:</span>
                                                    <span>{ (p.rate / 10000).toFixed(4)} %</span>
                                                </div>
                                                <div>
                                                    <span className={styles.proFieldName} >Term:</span>
                                                    <span>{p.term}</span>
                                                </div>
                                                <div>
                                                    <span className={styles.proFieldName} >Create Time:</span>
                                                    <span>{  format(new Date(p.createTime * 1000), 'yyyy-MM-dd HH:mm:ss')  }  </span>
                                                </div>
                                                <div>
                                                    <span className={styles.proFieldName} >Collect End Time:</span>
                                                    <span>{  format(new Date(p.collectEndTime * 1000), 'yyyy-MM-dd HH:mm:ss')  }</span>
                                                </div>
                                                <div>
                                                    <span className={styles.proFieldName} >Repay Method:</span>
                                                    <span>{p.repayMethod == 1 ?'Fixed Installment Method':'other'}</span>
                                                </div>
                                                <div>
                                                    <span className={styles.proFieldName} >Status:</span>
                                                    <span>{ getStatusByProject(p) }</span>
                                                </div>
                                                <div>
                                                    <span className={styles.proFieldName} >Launcher:</span>
                                                    <span>{truncateStr(p.launcher)}</span>
                                                </div>
                                                <div>
                                                    <span className={styles.proFieldName} >Collected:</span>
                                                    <span>{formatAmount(p.collected)}</span>
                                                </div>
                                            </>
                                        }
                                    />
                                </Card>
                            )
                        })
                    }
                </Flex>

                <Modal title="Revocate Project" open={isRevocateModalOpen} onOk={revocate} onCancel={()=>setIsRevocateModalOpen(false)}>
                    <p>Are you sure you want to revocate the project {selectedProject.toString()} ?</p>
                </Modal>
                <Modal title="Confirm Project" open={isConfirmModalOpen} onOk={confirm} onCancel={()=>setIsConfirmModalOpen(false)}>
                    <p>Are you sure you want to confirm the project {selectedProject.toString()} ?</p>
                </Modal>
                <Modal 
                    title={"Repay Project " + selectedProject.toString()}
                    open={isRepayModalOpen} 
                    // onOk={repay} 
                    onCancel={()=>setIsRepayModalOpen(false)} 
                    width="61.8%" 
                    footer={(_, { CancelBtn }) => (
                        <>
                            <CancelBtn />
                            <Space.Compact >
                                <InputNumber min={0} value={repayAmount} onChange={onRepayInputChange} className={styles.repayInput} addonAfter="Ether" />
                                <Button type="primary" onClick={repay}>Repay</Button>
                            </Space.Compact>
                            
                        </>
                    )}>
                    <Table dataSource={billDataSource} columns={billColumns} />
                </Modal>
                <Modal title={"Investment Information Of Project "+ selectedProject.toString()} open={isInvestInfoModalOpen} onCancel={()=>setIsInvestInfoModalOpen(false)} width="61.8%" >
                    <Table dataSource={investDataSource} columns={investColumns} />
                </Modal>
            </>
        )
    }


    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'Projects I launched',
          children: getProjectDoc(launchProjects),
        },
        {
          key: '2',
          label: 'Projects I invested',
          children: getProjectDoc(contributeProjects),
        },
    ];



    return (
        <Row>
            <Col span={4}></Col>
            <Col span={16}>
                <span className={styles.addrHead} >{truncateStr(account || '')}</span>
                <Tabs defaultActiveKey={tabKey} items={items} onChange={(key)=>setTabKey(key)} />
            </Col>
            <Col span={4}></Col>
        </Row>
    )
}

export default function MeExport(){
    




    return (
        <Web3Provider>
            <Navigate/>
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1 }}
            >
                <Me></Me>
            </motion.div>
        </Web3Provider>
    )
}