import axios from "axios";
import Vuecookies from "vue-cookies";
import store from "@/store"

// 요청 인터셉터 추가
axios.interceptors.request.use(
  function (config) {
    
    const token = Vuecookies.get('accessToken');
    console.log("요청 token ===> " + token);

    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // axios config에 withCredentials: true 옵션을 추가한다. 쿠키를 같이전송
    config = {...config, withCredentials: true}
    return config;
  },
  function (err) {
  	// 오류를 리턴 해주기 전에 수행할 로직
    
    config = {...config, withCredentials: true}

    return Promise.reject(err);
  });

// 응답 인터셉터 추가
axios.interceptors.response.use(
  function (response) {
    // 응답 이후 수행할 로직 ex) 데이터 가공 등
    // ...
    // console.log("통신성공" + Vuecookies.get('accessToken'));
    // console.log(response);
    return response;
  },
  async (err) => {
    const {
      config,
      response: { status },
    } = err;
    
    console.log(config);

    if(status === 401) {
      // console.log(err.response.data.message);
      if(err.response.data.message === 'Expired JWT token.') {
        axios.post('http://localhost:8081/api/v1/auth/refresh')
        .then(res => {
          console.log(res);
          // console.log("새로 발급받은 토큰 " + res.data.body.token);
          store.commit('user/loginToken', res.data.body.token)
          // location.reload()
          // return axios(config); //기존의 요청 다시보냄
        })
      }
    }

    return Promise.reject(err);
  });

  export default axios;