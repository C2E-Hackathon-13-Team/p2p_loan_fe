"use client";
import { Web3Provider } from '../Web3Provider.jsx'
import Navigate from '../navigate/navigate';
import { useWeb3React } from '@web3-react/core';
import { Col, Row } from 'antd';
import styles  from  './page.module.scss';




function Me(){
// 连接钱包
    const { isActive, account,  connector,  provider } = useWeb3React();
    

    function truncateStr(str:string) {
        if (str.length <= 10)  return str; 
        const start = str.slice(0, 6); // 前6位
        const end = str.slice(-4); // 后4位
        return `${start}...${end}`; // 用省略号连接
    }
    

    return (
        <Row>
            <Col span={5}></Col>
            <Col span={14}>
                <span className={styles.addrHead} >{truncateStr(account || '')}</span>
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