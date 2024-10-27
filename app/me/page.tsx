"use client";
import { Web3Provider } from '../Web3Provider.jsx'
import Navigate from '../navigate/navigate';
import { useWeb3React } from '@web3-react/core';
import { Col, Row } from 'antd';
import styles  from  './page.module.scss';
import { useContract } from '../useContract.js'
import { useEffect } from 'react';
import { TransactionOutlined,CloseCircleOutlined,FastForwardOutlined  } from '@ant-design/icons';
import { Avatar, Card, Flex, Switch,Tabs,Modal    } from 'antd';
import type { TabsProps } from 'antd';
import React, { useState } from 'react';
import * as web3 from 'web3'
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';




function Me(){
    // 连接钱包
    const { isActive, account,  connector,  provider } = useWeb3React();
    // 用户发起的项目  和 用户出资的项目
    const { launchProjects,refreshLaunchProjects,contributeProjects, refreshContributeProjects,revocateProject,confirmProject } = useContract()

    //控制加载画面
    const [loading, setLoading] = useState<boolean>(true);
    //选项卡
    const [tabKey, setTabKey] = useState<string>('1');
    const [isRevocateModalOpen, setIsRevocateModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<BigInt>(BigInt(0));
    

    function truncateStr(str:string) {
        if (str.length <= 10)  return str; 
        const start = str.slice(0, 6); // 前6位
        const end = str.slice(-4); // 后4位
        return `${start}...${end}`; // 用省略号连接
    }



    useEffect(function(){
        if(isActive && account ) {//账号状态修改的时候更新
            if(!isRevocateModalOpen && !isConfirmModalOpen){//对话框关闭的时候才更新
                setLoading(true)
                if(tabKey == '1'){
                    refreshLaunchProjects(account)
                }else if(tabKey == '2'){
                    refreshContributeProjects(account)
                }
                setLoading(false)
            }
            
        }
    },[isActive,account,tabKey,isRevocateModalOpen])



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
                    <div>
                        <FastForwardOutlined key='repay' className={styles.projectIcon}  /> Repay
                    </div>
                ))
            }
        }else if(tabKey == '2'){//我出资的项目

        }

        

        return result

    }




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
                                                    <span>{web3.utils.fromWei(p.amount,'ether')} ETH</span>
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
                                                    <span>{p.launcher}</span>
                                                </div>
                                                <div>
                                                    <span className={styles.proFieldName} >Collected:</span>
                                                    <span>{web3.utils.fromWei(p.collected,'ether')} ETH</span>
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
            <Col span={5}></Col>
            <Col span={14}>
                <span className={styles.addrHead} >{truncateStr(account || '')}</span>
                <Tabs defaultActiveKey={tabKey} items={items} onChange={(key)=>setTabKey(key)} />
            </Col>
            <Col span={5}></Col>
        </Row>
    )
}

export default function MeExport(){
    




    return (
        <Web3Provider>
            <Navigate/>
            <Me></Me>
        </Web3Provider>
    )
}