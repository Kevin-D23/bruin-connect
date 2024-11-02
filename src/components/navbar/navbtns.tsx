"use client"
import Home from "../../assets/icons/home";
import Clubs from "../../assets/icons/clubs";
import Friends from "../../assets/icons/friends";
import Messages from "../../assets/icons/messages";
import Post from "../../assets/icons/post";
import Link from "next/link";
import styles from "./navbar.module.scss"
import { usePathname } from "next/navigation";

export default function NavBtns() {
    const pathname = usePathname()
  return (
    <ul>
      <li>
        <Link
          className={`${styles.icon} ${
            pathname == "/home" ? styles.active : ""
          }`}
          href={"/home"}
        >
          <Home />
          <p>Home</p>
        </Link>
      </li>
      <li>
        <Link
          className={`${styles.icon} ${
            pathname == "/clubs" ? styles.active : ""
          }`}
          href={"/clubs"}
        >
          <Clubs />
          <p>Clubs</p>
        </Link>
      </li>
      <li>
        <Link
          className={`${styles.icon} ${
            pathname == "/post" ? styles.active : ""
          }`}
          href={"/post"}
        >
          <Post />
          <p>Post</p>
        </Link>
      </li>
      <li>
        <Link
          className={`${styles.icon} ${
            pathname == "/friends" ? styles.active : ""
          }`}
          href={"/friends"}
        >
          <Friends />
          <p>Friends</p>
        </Link>
      </li>
      <li>
        <Link
          className={`${styles.icon} ${
            pathname == "/messages" ? styles.active : ""
          }`}
          href={"/messages"}
        >
          <Messages />
          <p>Messages</p>
        </Link>
      </li>
    </ul>
  );
}
