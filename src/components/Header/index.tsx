import styles from "./index.module.css";
import logo from "../../assets/todo.png";

function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Uma logo" />
    </header>
  );
}

export default Header;
