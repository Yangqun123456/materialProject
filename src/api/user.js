import request from '@/utils/request'

// 注册
export const userRegisterService = ({ username, password, identity }) => {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)
    params.append('identity', identity)
    return request.post('/api/register', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
// 登录
export const userLoginService = ({ username, password }) => {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)
    return request.post('/api/login', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
// 获取用户信息
export const userGetInfoService = (username) => request.get(`/my/getUserInfo?username=${username}`)
// 更新用户昵称和邮箱
export const userUpdateInfoService = ({ id, nickname, email }) => {
    const params = new URLSearchParams()
    params.append('id', id)
    params.append('nickname', nickname)
    params.append('email', email)
    return request.post('/my/updateUserInfo', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
// 重置用户密码
export const userUpdatePassService = ({ id, old_pwd, new_pwd }) => {
    const params = new URLSearchParams()
    params.append('id', id)
    params.append('old_pwd', old_pwd)
    params.append('new_pwd', new_pwd)
    return request.post('/my/updateUserPassword', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}
// 上传用户头像
export const userUploadAvatarService = (id, avatar) => {
    const params = new URLSearchParams()
    params.append('id', id)
    params.append('avatar', avatar)
    return request.patch('/my/updateAvatar', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// 数据：获取所有用户的用户名
export const usergetAllUserName = () => request.get('/my/getAllUsername')
