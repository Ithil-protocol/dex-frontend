import { Typography } from "@mui/material";
import styles from "@/styles/home.module.scss";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSignedIn } from "@/hooks/useSignedIn";
import Panel from "./Panel";

const Home: React.FC = () => {
  // const isSignedIn = useSignedIn();
  return (
    // <>
    //   {isSignedIn ? (
    <Panel />
    //   ) : (
    //     <div className={styles.container}>
    //       <ConnectButton />
    //       <Typography>
    //         This is unaudited software, use at your own risk!
    //       </Typography>
    //     </div>
    //   )}
    // </>
  );
};

export default Home;
