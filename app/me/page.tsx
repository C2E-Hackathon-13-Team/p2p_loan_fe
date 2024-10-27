"use client";
import { Web3Provider } from '../Web3Provider.jsx'
import Navigate from '../navigate/navigate';
import { useWeb3React } from '@web3-react/core';
import { Col, Row } from 'antd';
import styles  from  './page.module.scss';
import { useContract } from '../useContract.js'
import { useEffect } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Switch  } from 'antd';
import React, { useState } from 'react';
import * as web3 from 'web3'
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';




function Me(){
    // 连接钱包
    const { isActive, account,  connector,  provider } = useWeb3React();
    
    const { refreshLaunchProjects,launchProjects } = useContract()

    const [loading, setLoading] = useState<boolean>(true);
    

    function truncateStr(str:string) {
        if (str.length <= 10)  return str; 
        const start = str.slice(0, 6); // 前6位
        const end = str.slice(-4); // 后4位
        return `${start}...${end}`; // 用省略号连接
    }

    useEffect(function(){
        if(isActive && account) {
            refreshLaunchProjects(account)
            setLoading(false)
        }
    },[isActive,account])

    const projectActions: React.ReactNode[] = [
        <EditOutlined key="edit" />,
        <SettingOutlined key="setting" />,
        <EllipsisOutlined key="ellipsis" />,
    ];

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

    return (
        <Row>
            <Col span={5}></Col>
            <Col span={14}>
                <span className={styles.addrHead} >{truncateStr(account || '')}</span>
                <Flex wrap gap="small">
                    {
                        launchProjects.map(p=>{
                            return (
                                <Card loading={loading} actions={projectActions} style={{ minWidth: 300 }} key={p['pid']}>
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
                                                <span>{p.collected.toString()}</span>
                                            </div>
                                        </>
                                    }
                                    />
                                </Card>
                            )
                        })
                    }
                </Flex>
                
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