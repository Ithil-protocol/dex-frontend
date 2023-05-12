import { etherscanBaseUrl } from "@/config/blockExplorer";
import { Link } from "@mui/material";

interface Props {
  text: string;
  hash: string;
}

const TransactionToast: React.FC<Props> = ({ text, hash }) => {
  return (
    <p>
      {text}
      <br />
      <Link target="_blank" href={etherscanBaseUrl + hash}>
        Check on Etherscan!
      </Link>
    </p>
  );
};

export default TransactionToast;
