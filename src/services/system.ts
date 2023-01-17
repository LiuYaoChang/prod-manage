// 加载菜单
export const getMenuList = async () => {
  try {
    const menus = await $request.get('/sys/menu/list');
    return menus;
  } catch (error) {
    console.log("🚀 ~ file: account.ts:27 ~ getAccountMenus ~ error", error)
  }
}

// 加载下拉菜单
export const getSelectMenuList = async () => {
  try {
    const menus = await $request.get('/sys/menu/select');
    console.log("🚀 ~ file: system.ts:5 ~ getMenuList ~ menus", menus)
    return menus;
  } catch (error) {
    console.log("🚀 ~ file: account.ts:27 ~ getAccountMenus ~ error", error)
  }
}

/**
 * 加载菜单详情
 * @param id
 * @returns
 */
export const getMenuInfo = async (id: number) => {
  try {
    const menus = await $request.get(`/sys/menu/info/${id}`);
    return menus;
  } catch (error) {
    console.log("🚀 ~ file: account.ts:27 ~ getAccountMenus ~ error", error)
  }
}

/**
 * 编辑菜单
 * @param id
 * @returns
 */
export const updateMenu = async (params: IMenuParams) => {
  try {
    const menus = await $request.post(`/sys/menu/${!params.menuId ? 'save' : 'update'}`, params);
    return menus;
  } catch (error) {
    console.log("🚀 ~ file: account.ts:27 ~ getAccountMenus ~ error", error)
  }
}
// 加载下拉菜单
// url: this.$http.adornUrl('/sys/menu/select'),

/**************************** ROLE ***********************************************/

/**
 * load role list
 * @returns
 */
export const getRoleList = async (params: { roleName: string }) => {
  try {
    const roles = await $request.get('/sys/role/list', params);
    return roles;
  } catch (error) {
    console.log("🚀 ~ file: account.ts:27 ~ getAccountMenus ~ error", error)
  }
}

// // 加载下拉菜单
// export const getSelectMenuList = async () => {
//   try {
//     const menus = await $request.get('/sys/menu/select');
//     console.log("🚀 ~ file: system.ts:5 ~ getMenuList ~ menus", menus)
//     return menus;
//   } catch (error) {
//     console.log("🚀 ~ file: account.ts:27 ~ getAccountMenus ~ error", error)
//   }
// }

/**
 * 加载 ROLE 详情
 * @param id
 * @returns
 */
export const getRoleInfo = async (id: number) => {
  try {
    const roleInfo = await $request.get(`/sys/role/info/${id}`);
    return roleInfo;
  } catch (error) {
    console.log("🚀 ~ file: account.ts:27 ~ getAccountMenus ~ error", error)
  }
}

/**
 * 编辑角色
 * @param id
 * @returns
 */
export const updateRole = async (params: IRoleParams) => {
  console.log("🚀 ~ file: system.ts:98 ~ updateRole ~ params", params)
  try {
    const menus = await $request.post(`/sys/role/${!params.roleId ? 'save' : 'update'}`, params);
    return menus;
  } catch (error) {
    console.log("🚀 ~ file: account.ts:27 ~ getAccountMenus ~ error", error)
  }
}
