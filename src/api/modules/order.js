import axios from 'axios'
// �����б�
let list = (data) => axios.get('/api/admin/order/list',{params:data});

export default{
	list,
}
