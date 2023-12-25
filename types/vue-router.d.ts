import { Router, NavigationGuard } from "vue-router";
declare module "vue-router" {
  interface Router {
    firstInit: boolean;
  }
}
