import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, TextField } from "@mui/material";
import TransactionToast from "components/Common/Toast/TransactionToast";
import { factorySchema } from "data/forms";
import {
  useFactoryCreatePool,
  useFactoryPools,
  usePrepareFactoryCreatePool,
} from "hooks/contracts/factory";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FactoryInputs } from "types";
import { useWaitForTransaction } from "wagmi";

interface Props {}

const Factory: React.FC<Props> = () => {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    getValues,
  } = useForm<FactoryInputs>({
    resolver: yupResolver(factorySchema),
  });
  const { data } = useFactoryPools({
    address: "0x72bee262c65e0f99dbab4467caecf3d1ed119640",
    args: [
      getValues("underlyingAddress") as `0x${string}`,
      getValues("accountingAddress") as `0x${string}`,
    ],
    cacheTime: 0,
    watch: true,
  });
  const { config } = usePrepareFactoryCreatePool({
    address: "0x72bee262c65e0f99dbab4467caecf3d1ed119640",
    args: [
      getValues("underlyingAddress") as `0x${string}`,
      getValues("accountingAddress") as `0x${string}`,
      1,
    ],
  });
  const { data: writeData, write } = useFactoryCreatePool({
    ...config,
  });
  const { data: waitedData } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: (data) => {
      toast.success(
        <TransactionToast
          text="Pool generated successfully"
          hash={data.transactionHash}
        />
      );
    },
  });
  console.log("create", waitedData);

  const handleFormSubmit = (e) => {
    console.log(e);
  };

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
