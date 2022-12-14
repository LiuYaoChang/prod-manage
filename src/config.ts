/**
 * 应用配置
 */

const CONFIG_BASE = {
	// html的tite
	htmlTitle: 'Admin - {title}'
}

// 开发配置
const CONFIG_DEV = {
	domain: 'http://localhost:5173'
}

// 测试配置
const CONFIG_TEST = {
	domain: 'http://localhost:5173'
}

// 生产配置
const CONFIG_PRO = {
	domain: 'https://localhost:5173'
}

const ENV_CONFIG_MAP = {
	development: CONFIG_DEV,
	test: CONFIG_TEST,
	production: CONFIG_PRO
}

export default { ...CONFIG_BASE, ...ENV_CONFIG_MAP['development'] }
