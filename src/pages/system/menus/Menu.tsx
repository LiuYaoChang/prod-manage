import React, { useEffect, useState } from 'react';
import { Button, Cascader, Checkbox, Form, Input, InputNumber, Modal, Popover, Radio, Select, Space, Table, Tag, Tree } from 'antd';
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

  // const [isOpenTree, setIsOpenTree] = useState<boolean>(false);
  const [nameLabel, setNameLabel] = useState<string>('名称')
  const menuList = useAppSelector((state) => state.system.menuList)
  const { isModalOpen, onOk, onCancel } = props;
  // const handleOk = onOk ? onOk : () => {};
  const handleCancel = onCancel ? onCancel : () => {};
  const handleOk = () => {
    form.submit();
  }
  const CMenuTypes = YBDicts.CMenuTypes;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  // const titleRender = (data: any) => {
  //   return <span>{data.name}</span>
  // }
  const [form] = Form.useForm();
  // const handleSelectParent = (keys: any[], {node}: { node: IMenu }) => {
  //   console.log("🚀 ~ file: Menu.tsx:209 ~ handleSelectParent ~ ev", node.menuId)
  //   console.log("🚀 ~ file: Menu.tsx:209 ~ handleSelectParent ~ keys", keys)
  //   // setIsOpenTree(false)
  // }
  // const handleFocusParent = () => {
  //   // setIsOpenTree(true);
  // }

  // const MenuTree = (
  //   <div className="yb-menu-tree__wrap">
  //     <Tree defaultExpandAll treeData={menuList} blockNode titleRender={titleRender} onSelect={handleSelectParent} />
  //   </div>
  // )
  // 监听菜单类型变化
  const type = Form.useWatch('type', form);
  const parentName = Form.useWatch('parentName', form);
  useEffect(() => {
    // 拿取到的是数组ID
    console.log("🚀 ~ file: Menu.tsx:208 ~ useEffect ~ parentName", parentName)
    // form.setFieldValue('parentId', )
  }, [parentName])
  useEffect(() => {
    console.log("🚀 ~ file: Menu.tsx:206 ~ useEffect ~ useEffect", type)
    const menuType = CMenuTypes.find(item => (item.value === type));
    if (menuType) {
      setNameLabel(`${menuType.label}名称`)
    }
  }, [type]);

  const onFinish = (values: any) => {
    console.log(values);
  };
  const onFinishFailed = (values: any) => {
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
          <Form {...layout} initialValues={{ type: 0 }} form={form} name="control-hooks" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item name="type" label="类型">
              <Radio.Group>
                {
                  CMenuTypes.map(type => {
                    return <Radio value={type.value} key={type.value}>{type.label}</Radio>
                  })
                }
              </Radio.Group>
            </Form.Item>
            <Form.Item name="name" label={nameLabel} rules={[{ required: true, message: '菜单名称不能为空' }]}>
              <Input placeholder={nameLabel} />
            </Form.Item>
            <Form.Item name="parentName" label="上级菜单" rules={[{ required: true, message: '上级菜单不能为空' }]}>
              <Cascader
                changeOnSelect
                fieldNames={{ label: 'name', value: 'menuId', children: 'children' }}
                options={menuList}
                placeholder="Please select"
              />
              {/* <Popover placement="top" title={text} content={MenuTree} trigger="click">
                <Input onFocus={handleFocusParent} />
              </Popover> */}
            </Form.Item>
            {
              type === 1
              ? ( <Form.Item name="url" label="菜单路由" rules={[{ required: type === 1, message: '菜单URL不能为空' }]}>
                <Input placeholder="菜单路由" />
              </Form.Item>)
              : null
            }
            {
              type !== 0
              ? ( <Form.Item name="perms" label="授权标识">
                <Input placeholder="多个用逗号分隔, 如: user:list,user:create" />
              </Form.Item>)
              : null
            }
            {
              type !== 2
              ? ( <Form.Item name="orderNum" label="排序号">
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>)
              : null
            }
            {
              type !== 2
              ? ( <Form.Item name="icon" label="菜单图标">
                <Input />
              </Form.Item>)
              : null
            }
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default MenuPage;
