import Vue from 'vue'
import Router from 'vue-router'

import 'vant/lib/index.css';
import Welcome from '../components/Welcome'
import Index from '../components/pc/Index'
import Login from '../components/pc/Login'
import QuestionBank from '../components/pc/QuestionBank'
import QuestionsBace from '../components/pc/QuestionsBace'
import PIM from '../components/pc/PIM'
import OnlineTest from '../components/pc/OnlineTest'
import QueryTest from '../components/pc/QueryTest'
import mIndex from '../components/mobile/mIndex'
import mLogin from '../components/mobile/mLogin'
import mQuestionBank from '../components/mobile/mQuestionBank'
import mQuestionBace from '../components/mobile/mQuestionBace'
import mOnlineTestCatalog from '../components/mobile/mOnlineTestCatalog'
import mOnlineTest from '../components/mobile/mOnlineTest'
import mQueryTest from '../components/mobile/mQueryTest'
import mPIM from '../components/mobile/mPIM'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/pIndex',
      name: 'Index',
      component: Index
    },
    {
      path: '/pLogin',
      name: 'Login',
      component: Login
    },
    {
      path: '/pQuestionbank',
      name: 'QuestionBank',
      component: QuestionBank
    },
    {
      path: '/pQuestionsBace',
      name: 'QuestionsBace',
      component: QuestionsBace
    },
    {
      path: '/pPIM',
      name: 'PIM',
      component: PIM
    },
    {
      path: '/pOnlineTest',
      name: 'OnlineTest',
      component: OnlineTest
    },
    {
      path: '/pQueryTest',
      name: 'QueryTest',
      component: QueryTest
    },
    {
      path: '/mIndex',
      name: 'mIndex',
      component: mIndex
    },
    {
      path: '/mLogin',
      name: 'mLogin',
      component: mLogin
    },
    {
      path: '/mQuestionBank',
      name: 'mQuestionBank',
      component: mQuestionBank
    },
    {
      path: '/mQuestionBace',
      name: 'mQuestionBace',
      component: mQuestionBace
    },
    {
      path: '/mOnlineTestCatalog',
      name: 'mOnlineTestCatalog',
      component: mOnlineTestCatalog
    },
    {
      path: '/mOnlineTest',
      name: 'mOnlineTest',
      component: mOnlineTest
    },
    {
      path: '/mQueryTest',
      name: 'mQueryTest',
      component: mQueryTest
    },
    {
      path: '/mPIM',
      name: 'mPIM',
      component: mPIM
    },

  ]
})
