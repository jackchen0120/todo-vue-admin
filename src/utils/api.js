import network from './network';
// import qs from 'qs';

// 登录
export function login(data) {
  return network({
    url: `/login`,
    method: "post",
    data
  });
}

// 注册
export function register(data) {
  return network({
    url: `/register`,
    method: "post",
    data
  })
}

// 密码重置
export function resetPwd(data) {
  return network({
    url: `/resetPwd`,
    method: "post",
    data
  })
}


// export function deviceList(args, projectKey) {
//   let data = qs.stringify({
//     args, 
//     projectKey
//   })

//   return network({
//     url: `/xbaasstudio/aerial-op-car-cc/car/queryListWithPagination`,
//     method: "post",
//     headers: {
//         "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
//     },
//     data: data
//   });
// }


// export function queryById(args, projectKey) {
//   let data = qs.stringify({
//     args, 
//     projectKey
//   })

//   return network({
//     url: `/xbaasstudio/aerial-op-car-cc/queryById`,
//     method: "post",
//     data: data
//   });
// }