import { boot } from "quasar/wrappers";
import { LocalStorage } from "quasar";

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    if (
      to.matched.some((record) => record.meta.requiresAuth) &&
      !LocalStorage.getItem("access_token")
    ) {
      if (to.name == 'sign-in' && from.name == 'sign-in') {
        console.log('Already in sign in');
      } else {
        // Notify.error("You must be logged in to view this page.");
        return next({
          name: "sign-in",
        });
      }
      console.log("not authenticated");

    } else if (
      to.matched.some((record) => record.meta.requireGuest) &&
      LocalStorage.getItem("access_token")
    ) {
      return next({
        name: "notes",
      });
    } else {
      next();
    }
    // next();
  });
});
