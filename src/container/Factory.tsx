import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, TextField } from "@mui/material";
import { factoryAddress } from "@/config/factory";
import TransactionToast from "@/components/Common/Toast/TransactionToast";
import { factorySchema } from "@/data/forms";
import {
  useFactoryCreatePool,
  useFactoryPools,
  usePrepareFactoryCreatePool,
} from "@/hooks/contracts/factory";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Address0x, FactoryInputs } from "@/types";
import { useWaitForTransaction } from "wagmi";

const Factory = () => {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    getValues,
  } = useForm<FactoryInputs>({
    resolver: yupResolver(factorySchema),
  });
  const { data } = useFactoryPools({
    address: factoryAddress,
    args: [
      getValues("underlyingAddress") as Address0x,
      getValues("accountingAddress") as Address0x,
      Number(getValues("tick")),
    ],
    cacheTime: 0,
    watch: true,
  });
  const { config } = usePrepareFactoryCreatePool({
    address: factoryAddress,
    args: [
      getValues("underlyingAddress") as Address0x,
      getValues("accountingAddress") as Address0x,
      Number(getValues("tick")),
    ],
  });
  const { data: writeData, write } = useFactoryCreatePool({
    ...config,
  });

  useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: (data) => {
      toast.success(
        <TransactionToast
          text="Pool generated successfully"
          hash={data.transactionHash}
        />,
        { toastId: data.transactionHash }
      );
    },
  });

  const handleFormSubmit = () => undefined;

  return (
    <Box
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      gap={10}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: 520 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            padding: "5px",
          }}
        >
          <TextField
            color="secondary"
            {...register("underlyingAddress")}
            label="underlying address"
          />
          <TextField
            color="secondary"
            {...register("accountingAddress")}
            label="accounting address"
          />
          <TextField
            type="number"
            color="secondary"
            {...register("tick")}
            label="tick"
          />

          <LoadingButton
            variant="contained"
            endIcon={
              isSubmitting && <CircularProgress size={22} color="inherit" />
            }
            loading={isSubmitting}
            fullWidth
            sx={{
              textTransform: "none",
              width: "100%",
            }}
            type="submit"
          >
            Get
          </LoadingButton>
          <LoadingButton
            variant="contained"
            endIcon={
              isSubmitting && <CircularProgress size={22} color="inherit" />
            }
            loading={isSubmitting}
            fullWidth
            sx={{
              textTransform: "none",
              width: "100%",
            }}
            type="submit"
            onClick={() => {
              write?.();
            }}
            disabled={!write}
          >
            Generate
          </LoadingButton>
          <TextField
            sx={{ width: 520 }}
            color="secondary"
            value={data ?? "Get pool address"}
            disabled={true}
          />
        </div>
      </form>
    </Box>
  );
};

export default Factory;
