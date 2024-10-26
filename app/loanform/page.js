"use client"

import React, { useState } from 'react';

import { Input,  Button,  Table, Tag, Space,
    Form,
    Radio
     } from "antd";
import styles from "./page.module.css";
import { Web3Provider } from '../Web3Provider.jsx'
import { useContract } from '../useContract';
import Navigate from '../navigate/navigate';
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

    const [theAddress, settheAddress] = useState("");
    const [pid, setpid] = useState(0);
    const [projectsPid, setprojectsPid] = useState(0);
    // const { createProject, getLaunchProjects, launchProjects} = useContract();
    const { createProject, getLaunchProjects, getProjects } = useContract();

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

      // const onFinish = (values) => {
      //   console.log('Received values of form: ', values); // 处理表单数据
      //   console.log("name:", values.name)
      // };

      const onFinish = async (values) => {
        console.log('Received values of form: ', values); // 处理表单数据
        await createProject(values.amount, values.rate, values.term, values.endtime, values.repayMethod);
      };
    
      // onClick={
      //   async ()=>{
      //       console.log(candidateName)
      //       await addCandidate(candidateName);
      //   }} 

      // zustand data
    return (
        <Web3Provider>
            <Navigate/>
        <div className={styles.page}>
        <main className={styles.main}>
          {/* <StarBackground/> */}

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
                <Form.Item label="Amount" name="amount">
                    <Input placeholder="Amount"/>
                </Form.Item>
                <Form.Item label="Rate" name="rate"
                    rules={[{ required: true, message: 'Please input your rate' }]}
                >
                    <Input placeholder="Your rate"/>
                </Form.Item>
                <Form.Item label="term/month" name="term">
                    <Input placeholder="Month Num"/>
                </Form.Item>
                <Form.Item label="Endtime" name="endtime">
                    <Input placeholder="endtime stamp"/>
                </Form.Item>
                <Form.Item label="RepayMethod" name="repayMethod">
                    <Input placeholder="repayMethod"/>
                </Form.Item>
                {/* <Form.Item label="Interest Rate" name="rate">
                    <Select placeholder="Select the rate">
                    <Select.Option value="1">1%</Select.Option>
                    <Select.Option value="2">2%</Select.Option>
                    <Select.Option value="3">3%</Select.Option>
                    <Select.Option value="4">4%</Select.Option>
                    <Select.Option value="5">5%</Select.Option>
                    </Select>
                </Form.Item> */}

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


                查看项目id。控制台输出
                    <Input
                        type="text"
                        value={theAddress}
                        onChange={(e) => settheAddress(e.target.value)}
                        className={styles.input}
                    />
                        <Input
                        type="text"
                        value={pid}
                        onChange={(e) => setpid(e.target.value)}
                        className={styles.input}
                    />
                        <Button 
                        onClick={
                            async ()=>{
                              console.log("theAddress to solidity : ", theAddress)
                                await getLaunchProjects(theAddress, pid);
                            }} 
                        type="primary" size="middle">
                        查看项目池LaunchProjects
                    
                    </Button>

                    查看项目详细信息。控制台输出
                    <Input
                        type="text"
                        value={projectsPid}
                        onChange={(e) => setprojectsPid(e.target.value)}
                        className={styles.input}
                    />
                        <Button 
                        onClick={
                            async ()=>{
                              console.log("theAddress to solidity : ", projectsPid)
                                await getProjects(projectsPid);
                            }} 
                        type="primary" size="middle">
                        查看单个项目Projects
                    
                    </Button>
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