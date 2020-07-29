import axios from 'axios'
// ¶©µ¥ÁĞ±í
let list = (data) => axios.get('/api/admin/order/list',{params:data});

export default{
	list,
}
