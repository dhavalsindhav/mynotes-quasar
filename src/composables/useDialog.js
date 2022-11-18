// mouse.js
import { ref } from "vue";

// by convention, composable function names start with "use"
export default function useDialog() {
  const allpopup = ref(false);
  const currentFrom = ref(null);
  const currentField = ref(null);
  const sendValue = ref(null);
  const sendDisplayField = ref(null);
  const dialogClass = ref(null);
  const sendOptions = ref(null);

  const open = (ele, val, fieldName, displayField, options = []) => {
    allpopup.value = true;
    currentFrom.value = ele;
    currentField.value = fieldName;
    sendValue.value = val;
    sendDisplayField.value = displayField;
    sendOptions.value = options;

    if (

      ele == "city-selector" ||
      ele == "user-option"

    ) {
      dialogClass.value = "full-popup add-ing";
    } else if (
      ele == "cropper-dialog"
    ) {
      dialogClass.value = "center-popup";
    } else {
      dialogClass.value = "";
    }
  };

  return {
    allpopup,
    currentFrom,
    currentField,
    sendValue,
    sendDisplayField,
    dialogClass,
    sendOptions,
    open,
  };
}
