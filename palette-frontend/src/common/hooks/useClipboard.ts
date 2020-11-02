import { ref, onMounted, onBeforeUnmount, Ref, watchEffect, isRef } from "vue";
import { clipboardRead } from "../utils";

export default function useClipboard(
    copyValue: Ref<string> | Record<string, any>,
    cb?: Function,
    key?: string
) {
    const clipData = ref("");
    const handleClipRead = async () => {
        clipData.value = await clipboardRead();
        cb && cb();
    };

    watchEffect(() => {
        if (isRef(copyValue)) {
            copyValue.value = clipData.value;
        } else {
            key && (copyValue[key] = clipData.value);
        }
    });

    onMounted(() => {
        window.addEventListener("focus", handleClipRead);
    });

    onBeforeUnmount(() => {
        window.removeEventListener("focus", handleClipRead);
    });

    return clipData;
}
