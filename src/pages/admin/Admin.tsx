import { Outlet } from "react-router-dom";
import SideBar from "./SideBar/SideBar";
import AdminHeader from "./Header/AdminHeader";
import { Layout } from "antd";
import { useState } from 'react';
import 'styles/admin.scss'

const { Content } = Layout;
export default function Admin(){
    const [collapsed, setCollapsed] = useState(false);
    return (
        <> 
        <Layout className="admin">
            <SideBar collapsed={collapsed} />
            <Layout className="right-part">
                <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed}/>
                <Content><Outlet/></Content>
            </Layout>
        </Layout>
        </>
    );
}