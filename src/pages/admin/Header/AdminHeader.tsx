import { Button, Layout } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons';
const { Header } = Layout;

interface interface_AdminHeader_props{
    collapsed: boolean, 
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}
export default function AdminHeader(props: interface_AdminHeader_props){
    const { collapsed, setCollapsed } = props;
    return (
        <> 
        <Header style={{ padding: 0 }} >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
        </Header>
        </>
    );
}