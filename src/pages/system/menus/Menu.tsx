import React, { useEffect, useState } from 'react';
import { Button, Cascader, Form, Input, InputNumber, Modal, Radio, Select, Space, Spin, Table, Tag, Tree, TreeSelect } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getMenuInfoAction, getMenuListAction, getSelectMenuListAction, updateMenuAction } from '@/store/modules/system';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import YBDicts from '@/constants/dicts';
import './style.scss'
import { isDef } from '@/utils/share';
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
  onEdit: (row: IMenu) => void;
  onDelete: (row: IMenu) => void;
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

  const columns: ColumnsType<IMenu> = [
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
      render: (_, record: unknown) => (
        <Space size="middle">
          <Button type="primary" size={'small'} onClick={() => onEdit(record as IMenu)}>
            <EditOutlined />
            修改
          </Button>
          <Button type="primary" size={'small'} danger onClick={() => onDelete(record as IMenu)}>
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
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<number>();
  const dispatch = useAppDispatch()
  useEffect(() => {
    loadTableData();
    dispatch(getSelectMenuListAction())
  }, [])

  // 加载列表数据
  const loadTableData = () => {
    setLoading(true);
    dispatch(getMenuListAction())
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
  const handleDelete = (data: IMenu) => {
    showModal();
    console.log("🚀 ~ file: Menu.tsx:147 ~ handleDelete ~ data", data)
  }
  // 编辑
  const handleEdit = (data: IMenu) => {
    // menuId
    setId(data.menuId);
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
  const [nameLabel, setNameLabel] = useState<string>('名称');
  const menuList = useAppSelector((state) => state.system.selectMenuList);
  console.log("🚀 ~ file: Menu.tsx:187 ~ menuList", menuList)
  const originalSelectMenuList = useAppSelector((state) => state.system.originalSelectMenuList);
  const menuInfo = useAppSelector((state) => state.system.menuInfo);
  const { isModalOpen, onOk, onCancel, onClose, id } = props;
  // const handleOk = onOk ? onOk : () => {};
  const getParentIds = (info: IMenu, ids: number[] = []): number[] => {
    ids.unshift(info.menuId);
    if (info.parentId !== 0) {
      const parent = originalSelectMenuList.find((menu: IMenu) => (menu.menuId === info.parentId)) as IMenu;
      if (isDef(parent)) {
        return getParentIds(parent, ids);
      }
    } else {
      ids.unshift(0);
    }
    return ids;
  }
  useEffect(() => {
    // 存在ID就是编辑
    if (isDef(id)) {
      setIsEdit(true);
      setTitle('编辑菜单');
      // 加载表单详情
      dispatch(getMenuInfoAction(id as number))
    } else {
      form.resetFields();
      setTitle('新增菜单');
      setIsEdit(false)
    }
  }, [id]);

  useEffect(() => {
    console.log("🚀 ~ file: Menu.tsx:207 ~ useEffect ~ menuInfo", menuInfo);
    // 查找
    form.setFieldValue('parentId', menuInfo.parentId);
    form.setFieldValue('type', menuInfo.type);
    form.setFieldValue('name', menuInfo.name);
    form.setFieldValue('url', menuInfo.url);
    form.setFieldValue('perms', menuInfo.perms);
    form.setFieldValue('orderNum', menuInfo.orderNum);
    form.setFieldValue('icon', menuInfo.icon);
  }, [menuInfo])

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
  const parentId = Form.useWatch('parentId', form);
  useEffect(() => {
    console.log("🚀 ~ file: Menu.tsx:208 ~ useEffect ~ parentName", parentId)
  }, [parentId])
  useEffect(() => {
    console.log("🚀 ~ file: Menu.tsx:206 ~ useEffect ~ useEffect", type)
    const menuType = CMenuTypes.find(item => (item.value === type));
    if (menuType) {
      setNameLabel(`${menuType.label}名称`)
    }
  }, [type]);

  const onFinish = (values: any) => {
    console.log(values);
    const data:IMenuParams = {
        'menuId': id,
        'type': type,
        'name': form.getFieldValue('name'),
        'parentId': form.getFieldValue('parentId'),
        'url': form.getFieldValue('url'),
        'perms': form.getFieldValue('perms'),
        'orderNum': form.getFieldValue('orderNum'),
        'icon': form.getFieldValue('icon')
    }
    setLoading(true);
    dispatch(updateMenuAction(data)).then(() => {
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
            <Form.Item name="parentId" label="上级菜单" rules={[{ required: true, message: '上级菜单不能为空' }]}>
              <TreeSelect
                fieldNames={treeField}
                style={{ width: '100%' }}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="上级菜单"
                allowClear
                treeDefaultExpandAll
                treeData={menuList}
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
