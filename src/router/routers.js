import Main from '@/components/enterprise-main';
import Validate from '@/components/validate';
import Register from '@/views/common/register';
import CommonStep from '@/views/common/forget-password';
import resetPayPwdStep from '@/views/common/reset-pay-pwd';

export default [{
    path: '/',
    name: 'BasicInformation',
    meta: {
        title: 'Home - 主页',
        hideInMenu: true,
    },
    redirect: 'businessinfo/businessinfo'
},
    
    //登录
    {
        path: '/login',
        name: 'Login',
        meta: {
            title: 'Login - 登录',
            hideInMenu: true,
        },
        component: () => import('@/views/common/login/login.vue'),
    },
    //商户管理
    {
      path: '/mgt',
      component: Main,    
      children: [{
          path: '',
          name: 'PicManagement',
          meta: {
            title: '壁纸管理',
            icon: 'md-image',
            hideInMenu: false,
            notCache: true,
          },
          component: () => import('@/views/pic-management/index.vue'),
        },
      ],
    },
    //商户管理
    {
        path: '/complaint',
        component: Main,    
        children: [{
            path: '',
            name: 'ComplaintManagement',
            meta: {
            title: '投诉管理',
            icon: 'md-list-box',
            hideInMenu: false,
            notCache: true,
            },
            component: () => import('@/views/complaint-management/index.vue'),
        },
        ],
    },

    


]
