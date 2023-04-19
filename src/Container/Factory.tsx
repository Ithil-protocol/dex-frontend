import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress, Input, TextField } from "@mui/material";
import { factorySchema } from "data/forms";
import { useFactoryPools } from "hooks/contracts/factory";
import { useForm } from "react-hook-form";
import { FactoryInputs } from "types";

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
    address: "0xCC1ec8857882feF6637bcB6a4344c51aF2807822",
    args: [
      getValues("underlyingAddress") as `0x${string}`,
      getValues("accountingAddress") as `0x${string}`,
    ],
  });
  console.log(getValues("accountingAddress"));

  const handleFormSubmit = (data) => {
    console.log(data);
    // if (approve) {
    //   approve();
    //   return;
    // }
    // write?.();
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
          <Input sx={{ width: 520 }} color="secondary" readOnly value={data} />
        </div>
      </form>
    </Box>
  );
};

export default Factory;
