
interface IMenuParams {
  menuId?: number;
  parentId: number;
  name: string;
  url: string;
  perms: string;
  type: number;
  icon?: string;
  orderNum: number;
}

interface IRoleParams {
  roleId?: number;
  roleName: string;
  remark?: string;
  menuIdList: number[];
}

interface IRoleQuery {
  roleName: string;
}
