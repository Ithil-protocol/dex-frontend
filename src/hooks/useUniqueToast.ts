import useToastStore from "@/store";

export const useUniqueToast = () => {
  const [toastIds, updateToastIds] = useToastStore((state) => [
    state.toastIds,
    state.updateToastIds,
  ]);

  return (id: string) => {
    const isExist = toastIds.includes(id);
    if (!isExist) {
      updateToastIds(id);
    }
    return !isExist;
  };
};
