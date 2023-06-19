import axios from "@/service/axios";
import Vuecookies from "vue-cookies";
import router from "@/router";

export const user = {
    namespaced: true, // user 가 모듈로 사용될수 있다는 코드(안쓰면 unknown 뜸)
    state: {
        accessToken: '',
        refreshToken: '',
        isAuthenticated: false
    },
    getter: {
        getIsAuthenticated: state => {state.isAuthenticated;}
    },
    mutations: {
        loginToken: (state,token) => {
            //console.log('state =>' + state);
            Vuecookies.set('accessToken', token);
            state.accessToken = token;
            state.isAuthenticated = true;
        },
        logoutToken: (state) => {
            Vuecookies.remove('accessToken'); // 쿠키에서 토큰 제거
            Vuecookies.remove('refreshToken'); // 쿠키에서 리프레쉬토큰 제거
            state.accessToken = '';
            state.refreshToken = '';
            state.isAuthenticated = false; // isAuthenticated 값 false로 변경
        }
    },
    actions: {
        login: ({commit}, params) => {
            return axios.post('http://localhost:8080/api/v1/auth/authenticate',params)
                .then(res => {
                    console.log(res.data.token);
                    commit('loginToken', res.data.token);
                    router.push('/board'); // 모듈애서는 this.$router 가 사용되지 않음, 인스턴스에서만 사용이 가능
                })
                .catch(err => {
                    console.log(err);
                });
        },

        register: ({commit}, params) => {
            return axios.post('http://localhost:8080/api/v1/auth/register',params)
                .then(res => {
                    console.log(res);
                    commit('loginToken', res.data.token);
                    router.push('/board');
                })
                .catch(err => {
                    console.log(err);
                });
        },

        test: ({commit}, params) => {
            return axios.post('http://localhost:8081/api/v1/auth/test',params)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        },
    }
}