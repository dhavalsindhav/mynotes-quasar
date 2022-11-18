import { defineStore } from "pinia";
import api from "src/apis/index"; // Custom middle api js to handle all api requests and custom
import notification from "src/boot/notification";
import { LocalStorage } from "quasar";
import { useRouter } from "vue-router";
import { NOTE } from "src/apis/constant";
export const useNoteStore = defineStore("note", {
  state: () => ({
    notes: LocalStorage.getItem("notes") || ""
  }),
  getters: {
    getNotes() {
      return this.notes;
    },
  },
  actions: {
    async fetchNotes() {
      return new Promise((resolve, reject) => {
        api
          .get(NOTE.LIST)
          .then((res) => {
            if (res.success) {
              this.notes = res.notes;
              LocalStorage.set("notes", this.notes);
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
    async setNote(data) {
      return new Promise((resolve, reject) => {
        api
          .post(NOTE.SAVE, data)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async editNote(data, id) {
      return new Promise((resolve, reject) => {
        api
          .put(api.resolveApiUrl(NOTE.UPDATE, { id: id }), data)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async deleteNote(id) {
      return new Promise((resolve, reject) => {
        api
          .delete(api.resolveApiUrl(NOTE.DELETE, { id: id }))
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

  },
});
