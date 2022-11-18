import { computed } from "vue";
import { useAuthStore } from "src/stores/auth";

export default function useProfile() {
  const store = useAuthStore();
  const userAvatar = computed(() => {
    return store.getProfilePhoto ?? 'default.png' // Add default user profile picture
  });

  return {
    userAvatar
  };
}
