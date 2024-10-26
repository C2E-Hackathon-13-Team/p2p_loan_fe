"use client";
import Image from "next/image";
import styles from "./page.module.css";
import App from './home/App.jsx';
import Navigate from './navigate/navigate';



import { Web3Provider } from './Web3Provider.jsx'

export default function Home() {
  return (
        <Web3Provider>

          <Navigate/>
    <div className={styles.page}>
      <main className={styles.main}>
  
        <h1>p2p loan platform, welcome your comming...</h1>
        {/* <li>p2p loan platform, welcome your comming...</li> */}
          <App />

      </main>
    </div>
    </Web3Provider>
  );
}
