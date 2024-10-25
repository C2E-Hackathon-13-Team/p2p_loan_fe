import React, { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb, Layout, Menu, theme, Row, Col } from 'antd';
import styles from './style.css';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';


const Header = () => {


    const items = [
        { label: '证书监控', key: '', icon: <PieChartOutlined /> },
        { label: '定时任务', key: 'loanform', icon: <FileOutlined /> },
        { label: 'hmg-gpt', key: 'about', icon: <DesktopOutlined /> },
    ]

    return (
        <nav className={styles.navbar}>
            <div className={styles.brandTitle}>P2P Loan Platform</div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className={styles.menu_title_content} >
            {items.map((item) =>
              item.children ? (
                <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
                  {item.children.map((child) => (
                    <Menu.Item key={child.key}>
                      <Link href={`/${child.key}`}>{child.label}</Link>
                    </Menu.Item>
                  ))}
                </Menu.SubMenu>
              ) : (
                <Menu.Item key={item.key} icon={item.icon}>
                  <Link href={`/${item.key}`}>{item.label}</Link>
                </Menu.Item>
              )
            )}
          </Menu>
        </nav>
    );
};

export default Header;