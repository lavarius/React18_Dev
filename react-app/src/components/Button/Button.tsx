import styles from "./Button.module.css";

interface Props {
  children?: React.ReactNode;
  // color?: "primary" | "secondary" | "danger" | "success";
  onClick: () => void;
}
// const Button = ({ children, onClick, color = "primary" }: Props) => {
//   return (
//     <button
//       className={[styles.btn, styles["btn-" + color]].join(" ")}
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// };
const Button: React.FC<Props> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
