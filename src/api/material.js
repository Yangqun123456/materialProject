import request from '@/utils/request'
import { formatDate } from '@/utils/dateFormat'

export const materialgetAllNumberData = () => { return request.get('/api/getAllMaterialNumberData') }
// export const materialAddService = () => request.post('/api/addMaterial')
// 管理：修改指定杠铃id值
export const materialEditIdService = (data) => {
    const params = new URLSearchParams()
    params.append('new_material_id', data.new_material_id)
    params.append('material_id', data.material_id)
    return request.post('/api/updateMaterialId', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
// 管理：删除指定Id杠铃记录信息
export const materialDeleteService = (material_id) => {
    const params = new URLSearchParams()
    params.append('material_id', material_id)
    return request.post('/api/deleteMaterialId', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 数据：获取所有杠铃记录信息 parmas: {pagenum: 1, pagesize: 10, materialId: '001', username: 'admin'}
export const materialgetAllDataService = (paramsData) => {
    return request.get('/api/getAllMaterialData', {
        params: paramsData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 数据: 删除指定记录id的杠铃记录信息
export const materialDeleteDataService = (id) => {
    const params = new URLSearchParams()
    params.append('id', id)
    return request.post('/api/deleteMaterialData', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 数据：新增杠铃记录信息
export const materialAddDataService = (data) => {
    const params = new URLSearchParams()
    params.append('material_id', data.material_id)
    params.append('Q_number', data.Q_number)
    params.append('wu_1', data.wu_1)
    params.append('wu_2', data.wu_2)
    params.append('shang_1', data.shang_1)
    params.append('shang_2', data.shang_2)
    params.append('xia_1', data.xia_1)
    params.append('xia_2', data.xia_2)
    params.append('username', data.username)
    params.append('material_date', formatDate(data.material_date))
    params.append('height1',data.height1)
    params.append('height2',data.height2)
    params.append('height3',data.height3)
    params.append('height4',data.height4)
    params.append('height5',data.height5)
    params.append('height6',data.height6)
    params.append('height7',data.height7)
    params.append('height8',data.height8)
    params.append('small1',data.small1)
    params.append('small2',data.small2)
    params.append('small3',data.small3)
    params.append('small4',data.small4)
    params.append('big1',data.big1)
    params.append('big2',data.big2)
    params.append('big3',data.big3)
    params.append('big4',data.big4)
    params.append('input_name',data.input_name)
    params.append('input_date',formatDate(data.input_date))
    return request.post('/api/submitAll', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 数据：修改指定id杠铃记录信息
export const materialEditDataService = (data) => {
    const params = new URLSearchParams()
    params.append('id', data.id)
    params.append('material_id', data.material_id)
    params.append('Q_number', data.Q_number)
    params.append('wu_1', data.wu_1)
    params.append('wu_2', data.wu_2)
    params.append('shang_1', data.shang_1)
    params.append('shang_2', data.shang_2)
    params.append('xia_1', data.xia_1)
    params.append('xia_2', data.xia_2)
    // 检查 data.material_date 的类型
    if (typeof data.material_date === 'string') {
        params.append('material_date', data.material_date)
    } else {
        params.append('material_date', formatDate(data.material_date))
    }
    params.append('username', data.username)
    params.append('height1',data.height1)
    params.append('height2',data.height2)
    params.append('height3',data.height3)
    params.append('height4',data.height4)
    params.append('height5',data.height5)
    params.append('height6',data.height6)
    params.append('height7',data.height7)
    params.append('height8',data.height8)
    params.append('small1',data.small1)
    params.append('small2',data.small2)
    params.append('small3',data.small3)
    params.append('small4',data.small4)
    params.append('big1',data.big1)
    params.append('big2',data.big2)
    params.append('big3',data.big3)
    params.append('big4',data.big4)
    // 检查 data.input_date 的类型
    if (typeof data.input_date === 'string') {
        params.append('input_date', data.input_date)
    } else {
        params.append('input_date', formatDate(data.input_date))
    }
    params.append('input_name',data.input_name)
    return request.post('/api/updateMaterialData', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

