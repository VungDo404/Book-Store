import { useState } from 'react';
import { Col, Layout, Menu } from "antd";
import {
  AccountBookOutlined,
  DashboardOutlined,
    DollarOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
const { Sider } = Layout;
import 'styles/SideBar.scss'

interface interface_SideBar_props{
    collapsed: boolean
}

export default function SideBar(props: interface_SideBar_props){
    const { collapsed } = props; 

    return (
        <> 
        <Sider trigger={null} collapsible collapsed={collapsed} width={'15%'} className='admin-sider'>
          <div className='sider-title'>
            <h2>ADMIN PAGE</h2>
          </div>
          <Menu
            theme="light"
            mode="vertical"
            defaultSelectedKeys={['1']}
            className='admin-menu'
            items={[
              {
                key: '1',
                icon: <DashboardOutlined />,
                label: 'Dash Board',
              },
              {
                key: '2',
                icon: <UserOutlined />,
                label: 'Manage User',
              },
              {
                key: '3',
                icon: <AccountBookOutlined />,
                label: 'Mange Book',
              },
              {
                key: '4',
                icon: <DollarOutlined />,
                label: 'Mange Order',
              },
            ]}
          />
        </Sider>
        </>
    );
}