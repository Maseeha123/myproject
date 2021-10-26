import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(() => {
  })
}
const routes = [
  {
    path: '*',
    name: 'home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/home',
    name: 'dashboard',
    component: () => import('../views/home.vue'),
    meta: { authorizedUser: true }
  },
  {
    path: '/employee',
    component: () => import('../views/employee/action.vue'),
    children: [
      {
        path: 'add/:id?',
        name: 'add',
        component: () => import('../views/employee/add.vue'),
        meta: { authorizedUser: true }
      },
      {
        path: ':id',
        name: 'addId',
        component: () => import('../views/employee/add.vue'),
        meta: { authorizedUser: true }
      },
      {
        path: '/',
        component: () => import('../views/employee/employee.vue'),
        meta: { authorizedUser: true }
      }
    ],
    meta: { authorizedUser: true },
    beforeEnter: (to, from, next) => {
      const details = VueCookies.get('employee')
      if (details.admin) {
        next()
      } else {
        next('/home')
      }
    }
  },
  {
    path: '/project',
    component: () => import('../views/project/action.vue'),
    children: [
      {
        path: 'new/:id?',
        name: 'new',
        component: () => import('../views/project/new.vue'),
        meta: { authorizedUser: true }
      },
      {
        path: '/',
        component: () => import('../views/project/project.vue'),
        meta: { authorizedUser: true }
      },
      {
        path: ':id?/task',
        name: 'viewTask',
        component: () => import('../views/project/task.vue'),
        meta: { authorizedUser: true }
      },
      {
        path: ':id?/add',
        name: 'task',
        component: () => import('../views/project/add.vue'),
        meta: { authorizedUser: true }
      }
    ],
    meta: { authorizedUser: true }
  },
  {
    path: '/hours',
    component: () => import('../views/hours/action.vue'),
    children: [
      {
        path: 'add/:id?',
        component: () => import('../views/hours/add.vue'),
        meta: { authorizedUser: true }
      },
      {
        path: '/',
        component: () => import('../views/hours/hours.vue'),
        meta: { authorizedUser: true }
      }
    ],
    meta: { authorizedUser: true },
    beforeEnter: (to, from, next) => {
      const details = VueCookies.get('employee')
      if (details.admin) {
        next()
      } else {
        next('/home')
      }
    }
  },
  {
    path: '/members/:id?',
    name: 'members',
    component: () => import('../views/members.vue'),
    meta: { authorizedUser: true }
  },
  {
    path: '/activity/:id?',
    name: 'activity',
    component: () => import('../views/activity.vue'),
    meta: { authorizedUser: true }
  },
  {
    path: '/calender/:id?',
    name: 'calender',
    component: () => import('../views/calender.vue'),
    meta: { authorizedUser: true }
  },
  {
    path: '/hour/:id?',
    name: 'Hour',
    component: () => import('../views/hour.vue'),
    meta: { authorizedUser: true }
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue'),
    meta: {
      hideNavbar: true,
      authorizedUser: false
    }
  },
  {
    path: '/viewProfile',
    component: () => import('../views/router.vue'),
    children: [
      {
        path: '/',
        component: () => import('../views/viewProfile.vue'),
        meta: { authorizedUser: true }
      },
      {
        path: ':id?',
        component: () => import('../views/employee/add.vue'),
        meta: { authorizedUser: true }
      }
    ]
  },
  {
    path: '/list/:id?',
    component: () => import('../views/list.vue'),
    meta: { authorizedUser: true }
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const checkValue = VueCookies.get('employee')
  if (to.meta.authorizedUser && !checkValue) {
    next({ name: 'login' })
  } else if (!to.meta.authorizedUser && checkValue) {
    next('/home')
  } else {
    next()
  }
})
export default router
