// 获取当前用户权限
export function getCurrentAuthority(list=[]){
    return list.length>0 ? list : ['admin']
}

// 权限校验
export function check(authority){
    const current = getCurrentAuthority()
    return current.some(item => authority.includes(item))
}

//权限通过在路由菜单中配置meta信息来区分

//校验是否登录
export function isLogin(){
    const current = getCurrentAuthority()
    return current && current[0] !== "guest"
}