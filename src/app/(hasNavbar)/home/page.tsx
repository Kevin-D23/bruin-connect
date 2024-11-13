import styles from "./home.module.scss";

export default function Home() {
  return (
    <section className={styles.home}>
      <div className={styles.container}>
        <div
          className={styles.profileContainer}
        ></div>
        <div
          className={styles.feedContainer}
        ></div>
        <div
          className={styles.suggestionsContainer}
        ></div>
      </div>
    </section>
  );
}
