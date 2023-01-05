// 加载菜单
export const getMenuList = async () => {
  try {
    const menus = await $request.get('/sys/menu/list');
    console.log("🚀 ~ file: system.ts:5 ~ getMenuList ~ menus", menus)
    return menus;
  } catch (error) {
    console.log("🚀 ~ file: account.ts:27 ~ getAccountMenus ~ error", error)
  }
}
