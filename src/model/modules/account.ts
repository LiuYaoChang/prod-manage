

interface ILoginForm {
  accountName: string;
  password: string;
  captcha: string
}


interface IMenu {
  menuId: number;
  parentId: number;
  parentName: string;
  name: string;
  url: string;
  perms: string;
  type: number;
  icon?: string;
  orderNum: number;
  open: boolean;
}
interface IMenus extends IMenu {
  list: Array<IMenus>;
}

interface IRole {
  roleId: number;
  remark: string;
  menuIdList: number[];
  createUserId?: string;
  roleName: string;
  createTime?: string;
}
interface IRoles extends IRole {
  list: Array<IRoles>;
}


