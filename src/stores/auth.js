import { defineStore } from "pinia";
import api from "src/apis/index"; // Custom middle api js to handle all api requests and custom
import notification from "src/boot/notification";
import { LocalStorage } from "quasar";
import { useRouter } from "vue-router";
import { USER } from "src/apis/constant";
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: LocalStorage.getItem("user") || "",
    accessToken: LocalStorage.getItem("access_token") || "",
  }),
  getters: {
    getUser() {
      return this.user;
    },
    isLoggedIn() {
      return !!this.accessToken;
    },
  },
  actions: {
    async signIn(data) {
      return new Promise((resolve, reject) => {
        api
          .post(USER.LOGIN, data)
          .then((res) => {
            if (res.success) {
              console.log(res);
              this.user = res.user;
              this.accessToken = res.token;
              LocalStorage.set("user", this.user);
              LocalStorage.set("access_token", this.accessToken);
            } else {
              notification.error(res.message);
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async signUp(data) {
      return new Promise((resolve, reject) => {
        api
          .post(USER.REGISTER, data)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async logout() {
      return new Promise((resolve, reject) => {
        api
          .post("/logout")
          .then((res) => {
            console.log(res);
            if (res.success) {
              this.user = null;
              this.accessToken = null;
              LocalStorage.remove("user");
              LocalStorage.remove("access_token");
              notification.success(res.message);
              const router = useRouter();
              location.reload();
            } else {
              notification.error(res.message);
            }
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
