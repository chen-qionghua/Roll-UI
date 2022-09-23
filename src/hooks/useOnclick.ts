import {
    ref,
  } from "vue";
export const useOnclick = ()=>{
    let visible = ref(false);
    const popoverRef = ref();
    const contentWrapperRef = ref();
    const triggerWrapperRef = ref();
    const onClickDocument = (e) => {
        if (
          popoverRef.value &&
          (popoverRef.value === e.target || popoverRef.value.contains(e.target))
        ) {
          return;
        }
        if (
          contentWrapperRef.value &&
          (contentWrapperRef.value === e.target ||
            contentWrapperRef.value.contains(e.target))
        ) {
          return;
        }
        close();
      };
      const open = () => {
        visible.value = true;
        // nextTick(() => {
        //   positionContent();
        //   document.addEventListener("click", onClickDocument);
        // });
      };
      const close = () => {
        visible.value = false;
        document.removeEventListener("click", onClickDocument);
      };
      const onClick = (e) => {
        if (triggerWrapperRef.value.contains(e.target)) {
          if (visible.value === true) {
            close();
          } else {
            open();
          }
        }
      };
      return {
        visible,
        popoverRef,
        contentWrapperRef,
        triggerWrapperRef,
        onClickDocument,
        open,
        close,
        onClick,
      }
}