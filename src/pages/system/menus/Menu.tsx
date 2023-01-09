import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getMenuListAction } from '@/store/modules/system';
import { treeDataTranslate } from '@/utils/table';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const MenuForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="yb-menus-page yb-page-main">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div className="yb-menu-list">

      </div>
    </div>
  );
};


const MenuTable: React.FC = () => {
  const menuList = useAppSelector((state) => state.system.menuList)

  const columns: ColumnsType<DataType> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '上级菜单',
      dataIndex: 'parentName',
      key: 'parentName',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
    },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type'
    },
    {
      title: '排序号',
      key: 'orderNum'
    },
    {
      title: '菜单URL',
      dataIndex: 'url',
      key: 'url'
    },
    {
      title: '授权标识',
      dataIndex: 'perms',
      key: 'perms'
    },
    {
      title: '操作',
      fixed: 'right',
      width: 150,
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>修改</a>
          <a>删除</a>
        </Space>
      ),
    }
  ];
  // return <Table rowKey="menuId" columns={columns} dataSource={menuList} />
  return <Table rowKey="menuId" columns={columns} dataSource={menuList} scroll={{ x: 'max-content' }} />
};

const MenuPage: React.FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getMenuListAction()).then((data) => {

    })
  }, [])
  return (
    <div className="yb-menus-page yb-page-main">
      <div className="yh-menu-form">
        <MenuForm />
      </div>
      <div className="yb-menu-list">
        <MenuTable />
      </div>
    </div>
  );
}

export default MenuPage;
