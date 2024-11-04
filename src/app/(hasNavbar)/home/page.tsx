import styles from "./home.module.scss";

export default function Home() {
  return (
    <section className={styles.home}>
      <div className={styles.container}>
        <div
          className={styles.profileContainer}
          style={{ height: 100, backgroundColor: "black" }}
        ></div>
        <div
          className={styles.feedContainer}
          style={{ height: 100, backgroundColor: "black" }}
        ></div>
        <div
          className={styles.suggestionsContainer}
          style={{ height: 100, backgroundColor: "black" }}
        ></div>
      </div>
    </section>
  );
}
