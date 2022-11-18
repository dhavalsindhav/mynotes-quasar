<template>
  <q-page padding>
    <Container>
      <div>
        <div class="row items-center justify-between">
          <h3 class="q-mb-md q-mt-md">{{ note.title }}</h3>
          <div>
            <q-btn
              round
              color="secondary"
              icon="edit"
              :to="{ name: 'edit-note', params: { slug: note._id } }"
            />
            <q-btn
              class="q-ml-sm"
              round
              color="red"
              icon="delete"
              @click="deleteNote(note._id)"
            />
          </div>
        </div>
        <div>{{ note.description }}</div>
        <div class="q-mt-md" v-html="note.content" />
      </div>
    </Container>
  </q-page>
</template>

<script setup>
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
const route = useRoute();
const router = useRouter();
const notes = computed(() => {
  return store.getNotes;
});

const noteId = computed(() => route.params.slug);
const note = computed(() => {
  let n = [];
  notes.value.forEach((element) => {
    if (element._id == noteId.value) {
      n = element;
    }
  });
  return n;
});
function deleteNote(id) {
  store.deleteNote(id).then((res) => {
    notification.success(res.message);
    router.push({ name: "notes" });
  });
}
const remove = () => {
  notes.value.splice(noteId.value, 1);
  router.push("/");
};
</script>

<style lang="scss" scoped>
// $
</style>
