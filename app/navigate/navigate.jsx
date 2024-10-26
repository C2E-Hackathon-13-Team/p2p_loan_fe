// "use client"
// import styles from "./navigate.css";
// import Link from 'next/link'
// import {useState, useEffect} from 'react';

// export default function Navigate() {


//     return (
//         <nav className="navbar">
//         <div className="brandTitle">P2P Loan Platform</div>

//         <ul className="nav-list">
//             <li><Link href="/" >首页</Link></li>
//             <li><Link href="/loanform" >筹款广场</Link></li>
//             <li><Link href="#" >交易大厅</Link></li>
//             <li><Link href="/about" >关于我们</Link></li>
//             <li><Link href="#">新闻资讯</Link></li>
//             <li><Link href="#">下载 APP</Link></li>
//         </ul>
//         </nav>
//     )  
// }


import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from "./navigate.module.css"; // 确保路径正确

export default function Navigate() {
    const [activeIndex, setActiveIndex] = useState(0); // 假设默认首页是激活的

    useEffect(() => {
        // 从 localStorage 中读取 activeIndex 并更新状态
        const storedIndex = localStorage.getItem('activeIndex');
        if (storedIndex !== null) {
            setActiveIndex(parseInt(storedIndex, 10));
        }
    }, []);

    // 定义导航栏跳转的路由，和导航栏一一对应
    const linksMap = {
        0: "/",
        1: "/loanform",
        2: "/",
        3: "/about",
        4: "/",
      };

    const handleLinkClick = (index) => {
        setActiveIndex(index); // 更新激活的导航项索引
        localStorage.setItem('activeIndex', index); // 将索引存储到 localStorage
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.brandTitle}>P2P Loan Platform</div>
            <ul className={styles.navList}>
                {["首页", "筹款广场", "交易大厅", "关于我们", "公告"].map((item, index) => (
                    <li key={index}>
                        <Link href={linksMap[index]}>
                            < p
                                className={activeIndex === index ? styles.activeLink : ''} 
                                onClick={() => handleLinkClick(index)}
                            >
                                {item}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}