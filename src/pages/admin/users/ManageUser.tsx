import { getUsersWithPaginate } from "@/services/user";
import { Button, Col, Form, Input, Row, Space, Table, theme } from "antd";
import type {
    ColumnsType,
    TableProps,
    TablePaginationConfig,
} from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useEffect, useState } from "react";


interface userType {
    _id: string,
    fullName: string,
    email: string,
    phone: string,
    role: string,
    avatar: string,
    isActive: boolean,
    createdAt: string,
    updatedAt: string,
    __v: number,
}
export interface interface_get_users_with_paginate {
    statusCode: number,
    message: string,
    author: string,
    data: {
        meta: {
            current: number,
            pageSize: number,
            pages: number,
            total: number,
        };
        result: userType[];
    }
}

export default function MangeUser() {
    const { token } = theme.useToken();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [data, setData] = useState<userType[]>([]);
    const [form] = Form.useForm();

    interface TableParams {
        pagination?: TablePaginationConfig;
        sortField?: string;
        sortOrder?: string;
        filters?: Record<string, FilterValue>;
    }
    const columns: ColumnsType<userType> = [
        {
            title: "Name",
            dataIndex: "fullName",
            filterSearch: false,
            sorter: true,
            width: "30%",
        },
        {
            title: "Email",
            dataIndex: "email",
            sorter: true,
        },
        {
            title: "Phone number",
            dataIndex: "phone",
            sorter: true,
            width: "40%",
        },
    ];
    const formStyle: React.CSSProperties = {
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };
    const onChange = (
        pagination: TablePaginationConfig,
        filters: Record<string, FilterValue>,
        sorter: SorterResult<userType>
    ) => {
        console.log("params", pagination, filters, sorter);
        fetchUsers(pagination.current, pagination.pageSize);

    };
    const onFinish = (values: any) => {
        console.log("Received values of form: ", values);
    };
    const fetchUsers = async (current: number = 1, pageSize: number = 3) => {
        const res = (await getUsersWithPaginate(current, pageSize)).data;
        if (res.statusCode === 200) {
            setTableParams({
                pagination: {
                    ...res.data.meta
                },
            });
            setData([...res.data.result]);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    return (
        <>
            <Row justify="space-around">
                <Col md={{ offset: 0, span: 24 }}>
                    <Form
                        form={form}
                        name="advanced_search"
                        style={formStyle}
                        onFinish={onFinish}
                    >
                        <Row gutter={24}>
                            <Col span={8} key={1}>
                                <Form.Item name={`name`} label={`Name`}>
                                    <Input placeholder="Name" />
                                </Form.Item>
                            </Col>
                            <Col span={8} key={2}>
                                <Form.Item name={`email`} label={`Email`}>
                                    <Input placeholder="Email" />
                                </Form.Item>
                            </Col>
                            <Col span={8} key={3}>
                                <Form.Item
                                    name={`phone`}
                                    label={`Phone number`}
                                >
                                    <Input placeholder="Phone number" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <div style={{ textAlign: "right" }}>
                            <Space size="small">
                                <Button type="primary" htmlType="submit">
                                    Search
                                </Button>
                                <Button
                                    onClick={() => {
                                        form.resetFields();
                                    }}
                                >
                                    Clear
                                </Button>
                            </Space>
                        </div>
                    </Form>
                </Col>
                <Col md={{ offset: 0, span: 23 }}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        onChange={onChange}
                        loading={loading}
                        pagination={tableParams.pagination}
                    />
                </Col>
            </Row>
        </>
    );
}
