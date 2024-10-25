"use client"

import React, { useState } from 'react';
// import { useWeb3React } from '@web3-react/core';

import { Input,  Button,  Table, Tag, Space,
    Form,
    Radio,
    Select
     } from "antd";
import styles from "./page.module.css";
import { Web3Provider } from '../Web3Provider.jsx'
// import { useContract } from '../useContract';
import Navigate from '../navigate/navigate';
// import useCounterStore from '../../store/useStore';
// import StarBackground from '../particles/ParticleBackground';


const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Fundraising Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Interest Rate',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <>
          {status.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      amount: 1000,
      rate: '1%',
      status: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      amount: 3000,
      rate: '1.5%',
      status: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      amount: 20000,
      rate: '0.9%',
      status: ['cool', 'teacher'],
    },
  ];

function Vote_o() {
// export default function Vote() {

    // const [candidateName, setcandidateName] = useState("");
    // const [candidateId, setcandidateId] = useState(-1);
    // const { isActive, account,  connector,  provider } = useWeb3React();
    // const {approve, addCandidate, vote, getAllCandidates, voteRes} = useContract();

    // const ListComponent = ({ data }) => {  
    //     console.log("处理数据：", data)
    //     // 假设data是一个数组，包含你想要展示的数据  
    //     return (  
    //       <div>  
    //         {data.map((item, index) => (  
    //           // 为数组中的每个元素生成一个<div>元素  
    //           <div key={index}>{item.name} : {item.voteCount.toString()}  票</div>  
    //         ))}  
    //       </div>  
    //     );  
    //   }; 

      // 筹款 表单
      const [componentSize, setComponentSize] = useState('default');
      const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
      };
      const [form] = Form.useForm(); // 创建表单实例

      const onFinish = (values) => {
        console.log('Received values of form: ', values); // 处理表单数据
        console.log("name:", values.name)
      };
    

      // zustand data
      // const { count, increment, decrement } = useCounterStore();
    return (
        <Web3Provider>
          {/* <StarBackground/> */}
            <Navigate/>
        <div className={styles.page}>
        <main className={styles.main}>

            <h1>Loan Platform</h1>
            <Table columns={columns} dataSource={data} />


            {/* // 表单 */}
            <p>提交筹款信息：</p>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                style={{
                    maxWidth: 600,
                }}
                form={form}
                name="basic"
                onFinish={onFinish} // 设置表单提交处理函数
                >
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Name" name="name"
                    rules={[{ required: true, message: 'Please input your name' }]}
                >
                    <Input placeholder="Your Name"/>
                </Form.Item>
                <Form.Item label="Amount" name="amount">
                    <Input placeholder="Amount"/>
                </Form.Item>
                <Form.Item label="term/month" name="month">
                    <Input placeholder="Month Num"/>
                </Form.Item>
                <Form.Item label="Interest Rate" name="rate">
                    <Select placeholder="Select the rate">
                    <Select.Option value="1">1%</Select.Option>
                    <Select.Option value="2">2%</Select.Option>
                    <Select.Option value="3">3%</Select.Option>
                    <Select.Option value="4">4%</Select.Option>
                    <Select.Option value="5">5%</Select.Option>
                    </Select>
                </Form.Item>

                {/* <Form.Item label="DatePicker">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="InputNumber">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Switch" valuePropName="checked">
                    <Switch />
                </Form.Item> */}
                <Form.Item label="Commit">
                    <Button color="primary" variant="outlined" htmlType="submit">Commit</Button>
                </Form.Item>
                </Form>


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