import React, { useEffect, useState } from 'react';
import { Button, Cascader, Form, Input, InputNumber, Modal, Radio, Select, Space, Spin, Table, Tag, Tree, TreeSelect } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getMenuListAction, getRoleInfoAction, getRoleListAction, updateRoleAction } from '@/store/modules/system';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import YBDicts from '@/constants/dicts';
import './style.scss'
import { isDef } from '@/utils/share';

const { SHOW_ALL } = TreeSelect;
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
  onEdit: (row: IRole) => void;
  onDelete: (row: IRole) => void;
}
interface IProps {
  id?: number;
  isModalOpen: boolean;
  onOk?: () => void;
  onClose?: () => void;
  onCancel?: () => void;
}

const MenuForm: React.FC<IFromProps> = (props: IFromProps) => {
  const onFinish = (values: any) => {
    if (props.onAdd) {
      props.onAdd();
    }
    console.log('Success:', values);
  };
  const handleQuery = () => {

  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="yb-page-filter-form">
      <Form
        name="roleSelect"
        layout={'inline'}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item name="name" label="">
          <Input placeholder="角色名称" />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" onClick={handleQuery}>查询</Button>
            <Button type="primary" htmlType="submit">新增</Button>
            <Button type="primary" danger>批量删除</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};


const MenuTable: React.FC<ITableProps> = (props: ITableProps) => {
  const { onDelete, onEdit } = props;
  const menuList = useAppSelector((state) => state.system.roleList)
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IMenu[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: IMenu) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  const columns: ColumnsType<IMenu> = [
    {
      title: 'ID',
      dataIndex: 'roleId',
      key: 'roleId'
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      fixed: 'right',
      width: 150,
      key: 'action',
      render: (_, record: unknown) => (
        <Space size="middle">
          <Button type="primary" size={'small'} onClick={() => onEdit(record as IRole)}>
            <EditOutlined />
            修改
          </Button>
          <Button type="primary" size={'small'} danger onClick={() => onDelete(record as IRole)}>
            <DeleteOutlined />
            删除
          </Button>
        </Space>
      ),
    }
  ];
  // return <Table rowKey="menuId" columns={columns} dataSource={menuList} />
  return <Table
    rowKey="roleId"
    rowSelection={{
      type: 'checkbox',
      ...rowSelection,
    }}
    columns={columns}
    dataSource={menuList}
    scroll={{ x: 'max-content' }}
  />
};

const MenuPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<number>();
  const dispatch = useAppDispatch()
  useEffect(() => {
    loadTableData();
    dispatch(getMenuListAction())
  }, [])

  // 加载列表数据
  const loadTableData = () => {
    setLoading(true);
    dispatch(getRoleListAction({ roleName: '' }))
    .then(() => {

    }).finally(() => {
      setLoading(false);
    })
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    loadTableData();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleModelClose = () => {
    setId(undefined);
  };
  // 删除
  const handleDelete = (data: IRole) => {
    showModal();
    console.log("🚀 ~ file: Menu.tsx:147 ~ handleDelete ~ data", data)
  }
  // 编辑
  const handleEdit = (data: IRole) => {
    // menuId
    setId(data.roleId);
    showModal();
    console.log("🚀 ~ file: Menu.tsx:151 ~ handleEdit ~ data", data)
  }
  return (
    <div className="yb-menus-page yb-page-main">
      <div className="yh-menu-form">
        <MenuForm onAdd={showModal}  />
      </div>
      <div className="yb-menu-list">
        <Spin tip="Loading..." spinning={loading}>
          <MenuTable onDelete={handleDelete} onEdit={handleEdit} />
        </Spin>
      </div>
      <MenuAddDialog isModalOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} id={id} onClose={handleModelClose} />
    </div>
  );
}

const MenuAddDialog: React.FC<IProps> = (props: IProps) => {
  const dispatch = useAppDispatch()
  // const [isOpenTree, setIsOpenTree] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('新增菜单');
  const menuList = useAppSelector((state) => state.system.menuList);
  console.log("🚀 ~ file: Menu.tsx:187 ~ menuList", menuList)
  const roleInfo = useAppSelector((state) => state.system.roleInfo);
  const { isModalOpen, onOk, onCancel, onClose, id } = props;
  // const handleOk = onOk ? onOk : () => {};

  useEffect(() => {
    // 存在ID就是编辑
    if (isDef(id)) {
      setIsEdit(true);
      setTitle('编辑菜单');
      // 加载表单详情
      dispatch(getRoleInfoAction(id as number))
    } else {
      form.resetFields();
      setTitle('新增菜单');
      setIsEdit(false)
    }
  }, [id]);

  useEffect(() => {
    // 查找
    form.setFieldValue('remark', roleInfo.remark);
    form.setFieldValue('menuIdList', roleInfo.menuIdList || []);
    form.setFieldValue('roleName', roleInfo.roleName);
  }, [roleInfo])

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

  const onFinish = (values: any) => {
    const data: IRoleParams = {
        'roleId': id || undefined,
        'roleName': form.getFieldValue('roleName'),
        'remark': form.getFieldValue('remark'),
        menuIdList: form.getFieldValue('menuIdList')
        // 'menuIdList': [].concat(this.$refs.menuListTree.getCheckedKeys(), [this.tempKey], this.$refs.menuListTree.getHalfCheckedKeys())
    }
    setLoading(true);
    dispatch(updateRoleAction(data)).then(() => {
      if (onOk) {
        onOk();
      }
    }).finally(() => {
      setLoading(false);
    })
    console.log("🚀 ~ file: Menu.tsx:290 ~ onFinish ~ data", data)
  };
  const onFinishFailed = (values: any) => {
    console.log(values);
  };
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    onReset();
  }
  const onReset = () => {
    form.resetFields();
  };
  const onChange = (newValue: string[], ...args: any[]) => {
    console.log("🚀 ~ file: Role.tsx:316 ~ onChange ~ args", args)
    console.log('onChange ', newValue);
    // setValue(newValue);
  };
  const onSelect = (newValue: any) => {
    console.log('onChange ', newValue);
    // setValue(newValue);
  };

  const treeField = {
    label: 'name',
    value: 'menuId'
  }
  return (
    <>
      <Modal
        title={title}
        confirmLoading={loading}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        afterClose={handleClose}>
        <div className="yb-menus-add-form">
          <Form {...layout} initialValues={{ type: 0 }} form={form} name="control-hooks" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Form.Item name="roleName" label="角色名称" rules={[{ required: true, message: '角色名称不能为空' }]}>
              <Input placeholder="角色名称" />
            </Form.Item>
            <Form.Item name="remark" label="备注">
              <Input placeholder="备注" />
            </Form.Item>
            <Form.Item name="menuIdList" label="授权" rules={[{ required: true, message: '上级菜单不能为空' }]}>
              <TreeSelect
                onChange={onChange}
                onSelect={onSelect}
                fieldNames={treeField}
                style={{ width: '100%' }}
                treeCheckable={ true }
                showCheckedStrategy={ SHOW_ALL }
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="上级菜单"
                allowClear
                treeData={menuList}
              />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default MenuPage;
