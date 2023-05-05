import { Box, Typography } from "@mui/material";
import styles from "@/styles/home.module.scss";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <ConnectButton />
      <Typography>This is unaudited software, use at your own risk!</Typography>
    </div>
  );
};

export default Home;
