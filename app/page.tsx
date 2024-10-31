"use client";
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
    
                <App />

            </main>
          </div>
    </Web3Provider>
  );
}
