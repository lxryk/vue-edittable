const router = new VueRouter({
    routes :[
        { path: '/', component: Index },
        {path:'/add',component:Add},
        {path:'/edit/:id',component:edit}
    ]
})