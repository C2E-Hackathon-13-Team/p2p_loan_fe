"use client"
import { Web3Provider } from '../Web3Provider.jsx'
import { Button, Input, } from 'antd';
import React, { useState } from 'react';







export default function AdminExport(){
    const [address, setAddress] = useState<string>("");
    const [uname, setUname] = useState<string>("");

    async function registerLauncher(){
        const response = await fetch("http://localhost:8080/launcher/registerLauncher", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                address: address,
                uname: uname
            }),
        });
        console.log(response.json())
    }
    return (
        <Web3Provider>
            <Input value={address} onChange={(e)=>setAddress(e.target.value)} style={{ width: '60%' }} placeholder='地址' />
            <Input value={uname} onChange={(e)=>setUname(e.target.value)} style={{ width: '60%' }} placeholder='姓名' />
            <Button type="primary" onClick={registerLauncher}>Submit</Button>
        </Web3Provider>
    )
}