"use client";
import Logo from "../logo/logo";
import Search from "../../assets/icons/search.svg";
import defaultProfile from "../../assets/images/defaultProfile.png";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.scss";
import NavBtns from "./navbtns";
import { useSession } from "@/app/(hasNavbar)/sessionProvider";

export default function Navbar() {
  const session = useSession();
  const profilePicture = session?.profile_picture;
  const userId = session?.user_id;
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href={"/home"} className={styles.logoContainer}>
          <Logo className={styles.logo} />
        </Link>
        <NavBtns />
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
              src={profilePicture ? (profilePicture as string) : defaultProfile}
              width={0}
              height={0}
              alt="profile"
              className={styles.profileImg}
              unoptimized
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
