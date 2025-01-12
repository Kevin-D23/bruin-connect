"use client";
import styles from "./mobileNavbar.module.scss";
import Home from "../../assets/icons/home";
import Clubs from "../../assets/icons/clubs";
import Post from "../../assets/icons/post";
import Friends from "../../assets/icons/friends";
import Messages from "../../assets/icons/messages";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function MobileNavbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.mobileNavbar}>
      <Link
        href={"/home"}
        className={`${styles.navOption} ${
          pathname == "/home" ? styles.active : ""
        }`}
      >
        <Home />
        <p>Home</p>
      </Link>
      <Link
        href={"/clubs"}
        className={`${styles.navOption} ${
          pathname == "/clubs" ? styles.active : ""
        }`}
      >
        <Clubs />
        <p>Clubs</p>
      </Link>
      <Link
        href={"/post"}
        className={`${styles.navOption} ${
          pathname == "/post" ? styles.active : ""
        }`}
      >
        <Post />
        <p>Post</p>
      </Link>
      <Link
        href={"friends"}
        className={`${styles.navOption} ${
          pathname == "/friends" ? styles.active : ""
        }`}
      >
        <Friends />
        <p>Friends</p>
      </Link>
      <Link
        href={"messages"}
        className={`${styles.navOption} ${
          pathname == "/messages" ? styles.active : ""
        }`}
      >
        <Messages />
        <p>Messages</p>
      </Link>
    </nav>
  );
}
