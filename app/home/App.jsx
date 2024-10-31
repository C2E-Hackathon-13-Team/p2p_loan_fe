// import './App.css'
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';
import {motion} from 'framer-motion';
import { Button } from 'antd';
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

  return (
    <>
    <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1 }}
           >
      <h1 style={{ color: 'white' }}>p2p loan platform, welcome your comming...</h1>

    </motion.div>

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