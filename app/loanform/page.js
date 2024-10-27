"use client"

import React, { useState, useEffect } from 'react';

import { Input,  Button,  Table, Tag, Space, Col, Row, Divider,
    Form,
    Radio
     } from "antd";
import styles from "./page.module.css";
import { Web3Provider } from '../Web3Provider.jsx'
import { useContract } from '../useContract';
import Navigate from '../navigate/navigate';
import useCounterStore from '../../store/useStore';

// import StarBackground from '../particles/ParticleBackground';


const columns = [
    // {
    //   title: 'Name',
    //   dataIndex: 'name',
    //   key: 'name',
    //   render: (text) => <a>{text}</a>,
    // },
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
      title: 'Interest term',
      dataIndex: 'term',
      key: 'term',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      // render: (_, { status }) => (
      //   <>
      //     {status.map((tag) => {
      //       let color = tag.length > 5 ? 'geekblue' : 'green';
      //       if (tag === 'loser') {
      //         color = 'volcano';
      //       }
      //       return (
      //         <Tag color={color} key={tag}>
      //           {tag.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </>
      // ),
    },
    {
      title: 'CollectEndTime',
      dataIndex: 'collectEndTime',
      key: 'collectEndTime',
    },
    {
      title: 'collected',
      dataIndex: 'collected',
      key: 'collected',
    },
    {
      title: 'currentBill',
      dataIndex: 'currentBill',
      key: 'currentBill',
    },
    {
      title: 'launcher',
      dataIndex: 'launcher',
      key: 'launcher',
    },
    {
      title: 'repayMethod',
      dataIndex: 'repayMethod',
      key: 'repayMethod',
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
    {
      title: 'Pid',
      dataIndex: 'pid',
      key: 'pid',
    },
  ];
  
  
  function Vote_o() {
    
    const [theAddress, settheAddress] = useState("");
    const [pid, setpid] = useState(0);
    const [projectsPid, setprojectsPid] = useState(0);
    const [projectsvalue, setprojectsvalue] = useState(0);

    const [data, setdata] = useState([]);
    const { count, increment, decrement, tabledata, setTableData } = useCounterStore();

    // 合约调用
    const { createProject, getLaunchProjects, getProjects, getAllProjects, allProjects, contribute } = useContract();

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

      // setTimeout(() => {
      //   console.log("setTimeout: ", allProjects, data);
      //   getAllProjects();
      // }, 60000);

      // setInterval(() => {
      //   console.log("setTimeout: ", allProjects, data);
      //   getAllProjects();
      // }, 3000);


      useEffect(() => {
        console.log("useEffect: ", allProjects, data);

        getAllProjects();
      }, [0]);


      useEffect(() => {
        // 从 localStorage 中读取 tabledata 并更新状态
        const storedtabledata = localStorage.getItem('tabledata');
        if (storedtabledata !== null) {
          const parsedData = JSON.parse(storedtabledata);
          setTableData(parsedData);
        }
      }, []);

      useEffect(() => {
        console.log("allProjects: ", allProjects, "data :", data);
        // setTableData(allProjects);
        if (tabledata.length > 0) {

          localStorage.setItem('tabledata', JSON.stringify(tabledata)); // 将索引存储到 localStorage
          console.log("tabledata:", tabledata)
        }

      }, [tabledata]);

      // onClick={
      //   async ()=>{
      //       console.log(candidateName)
      //       await addCandidate(candidateName);
      //   }} 

      // zustand data
    return (
        <Web3Provider>
            <Navigate/>

          {/* <StarBackground/> */}
          <Row>
          <Col span={1}>
            </Col>
            <Col span={23}>
              <Divider 
            orientation="left"  
            style={{
            borderColor: '#7cb305',
            }}>
              <h1>Loan Platform</h1>

            </Divider>
  
            <Table columns={columns} dataSource={tabledata} />
            </Col>
            </Row>

          <Row>
          <Col span={22}></Col>
            <Col span={1}>

            <Button 
                        onClick={
                          async ()=>{
                            console.log("theAddress to solidity : ", projectsPid)
                            await getAllProjects();
                            }} 
                            type="primary" size="middle">
                        刷新列表
                    
            </Button>
              </Col>
            </Row>
            
        {/* <div className={styles.page}> */}
        {/* <main className={styles.main}> */}
            {/* // 表单 */}
            <Row>
          <Col span={2}></Col>
            <Col span={5}>
            <Divider 
            orientation="left"  
            style={{
            borderColor: '#7cb305',
            }}>
            <h3>提交筹款信息</h3>
            </Divider>

            </Col>
            </Row>

            <Row>
          <Col span={1}></Col>
            <Col span={23}>
           
   

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
                <Form.Item label="Pid" name="pid">
                    <Input placeholder="pid"/>
                </Form.Item>
                </Form>
                </Col>
            </Row>

  
                    出资  。控制台输出
                    <Input
                        placeholder="pid"
                        type="text"
                        value={projectsPid}
                        onChange={(e) => setprojectsPid(e.target.value)}
                        className={styles.input}
                    />
                     <Input
                      placeholder="value"
                        type="text"
                        value={projectsvalue}
                        onChange={(e) => setprojectsvalue(e.target.value)}
                        className={styles.input}
                    />
                        <Button 
                        onClick={
                            async ()=>{
                              console.log("theAddress to solidity : ", projectsPid)
                                await contribute(projectsPid, projectsvalue);
                            }} 
                        type="primary" size="middle">
                        出资
                    
                    </Button>

                  
                  
        {/* </main> */}
        {/* </div> */}
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