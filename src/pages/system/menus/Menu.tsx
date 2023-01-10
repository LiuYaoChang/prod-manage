import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Modal, Popover, Radio, Select, Space, Table, Tag, Tree } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getMenuListAction } from '@/store/modules/system';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
  import type { DataNode } from 'antd/es/tree';
import YBDicts from '@/constants/dicts';
import './style.scss'
// import { treeDataTranslate } from '@/utils/table';
const { Option } = Select;
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}
interface IFromProps {
  onAdd?: () => void;
}
interface ITableProps {
  onEdit: (row: DataType) => void;
  onDelete: (row: DataType) => void;
}
interface IProps {
  isModalOpen: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

const MenuForm: React.FC<IFromProps> = (props: IFromProps) => {
  const onFinish = (values: any) => {
    if (props.onAdd) {
      props.onAdd();
    }
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="yb-menus-page yb-page-main">
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >

        <Form.Item>
          <Button type="primary" htmlType="submit">
            新增
          </Button>
        </Form.Item>
      </Form>
      <div className="yb-menu-list">

      </div>
    </div>
  );
};


const MenuTable: React.FC<ITableProps> = (props: ITableProps) => {
  const { onDelete, onEdit } = props;
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
      render: (_, record: DataType) => (
        <Space size="middle">
          <Button type="primary" size={'small'} onClick={() => onEdit(record)}>
            <EditOutlined />
            修改
          </Button>
          <Button type="primary" size={'small'} danger onClick={() => onDelete(record)}>
            <DeleteOutlined />
            删除
          </Button>
        </Space>
      ),
    }
  ];
  // return <Table rowKey="menuId" columns={columns} dataSource={menuList} />
  return <Table rowKey="menuId" columns={columns} dataSource={menuList} scroll={{ x: 'max-content' }} />
};

const MenuPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getMenuListAction()).then((data) => {

    })
  }, [])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 删除
  const handleDelete = (data: DataType) => {
    showModal();
    console.log("🚀 ~ file: Menu.tsx:147 ~ handleDelete ~ data", data)
  }
  // 编辑
  const handleEdit = (data: DataType) => {
    showModal();
    console.log("🚀 ~ file: Menu.tsx:151 ~ handleEdit ~ data", data)
  }
  return (
    <div className="yb-menus-page yb-page-main">
      <div className="yh-menu-form">
        <MenuForm onAdd={showModal}  />
      </div>
      <div className="yb-menu-list">
        <MenuTable onDelete={handleDelete} onEdit={handleEdit} />
      </div>
      <MenuAddDialog isModalOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
    </div>
  );
}

const MenuAddDialog: React.FC<IProps> = (props: IProps) => {
  const menuList = useAppSelector((state) => state.system.menuList)
  const { isModalOpen, onOk, onCancel } = props;
  const handleOk = onOk ? onOk : () => {};
  const handleCancel = onCancel ? onCancel : () => {};
  const CMenuTypes = YBDicts.CMenuTypes;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const titleRender = (data: any) => {
    return <span>{data.name}</span>
  }
  const treeData: DataNode[] = [
    {
      title: 'parent',
      key: '0',
      children: [
        {
          title: 'child 1',
          key: '0-0',
          disabled: true,
        },
        {
          title: 'child 2',
          key: '0-1',
          disableCheckbox: true,
        },
      ],
    },
  ];
  const [form] = Form.useForm();
  const text = <span>上级菜单</span>;
  const MenuTree = (
    <div className="yb-menu-tree__wrap">
      <Tree defaultSelectedKeys={['0-1']} defaultExpandAll treeData={menuList} blockNode titleRender={titleRender} />
    </div>
  )
  const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
        break;
      default:
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };
  return (
    <>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="yb-menus-add-form">
          <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          <Form.Item name="radio-group" label="类型">
            <Radio.Group>
              {
                CMenuTypes.map(type => {
                  return <Radio value={type.value}>{type.label}</Radio>
                })
              }
            </Radio.Group>
          </Form.Item>
          <Form.Item name="note" label="名称" rules={[{ required: true }]}>
            <Input placeholder="名称" />
          </Form.Item>
          <Form.Item name="note" label="上级菜单" rules={[{ required: true }]}>
            <Popover placement="top" title={text} content={MenuTree} trigger="click">
              <Input />
            </Popover>
          </Form.Item>
          <Form.Item name="note" label="菜单路由" rules={[{ required: true }]}>
            <Input placeholder="菜单路由" />
          </Form.Item>
          {/* 不是目录可以配置 */}
          <Form.Item name="note" label="授权标识" rules={[{ required: true }]}>
            <Input placeholder="多个用逗号分隔, 如: user:list,user:create" />
          </Form.Item>
          {/* 非按钮可以配置 */}
          <Form.Item name="note" label="排序号" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {/* 非按钮可以配置 */}
          <Form.Item name="note" label="菜单图标" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default MenuPage;
