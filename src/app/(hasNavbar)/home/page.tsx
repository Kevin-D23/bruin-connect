import styles from "./home.module.scss";
import Feed from "@/components/feed/feed";

export default function Home() {
  return (
    <section className={styles.home}>
      <div className={styles.container}>
        <div className={styles.profileContainer}></div>
        <div className={styles.feedContainer}>
          <Feed posts={[]} />
        </div>
        <div className={styles.suggestionsContainer}></div>
      </div>
    </section>
  );
}
