import styles from "./logo.module.scss";

type logoProps = {
  size?: number;
  className?: string
};

export default function Logo({ size, className }: logoProps) {
  return (
    <h1
      className={`${styles.logo} ${className}`}
      style={size ? { fontSize: size } : { fontSize: 32 }}
    >
      Bruin <span>Connect.</span>
    </h1>
  );
}
