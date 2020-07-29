import axios from 'axios';
// 获取所有省份
let  province = (data) => axios.get('/api/pcct/city',{params:data})

export default{
	province,
}