import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import deactives from './plugins/directives.js'
import App from './App.vue'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ElementUI)
Vue.use(deactives)
//路径
const routes=[{
    path:"/indexmusic",
    name:"Calendar",
    component(){
        return System.import("./views/Calendar/index.vue")
    }
}, {
        path: "/mymusic",
        name: "我的音乐",
        component() {
            return System.import("./views/mymusic/index.vue")
        }
    }, {
        path: "/radiomusic",
        name: "我的电台",
        component() {
            return System.import("./views/radiomusic/index.vue")
        }
    },{
        path:"*",
        redirect:"/indexmusic"
    }
]
//创建实例 
const router = new VueRouter({
    routes
});
const store=new Vuex.Store({
    state:{
        showType:null,
    //持久化数据
    morenshuju: [{
        start: "20180201",
        end: "201802014",
        title: "事件1",
        type: "life",
        id:1
        },
        {
            start: "20180206",
            end: "20180214",
            title: "事件2",
            type: "work",
            id: 2
        }, ,
        {
            start: "20180103",
            end: "20180106",
            title: "事件3",
            type: "work",
            id: 4
        }]
    },
    mutations:{
        ADD(state,payload){
            if (payload) { this.state.morenshuju.push(payload)}
            console.log(this.state.morenshuju)
            this.state.showType=null
        },
        SHOW(state,payload){
            this.state.showType=payload.showType
           if(payload.td){
               var str = payload.td.fullday.substr(0, 4) + "-" + payload.td.fullday.substr(4, 2) + "-" + payload.td.fullday.substr(6, 2)
               this.state.day = [str, str]
           }
        },
        PATCH(state,payload){
            this.state.showType=payload.showType
            this.changeId=payload.td.id
            console.log(this.changeId,222)
        }
    },
    getters:{
        life:(state)=>{
          var life=state.morenshuju.filter(item=>{
                return item.type=="life"
            })
            return life.length
        },
        work:(state)=>{
          var life=state.morenshuju.filter(item=>{
                return item.type=="work"
            })
            return life.length
        }
    }
 
}) 
new Vue({
    el:"#app",
    store,
    router,
    render:h=>h(App)
})