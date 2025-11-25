import styles from "./Tag.module.css";

type TagProps = {
  style: "primary" | "secondary";
  text: string;
}

export default function Tag({ style = "primary", text }: TagProps) {
  return (
    <span className={`${styles.tag} ${styles[style]}`}>{text}</span>
  );
}
