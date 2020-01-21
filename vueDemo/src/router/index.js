import Vue from 'vue'
import Router from 'vue-router'
import Login from "../views/Login";
import Register from "../views/Register";
import userList from "../views/userList";

Vue.use(Router)

export default new Router({
  routes: [

    {
      path:'/',
      name:'登录',
      component:Login
    },


  ]
})
