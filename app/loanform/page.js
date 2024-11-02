"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input,  Button,  Table, Tag, Space, Col, Row, Divider, Tabs, message,
    Form, Radio, DatePicker } from "antd";
import styles from "./page.module.css";
import { Web3Provider } from '../Web3Provider.jsx'
import { useContract } from '../useContract';
import Navigate from '../navigate/navigate';
import useCounterStore from '../../store/useStore';
import InputDialog from './InputDialog';
import { useWeb3React } from '@web3-react/core';
import { format, fromUnixTime } from 'date-fns';



  
  
  function Vote_o() {
    
    const [projectsPid, setprojectsPid] = useState();
    const [projectsvalue, setprojectsvalue] = useState();

    // const [data, setdata] = useState([]);
    const { tabledata,  billData,
            msgType, msgContent, msgDuration } = useCounterStore();
    // 连接钱包
    const { isActive, account,  connector,  provider } = useWeb3React();
    // 合约调用
    const { createProject,  getAllProjects, allProjects, contribute, getBill, repay } = useContract();

    // message 提示信息
    const [messageApi, contextHolder] = message.useMessage();
    const [isFirstRender, setIsFirstRender] = useState(true);
    const key = 'updatable';
    const openMessage = (type, content, duration) => {
      messageApi.open({
        key,
        type: type,
        content: content,
        duration: duration,
        style: {
          marginTop: '4vh',
          color: 'hsl(73, 91%, 41%)', // 设置文本颜色
        },
      });
    };

    useEffect(() => {
      if (!isFirstRender) {
        console.log("message info : ", msgType, msgContent, msgDuration );
        openMessage(msgType, msgContent, msgDuration);
        }
        setIsFirstRender(false);
    }, [msgType, msgContent, msgDuration]);

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

    // 账单数据展示
    const DataDisplay = ({ data }) => {
      return (
          <div>
              {data.map((item, index) => (
                  <div key={index}>
                    <Space align='baseline' split={<Divider type="vertical" />}>
                      <a>Capital: {item.capital}; </a> 
                      <a>Interest: {item.interest}; </a>
                      <a>Project ID: {item.projectId}; </a>
                      <a>Repaid: {item.repaid}; </a>
                      {/* <a>Status: {item.status === '2' ? 'payed' : item.status === '1' ? 'wait' : '未知状态'}</a> */}
                      <a>Repay Time: {new Date(item.repayTime * 1000).toLocaleString()}.</a>
                      {item.status === '2'? (
                          <Tag color='green'>payed</Tag>
                        ) : item.status === '1'? (
                          <Tag color='blue'>waiting</Tag>
                        ) : (
                          <a>未知状态</a>
                        )}
                    </Space>
                  </div>
              ))}
          </div>
      );
    };
  

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

      // 提交筹款信息
      const onFinish = async (values) => {
        console.log('Received values of form: ', values); // 处理表单数据
        if (values.endtime) {
          const dateStr = values.endtime.$d;
          const dates = new Date(dateStr);
          const timeStr = Math.floor(dates.getTime() / 1000);
          await createProject(values.amount, values.rate, values.term, timeStr, values.repayMethod);
        }
      };

      // 出资对话框
      const [visibleDialog, setVisibleDialog] = useState(false);
      const [selectedRowData, setSelectedRowData] = useState(null);
 
      const handleSubmitInput = async (inputValue) => {
        if (selectedRowData) {
          // setTimeout(() => {
            
            console.log("commit data: ", inputValue, selectedRowData);
            // async ()=>{
              await contribute(selectedRowData, inputValue);
            // }
          // }, 1000);
        }
      };
 
      const handleCancelDialog = () => {
        setVisibleDialog(false);
        setSelectedRowData(null);
      };

      // 确认收款对话框
      // const [visibleConformDialog, setVisibleConformDialog] = useState(false);
      // const [selectedRowData, setSelectedRowData] = useState(null);
  
      // const handleConformSubmitInput = async (inputValue) => {
      //   if (selectedRowData) {
      //     // setTimeout(() => {
            
      //       console.log("commit data: ", inputValue, selectedRowData);
      //       // async ()=>{
      //         await contribute(selectedRowData, inputValue);
      //       // }
      //     // }, 1000);
      //   }
      // };
  
      // const handleConformCancelDialog = () => {
      //   setVisibleDialog(false);
      //   setSelectedRowData(null);
      // };

      // status 映射
      const statusMapping = {
        1: { text: '筹资期', color: 'blue' },
        2: { text: '还款期', color: 'green' },
        3: { text: '已结束', color: 'gray' },
        4: { text: '已撤销', color: 'red' },
      };

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
          render: (status, record) => {
            const isEspired = parseInt(record.collectEndTime * 1000, 10) < Date.now();
            const isEligible = parseInt(record.amount) > parseInt(record.collected);
            const { text, color } = statusMapping[status] || { text: '未知状态', color: 'black' };
            if ( ! isEligible) {
            return <Tag color={color}>{text}</Tag>;
            } 
            if (isEligible && isEspired) {
              return <Tag color='gray'>已过期</Tag>;
            } 
            else {
              return <Tag color={color}>{text}</Tag>;
            }
          },
        },
        {
          title: 'CollectEndTime',
          dataIndex: 'collectEndTime',
          key: 'collectEndTime',
          render: (record) => <a>{format(new Date(record * 1000), 'yyyy-MM-dd HH:mm')}</a>,
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
          render: (text, record) => {
            const isEspired = parseInt(record.collectEndTime * 1000, 10) < Date.now();
            const isEligible = parseInt(record.amount) > parseInt(record.collected);
          
            if (isEligible) {
              if (isEspired) {
                return <Tag color='gray'>已过期</Tag>;
              } else {
              return (
                <Button type="link" onClick={async () => {
                  console.log(record.amount, record.pid);
                  await setSelectedRowData(record.pid);
                  setTimeout(() => {
                    console.log(selectedRowData);
                  }, 1000);
                  setVisibleDialog(true);
                }}>
                  出资
                </Button>
              )};
            } else {
              return <Tag color='green'>已筹满</Tag>;
            }
          }
        },
        {
          title: 'Pid',
          dataIndex: 'pid',
          key: 'pid',
        },
      ];



      // 更新选中行的pid到 出资按钮
      useEffect(() => {
        if (selectedRowData && visibleDialog) {
          // 这里可以执行一些初始化操作，比如设置对话框中的默认值等
          console.log("selectedRowData:", selectedRowData, visibleDialog);
        }
      }, [selectedRowData, visibleDialog]);

      useEffect(() => {
        console.log("useEffect: ", allProjects, );
        getAllProjects();
      }, [isActive, account,  connector,  provider, msgType, msgContent]);
 
      // 标签页 定义筹款页面
      function tabPageLoan() {
      //   const handleDateChange = (date, dateString) => {
      //     if (date) {
      //       const dateStr = date.$d;
      //       const dates = new Date(dateStr);
      //       const timestamp = Math.floor(dates.getTime() / 1000);
      //       console.log('10 位时间戳:', timestamp);
      //         // const timestamp = Math.floor(date.getTime() / 1000);
      //         // console.log('10位时间戳:', timestamp);
      //     }
      // };
        return (          
        <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px' }}>

        <Divider 
        orientation="left"  
        style={{
        borderColor: '#7cb305',
        }}>
        <h3>提交筹款信息</h3>
        </Divider>

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
            {/* <Form.Item label="Endtime" name="endtime">
                <Input placeholder="endtime stamp"/>
            </Form.Item> */}
            <Form.Item label="Endtime" name="endtime">
                {/* <DatePicker onChange={handleDateChange} /> */}
                <DatePicker  />
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

            <Form.Item label="Commit">
              <motion.div
              whileHover={{ scale: [null, 1.05, 1.03] }} // 鼠标悬停时放大到1.1倍
              transition={{ ease: "easeOut", duration: 0.3 }} // 动画过渡方式：easeOut缓动，持续时间0.3s
              >
                <Button color="primary" variant="outlined" htmlType="submit">Commit</Button>
              </motion.div>
            </Form.Item>
            </Form>
            </div>
      )
    }

      // 标签页 定义筹款页面
      function tabPageRepay() {
        return (
                <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px' }}>
                  {contextHolder}
                  <Divider 
                  orientation="left"  
                  style={{
                  borderColor: '#7cb305',
                  }}>
                  <h3>查看账单</h3>
                  </Divider>
                  <Space>
                    <Input
                        placeholder="项目ID"
                        type="text"
                        value={projectsPid}
                        onChange={(e) => setprojectsPid(e.target.value)}
                        className={styles.input}
                        style={{ width: '100px' }}
                    />
                      <motion.div
                        whileHover={{ scale: [null, 1.1, 1.08] }} // 鼠标悬停时放大到1.1倍
                        transition={{ ease: "easeOut", duration: 0.3 }} // 动画过渡方式：easeOut缓动，持续时间0.3s
                      >
                    <Button 
                    onClick={
                        async ()=>{
                          console.log("theAddress to solidity : ", projectsPid)
                            await getBill(projectsPid);
                        }} 
                    type="primary" size="middle">
                    查看账单
                  </Button>
                    </motion.div>
                  </Space>

                    <DataDisplay data={billData} />

                    <Divider 
                      orientation="left"  
                      style={{
                      borderColor: '#7cb305',
                      }}>
                      <h3>还款</h3>
                      </Divider>
                      <Space>
                     <Input
                      placeholder="repay value"
                        type="text"
                        value={projectsvalue}
                        onChange={(e) => setprojectsvalue(e.target.value)}
                        className={styles.input}
                        style={{ width: '200px' }}

                      />
                      <motion.div
                        whileHover={{ scale: [null, 1.1, 1.08] }} // 鼠标悬停时放大到1.1倍
                        transition={{ ease: "easeOut", duration: 0.3 }} // 动画过渡方式：easeOut缓动，持续时间0.3s
                      >
                        <Button 
                        onClick={
                            async ()=>{
                              console.log("theAddress to solidity : ", projectsPid)
                                await repay(projectsPid, projectsvalue);
                            }} 
                        type="primary" size="middle">
                        还款
                      </Button>
                    </motion.div>
                    </Space>

                    </div>
        )
        }

      const items = [
        {
          key: '1',
          label: '筹款',
          children: tabPageLoan(),
        },
        {
          key: '2',
          label: '还款',
          children: tabPageRepay(),
        },
      ];
      // zustand data
    

    return (
        <Web3Provider>
        {contextHolder}
            <Navigate/>
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1 }}
           >
          <Row>
          <Col span={1}>
            </Col>
            <Col span={23}>
              <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px' }}>
                <Divider 
                orientation="left"  
                style={{
                borderColor: '#7cb305',
                }}>
                  <h1>Loan Platform</h1>

                </Divider>
  
            <Table columns={columns} dataSource={tabledata} />

              <Row>
              <Col span={22}></Col>
              <Col span={1}>
                <motion.div
                    whileHover={{ scale: [null, 1.1, 1.08] }} // 鼠标悬停时放大到1.1倍
                    transition={{ ease: "easeOut", duration: 0.3 }} // 动画过渡方式：easeOut缓动，持续时间0.3s
                  >
                  <Button 
                  onClick={
                    async ()=>{
                      console.log("theAddress to solidity : ", projectsPid)
                      await getAllProjects();
                      }} 
                      type="primary" size="middle">
                        刷新列表
                  </Button>

                </motion.div>
              </Col>
              </Row>
            </div>

            <InputDialog
              onSubmit={handleSubmitInput}
              visible={visibleDialog}
              onCancel={handleCancelDialog}
              defaultValue=""
            />

          </Col>
        </Row>



            <Row>
              <Col span={1}></Col>
              <Col span={10}>
              <div style={{ backgroundColor: 'white', marginTop: '10px', padding: '1px', borderRadius: '8px' }}>
                <Tabs defaultActiveKey="1" centered items={items}  />
              </div>    
              </Col>
            </Row> 
        {/* </main> */}
        {/* </div> */}
          </motion.div>

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