<template>
  <q-page padding>
    <Container>
      <h3 v-if="noteId">Update Note</h3>
      <h3 v-else>Create Note</h3>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input class="q-mt-sm" outlined v-model="note.title" label="Title" />

        <q-input
          class="q-mt-sm"
          outlined
          v-model="note.description"
          label="Description"
          dense
        />

        <q-card flat bordered class="q-mt-sm">
          <q-editor v-model="note.content" min-height="5rem" />
        </q-card>

        <div class="q-mt-md">
          <q-btn color="grey" to="/" type="reset">Cancel</q-btn>
          <q-btn class="q-ml-sm" color="positive" type="submit"> Create </q-btn>
        </div>
      </q-form>
    </Container>
  </q-page>
</template>

<script setup>
import { Loading, QSpinnerHourglass } from "quasar";
import notification from "src/boot/notification";
import { useNoteStore } from "src/stores/note";
import { computed, defineAsyncComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const Container = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: "Container" */
    /* webpackMode: "lazy" */
    /* webpackInclude: /\.vue$/ */ "src/components/ContainerView.vue"
  )
);
const store = useNoteStore();
const router = useRouter();
const route = useRoute();
const noteId = computed(() => route.params.slug);
const note = ref({
  title: "",
  description: "",
  content: "",
});
const notes = computed(() => {
  return store.getNotes;
});

notes.value.forEach((element) => {
  if (noteId.value) {
    if (element._id == noteId.value) {
      note.value.title = element.title;
      note.value.description = element.description;
      note.value.content = element.content;
    }
  }
});

function onSubmit() {
  Loading.show({
    spinner: QSpinnerHourglass,
    message: "Loading...",
  });
  if (noteId.value) {
    store
      .editNote(note.value, noteId.value)
      .then((res) => {
        if (res.success) {
          notification.success(res.message);
          router.push({ name: "notes" });
        }
      })
      .catch((err) => {
        if (err.response) {
          notification.error(err.response.data.message);
        }
      })
      .finally(() => {
        note.value.title = "";
        note.value.description = "";
        note.value.content = "";
        Loading.hide();
      });
  } else {
    store
      .setNote(note.value)
      .then((res) => {
        if (res.success) {
          notification.success(res.message);
          router.push({ name: "notes" });
        }
      })
      .catch((err) => {
        if (err.response) {
          notification.error(err.response.data.message);
        }
      })
      .finally(() => {
        note.value.title = "";
        note.value.description = "";
        note.value.content = "";
        Loading.hide();
      });
  }
}
</script>

<style lang="scss" scoped>
// $
</style>
