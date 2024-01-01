import { Layout, Menu } from "antd";
import {
  AccountBookOutlined,
  DashboardOutlined,
    DollarOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
  } from '@ant-design/icons';
import 'styles/SideBar.scss'
import { Link, useLocation, useParams } from "react-router-dom";
import type { MenuProps } from 'antd';

interface interface_SideBar_props{
    collapsed: boolean
}
type MenuItem = Required<MenuProps>['items'][number];

export default function SideBar(props: interface_SideBar_props){
    const { Sider } = Layout;
    const { collapsed } = props; 
    // const location = useLocation();
    function getItem(
      label: React.ReactNode,
      key: React.Key,
      icon?: React.ReactNode,
      children?: MenuItem[],
    ): MenuItem {
      return {
        key,
        icon,
        children,
        label,
      } as MenuItem;
    }
    const userChildren: MenuItem[] = [
      getItem('CRUD', 'user', <Link to='/admin/user'><UserOutlined /></Link>),
      getItem('Files', '2.2', <Link to='/admin'><FileOutlined /></Link>),
    ]; 
    const items: MenuItem[] = [
      getItem('Dash Board', 'admin', <Link to='/admin'><DashboardOutlined /></Link>),
      getItem('Manage User','2', <TeamOutlined />, userChildren),
      getItem('Mange Book','book', <Link to='/admin/book'><AccountBookOutlined /></Link>),
      getItem('Mange Order', 'order', <Link to='/admin/order'><DollarOutlined /></Link>),
    ]; 

    return (
        <> 
        <Sider trigger={null} collapsible collapsed={collapsed} width={'15%'} className='admin-sider'>
          <div className='sider-title'>
            <h2>ADMIN PAGE</h2>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[`${location.href.split('/').pop()}`]}
            className='admin-menu'
            items={items}
          />
        </Sider>
        </>
    );
}