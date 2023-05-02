import LabelChip from "./LabelChip";
import styles from "./LimitConfirmation.module.scss";
import { Skeleton } from "@mui/material";

interface RowContainerProps {
  isLoading: boolean;
  children: React.ReactNode;
  title: string;
  label?: string;
}

const RowContainer: React.FC<RowContainerProps> = ({
  isLoading,
  children,
  title,
  label,
}) => {
  return (
    <div className={styles.row}>
      <span>{title}</span>
      {isLoading ? (
        <Skeleton height={20} />
      ) : (
        <span>
          {children} {label && <LabelChip label={label} />}
        </span>
      )}
    </div>
  );
};

export default RowContainer;
