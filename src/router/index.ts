import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import Nprogress from 'nprogress'
import "nprogress/nprogress.css";

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.firstInit = false;

router.beforeEach(async (to, from, next) => {
  Nprogress.start();
  if (to.meta.title) document.title = to.meta.title as string;
  try {
    // let TOKEN = true
    // if (!TOKEN && to.name !== "AccountLogin") {
    //   next({ name: "AccountLogin", replace: true });
    //   return;
    // }
    // if (TOKEN && to.name === "AccountLogin") {
    //   next({ name: "Home", replace: true });
    //   return;
    // }
    // if (!router.firstInit && TOKEN) {
    //   console.log('hi coming')
    // }
    next();
  } catch(err) {
    console.log(err)
    next();
  }
});

router.afterEach(() => {
  Nprogress.done();
});


export default router
