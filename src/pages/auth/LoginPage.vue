<template>
  <q-form @submit.prevent="onSubmit()">
    <div class="auth_header_part">
      <div class="user_account_header">
        <h3 class="title">{{ $q.lang.authentication.signIn.title }}</h3>
        <slot name="subTitle" />
        <p class="small_title">{{ $q.lang.authentication.signIn.subtitle1 }}</p>
      </div>
    </div>
    <div class="q-pa-md login_form">
      <div class="q-mb-md">
        <q-input
          label-color="required"
          outlined
          hide-bottom-space
          v-model="email"
          :label="$q.lang.authentication.signIn.email.label"
          :placeholder="$q.lang.authentication.signIn.email.placeHolder"
          :dense="dense"
          :rules="[(val) => required(val, 'email'), (val) => isEmail(val)]"
        />
      </div>
      <div class="q-mb-md">
        <q-input
          label-color="required"
          outlined
          hide-bottom-space
          v-model="password"
          :label="$q.lang.authentication.signIn.password.label"
          :placeholder="$q.lang.authentication.signIn.password.placeHolder"
          :dense="dense"
          :type="isPwd ? 'password' : 'text'"
          :rules="[(val) => required(val, 'password')]"
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
      <div class="q-mb-md android-forgot">
        <!-- <router-link :to="{ name: 'forgot-password' }">  -->
        <b class="text-dark">{{
          $q.lang.authentication.signIn.forgotPassword
        }}</b>
        <!-- </router-link> -->
      </div>
      <q-btn
        color="primary"
        :label="$q.lang.authentication.signIn.btn1"
        type="submit"
        class="social_login_btn"
      />
      <div class="text-center">
        <p class="login-bottom-text android-forgot">
          {{ $q.lang.authentication.signIn.subtitle3 }}
          <router-link :to="{ name: 'sign-up' }">
            {{ $q.lang.authentication.signIn.subtitle4 }}
          </router-link>
        </p>
      </div>
    </div>
  </q-form>
</template>
<script setup>
import { Loading, QSpinnerHourglass } from "quasar";
import notification from "src/boot/notification";
import { useAuthStore } from "src/stores/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
const store = useAuthStore();
const router = useRouter();
const isPwd = ref(true);
const email = ref("");
const password = ref("");

function onSubmit() {
  Loading.show({
    spinner: QSpinnerHourglass,
    message: "Loading...",
  });
  const data = {
    email: email.value,
    password: password.value,
  };
  store
    .signIn(data)
    .then((res) => {
      if (res.success) {
        router.push({ name: "notes" });
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
@import "src/css/login.scss";
// $
</style>
