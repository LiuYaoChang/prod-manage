import $request from '@/utils/request'
const getConstant = async () => $request.get('/baseTable')

export default {
	getConstant
}
