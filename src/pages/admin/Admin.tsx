import { Outlet } from "react-router-dom";
import SideBar from "./SideBar/SideBar";
import AdminHeader from "./Header/AdminHeader";
import { Layout } from "antd";
import { useState } from 'react';


const { Content } = Layout;
export default function Admin(){
    const [collapsed, setCollapsed] = useState(false);


    return (
        <> 
        <Layout>
            <SideBar collapsed={collapsed} />
            <Layout>
                <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
                <Content><Outlet/></Content>
            </Layout>
        </Layout>
        </>
    );
}