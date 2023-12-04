import { Layout, Menu } from "antd";
import {
  AccountBookOutlined,
  DashboardOutlined,
    DollarOutlined,
    UserOutlined,
  } from '@ant-design/icons';
const { Sider } = Layout;
import 'styles/SideBar.scss'
import { Link } from "react-router-dom";

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
                icon:<Link to='/admin'><DashboardOutlined /></Link> ,
                label: 'Dash Board',
              },
              {
                key: '2',
                icon:  <Link to='/admin/user'><UserOutlined /></Link>,
                label: 'Manage User',
              },
              {
                key: '3',
                icon: <Link to='/admin/book'><AccountBookOutlined /></Link>,
                label: 'Mange Book',
              },
              {
                key: '4',
                icon: <Link to='/admin/order'><DollarOutlined /></Link>,
                label: 'Mange Order',
              },
            ]}
          />
        </Sider>
        </>
    );
}