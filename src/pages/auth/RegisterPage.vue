<template>
  <q-form
    @submit.prevent="onSubmit"
    @reset="onReset"
    autocorrect="off"
    autocapitalize="off"
    autocomplete="off"
    spellcheck="false"
  >
    <div class="auth_header_part">
      <div class="user_account_header">
        <h3 class="title">{{ $q.lang.authentication.signUp.title }}</h3>
        <slot name="subTitle" />
        <p class="small_title">{{ $q.lang.authentication.signUp.subtitle1 }}</p>
      </div>
    </div>

    <div class="q-pa-md login_form">
      <div class="q-mb-md">
        <q-input
          outlined
          label-color="required"
          v-model="username"
          :label="$q.lang.authentication.signUp.username.label"
          :placeholder="$q.lang.authentication.signUp.username.placeHolder"
          class=""
          :dense="dense"
          debounce="500"
          hide-bottom-space
          :rules="[
            (val) => required(val, 'User Name'),
            (val) => min(val, 3, 'User Name'),
          ]"
        />
      </div>
      <div class="q-mb-md">
        <q-input
          outlined
          label-color="required"
          v-model="email"
          :label="$q.lang.authentication.signUp.email.label"
          :placeholder="$q.lang.authentication.signUp.email.placeHolder"
          class=""
          hide-bottom-space
          :dense="dense"
          debounce="500"
          :rules="[(val) => required(val, 'email'), (val) => isEmail(val)]"
        />
      </div>
      <div class="q-mb-md">
        <q-input
          outlined
          label-color="required"
          hide-bottom-space
          v-model="password"
          :label="$q.lang.authentication.signUp.password.label"
          :placeholder="$q.lang.authentication.signUp.password.placeHolder"
          :dense="dense"
          debounce="500"
          :type="isPwd ? 'password' : 'text'"
          :rules="[
            (val) => required(val, 'password'),
            (val) => validatePassword(val),
            (val) => min(val, 8, 'password'),
          ]"
        >
          <template v-slot:append>
            <div>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                @click="isPwd = !isPwd"
              />
            </div>
          </template>
        </q-input>
      </div>

      <div class="q-mb-md">
        <q-input
          outlined
          label-color="required"
          hide-bottom-space
          v-model="c_password"
          :label="$q.lang.authentication.signUp.confirm_password.label"
          :placeholder="
            $q.lang.authentication.signUp.confirm_password.placeHolder
          "
          :type="isPwd1 ? 'password' : 'text'"
          :dense="dense"
          debounce="500"
          :rules="[
            (val) => required(val, 'confirm password'),
            (val) => validateConfirmPassword(val),
            (val) => min(val, 8, 'confirm password'),
          ]"
        >
          <template v-slot:append>
            <div>
              <q-icon
                :name="isPwd1 ? 'visibility_off' : 'visibility'"
                @click="isPwd1 = !isPwd1"
              />
            </div>
          </template>
        </q-input>
      </div>
      <q-btn
        color="primary"
        :label="$q.lang.authentication.signUp.btn1"
        type="submit"
        class="social_login_btn"
        :loading="submitting"
      />
      <div class="text-center">
        <p class="login-bottom-text android">
          {{ $q.lang.authentication.signUp.subtitle4 }}
          <router-link :to="{ name: 'sign-in' }">{{
            $q.lang.authentication.signUp.subtitle5
          }}</router-link>
        </p>
      </div>
    </div>
  </q-form>
</template>

<script setup>
import { QSpinnerHourglass, Loading } from "quasar";
import notification from "src/boot/notification";
import { useAuthStore } from "src/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
const store = useAuthStore();
const router = useRouter();
const submitting = ref(false);
const isPwd = ref(true);
const isPwd1 = ref(true);

const username = ref("");
const email = ref("");
const password = ref("");
const c_password = ref("");

function validateConfirmPassword() {
  if (password.value !== c_password.value) {
    return "Please Type Same Password";
  }
}

function onSubmit() {
  Loading.show({
    spinner: QSpinnerHourglass,
    message: "Loading...",
  });
  const data = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
  store
    .signUp(data)
    .then((res) => {
      submitting.value = false;
      if (res.success) {
        notification.success(res.message);
        router.push({ name: "sign-in" });
      }
    })
    .catch((err) => {
      if (err.response) {
        notification.error(err.response.data.message);
      }
    })
    .finally(() => {
      Loading.hide();
    });
}
</script>

<style lang="scss">
// $
@import "src/css/login.scss";
</style>
