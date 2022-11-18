<template>
  <q-page padding>
    <Container>
      <div class="row items-center justify-between">
        <h3>Your notes</h3>
        <div>
          <q-btn
            round
            color="positive"
            icon="add"
            :to="{ name: 'create-note' }"
          ></q-btn>
        </div>
      </div>

      <NoteCard
        v-for="item in notes"
        :key="item"
        :title="item.title"
        :description="item.description"
        @click="getDetails(item._id)"
      />

      <div v-if="notes.length === 0">You have not created any notes.</div>
    </Container>
  </q-page>
</template>

<script setup>
import { Loading, QSpinnerHourglass } from "quasar";
import { useNoteStore } from "src/stores/note";

import { computed, defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";
const Container = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: "Container" */
    /* webpackMode: "lazy" */
    /* webpackInclude: /\.vue$/ */ "src/components/ContainerView.vue"
  )
);
const NoteCard = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: "Container" */
    /* webpackMode: "lazy" */
    /* webpackInclude: /\.vue$/ */ "src/components/NoteCard.vue"
  )
);
const router = useRouter();
const store = useNoteStore();
Loading.show({
  spinner: QSpinnerHourglass,
  message: "Loading...",
});
store.fetchNotes().then((res) => {
  if (res.success) {
    Loading.hide();
  }
});
const notes = computed(() => {
  return store.getNotes;
});
function getDetails(id) {
  router.push({ name: "note-details", params: { slug: id } });
}
</script>
