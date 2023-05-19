import useToastStore from "@/store";

export const useUniqueToast = () => {
  const toastIds = useToastStore((state) => state.toastIds);

  return (id: string) => {
    return toastIds.includes(id);
  };
};
