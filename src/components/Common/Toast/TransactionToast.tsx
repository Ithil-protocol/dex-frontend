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
      <Link target="_blank" href={`https://goerli.etherscan.io/tx/${hash}`}>
        Check on Etherscan!
      </Link>
    </p>
  );
};

export default TransactionToast;
