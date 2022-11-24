import { MessageApi } from 'antd/lib/message'
import { Request } from '@/utils/request'

declare global {
	export const $message: MessageApi
	export const $request: Request
	export const VERSION = '1.0.0'
}
