import axios from "axios";

export function request(config) {
  //  1.配置基本信息   （创建实例， 这样不是全局的）
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })
  // 2.axios 拦截器
  // 2.1请求拦截的作用： 
  instance.interceptors.request.use(config => {
    // 1. 比如config中的一些信息不符合服务器的要求  
    // 2. 比如每次发送网络请求时，都希望在页面中显示一个请求的图标
    // 3. 某些网络请求（比如登录需要的（token），必须携带一些特殊的信息）
    // console.log(config);
    // 拦截后 要发出去  要不就收不到
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    return res.data // 真正有用的东西是 data中的数据
  }, err => {
    // console.log(err);
  })

  //  本身返回的就一个 Promise   不需要再次封装一个 Promise来使用
  // 3.发送真正的网络请求
  return instance(config)
}
