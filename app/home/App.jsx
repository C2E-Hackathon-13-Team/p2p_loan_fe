// import './App.css'
import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
// import {motion} from 'framer-motion';
import  TypingEffect from './daziji'; // 假设你将上面的组件保存在TypingMachine文件中

// import { useContract } from '../useContract';
// import { Input, label, Button, Tooltip } from "antd";
// import StarBackground from '../particles/ParticleBackground';

function App() {
  const {  account,  connector,  provider } = useWeb3React();
  // const {approve,transfer,balanceOf,balance, balanceb} = useContract();
  useEffect(()=>{
    setTimeout(()=>{
      const active = connector.activate();
      active.then(()=>{
        // console.log("active",r);
      })
    },1000)
  },[provider,connector,account])



  const [show, setShow] = useState(true);

  useEffect(() => {
    // 每10秒切换显示状态
    const interval = setInterval(() => {
      setShow(true);

      // 5秒后隐藏
      setTimeout(() => {
        setShow(false);
      }, 7900);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // const HeadingComponent = () => {
  //   return <h1>这是一个标题</h1>;
  // };

 


  return (
    <>
    {/* <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1 }}
           >
      <h1 style={{ color: 'white' }}>p2p loan platform, welcome your comming...</h1>

    </motion.div> */}




{show && <h1 style={{ color: 'white' }}>
<TypingEffect text="p2p loan platform, welcome your comming..." />
</h1>}

  {/* <motion.div
      initial={{ x: 0 }}
      animate={{
          x: [-500, 500],
          y: 0,
          transition: {
              duration: 20,
              repeat: Infinity,
              repeatType: 'mirror',
          },
      }}
  >
      <h1>循环移动的文本</h1>
  </motion.div> */}
  </>
 
  )
}

export default App;