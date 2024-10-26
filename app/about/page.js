"use client"

import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import Link from "next/link";
import styles from "./page.module.css";
import { Input, label, Button, Tooltip } from "antd";
import { Web3Provider } from '../Web3Provider.jsx'
import { useContract } from '../useContract';
import Navigate from '../navigate/navigate';
import StarBackground from '../particles/ParticleBackground';


function Vote_o() {
// export default function Vote() {

    const [candidateName, setcandidateName] = useState("");
    const [candidateId, setcandidateId] = useState(-1);
    const { isActive, account,  connector,  provider } = useWeb3React();
    const {approve, addCandidate, vote, getAllCandidates, voteRes} = useContract();


    
    const ListComponent = ({ data }) => {  
        console.log("处理数据：", data)
        // 假设data是一个数组，包含你想要展示的数据  
        return (  
          <div>  
            {data.map((item, index) => (  
              // 为数组中的每个元素生成一个<div>元素  
              <div key={index}>{item.name} : {item.voteCount.toString()}  票</div>  
            ))}  
          </div>  
        );  
      }; 
  
    return (
        <Web3Provider>
            <Navigate/>
        <div className={styles.page}>
        <main className={styles.main}>

        <StarBackground/>
            <h1 >Loan</h1>

            <label>
            Web3 P2P借贷平台是一种基于Web3技术和区块链的去中心化金融服务平台，它结合了P2P借贷和Web3技术的优势，为用户提供了更加安全、透明和高效的借贷服务。

<h2>一、平台概述</h2>
Web3 P2P借贷平台是一个基于区块链技术的点对点金融借贷平台，它允许借款人和出借人直接通过平台进行交易，无需传统金融机构作为中介。这种去中介化的模式降低了交易成本，提高了资金利用效率，同时也为投资者提供了更多的投资选择和更高的收益。

<h2>二、技术特点</h2>
区块链技术：Web3 P2P借贷平台采用区块链技术，实现了去中心化、透明和安全的交易环境。所有的交易记录都存储在区块链上，不可篡改，确保了交易的公正性和可追溯性。
智能合约：平台通过智能合约自动执行借贷协议，无需人工干预，降低了操作风险和违约风险。同时，智能合约还可以实现自动化的利息计算和资金划转，提高了交易的效率和便捷性。
去中心化应用（DApps）：平台上的去中心化应用程序（DApps）允许用户在不依赖中央服务器的情况下进行借贷交易，进一步提高了交易的安全性和自主性。
<h2>三、平台优势</h2>
降低交易成本：去中介化的模式降低了交易成本，使得借款人和出借人能够直接进行交易，无需支付高昂的中介费用。
提高资金利用效率：平台通过智能合约和区块链技术，实现了资金的快速匹配和划转，提高了资金利用效率。
增强交易透明度：所有的交易记录都存储在区块链上，用户可以随时查看和验证交易信息，增强了交易的透明度。
保障用户权益：平台通过智能合约和去中心化的应用，保障了用户的资金安全和隐私权益，避免了传统金融机构可能存在的欺诈和滥用风险。
<h2>四、平台服务</h2>
借款服务：借款人可以在平台上发布借款需求，并提供相应的抵押物或信用证明。出借人可以根据借款人的需求和信用状况选择是否出借资金。
出借服务：出借人可以在平台上浏览借款项目，并根据自己的风险偏好和投资需求选择合适的借款项目进行出借。
资产管理服务：平台还提供资产管理服务，帮助用户管理自己的资产和负债，提高资产利用效率。
<h2>五、安全保障</h2>
技术安全：平台采用先进的区块链技术和智能合约技术，确保了交易的安全性和可靠性。
资金安全：平台通过去中心化的应用和智能合约，实现了资金的自动化管理和划转，避免了资金被滥用或盗用的风险。
隐私保护：平台注重用户隐私保护，采用了零知识证明等先进技术，确保了用户的隐私信息不被泄露。
<p></p>
<h4>
    综上所述，Web3 P2P借贷平台以其去中心化、透明和安全的技术特点，以及降低交易成本、提高资金利用效率、增强交易透明度和保障用户权益的平台优势，为用户提供了更加便捷、高效和安全的借贷服务。
</h4>       
            </label>

        </main>
        </div>
        </Web3Provider>
    )  
}

export default function Vote() {
    return (
        <Web3Provider>
            <Vote_o/>
        </Web3Provider>
)  
}