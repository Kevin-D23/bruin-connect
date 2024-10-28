"use client";

import Logo from "../logo/logo";
import Home from "../../assets/icons/home";
import Clubs from "../../assets/icons/clubs";
import Friends from "../../assets/icons/friends";
import Messages from "../../assets/icons/messages";
import Post from "../../assets/icons/post";
import Search from "../../assets/icons/search.svg";
import defaultProfile from "../../assets/images/defaultProfile.png";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { usePathname } from "next/navigation";
import { auth } from "@/auth";

export default async function Navbar() {
  const pathname = usePathname();
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href={"/home"} className={styles.logoContainer}>
          <Logo className={styles.logo} />
        </Link>
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
        <div className={styles.profileSearchContainer}>
          <Link href={"/search"} className={styles.searchLink}>
            <Image
              className={styles.searchIcon}
              src={Search}
              width={0}
              height={0}
              alt="search"
            />
          </Link>
          <Link className={styles.profile} href={`/profile/${userId}`}>
            <Image
              src={defaultProfile}
              width={0}
              height={0}
              alt="profile"
              className={styles.profileImg}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
