"use client";
import Image from "next/image";
import Search from "../../assets/icons/search.svg";
import Logo from "../logo/logo";
import DefaultProfile from "../../assets/images/defaultProfile.png";
import styles from "./mobileTopBar.module.scss";
import Link from "next/link";
import { useSession } from "@/app/(hasNavbar)/sessionProvider";

export default function MobileTopBar() {
  const session = useSession();

  const userId = session?.user_id;
  return (
    <div className={styles.container}>
      <Link href={"/search"} className={styles.searchContainer}>
        <Image
          className={styles.search}
          src={Search}
          width={0}
          height={0}
          alt="search"
        />
      </Link>
      <Link href={"/home"} className={styles.logo}>
        <Logo size={20} />
      </Link>
      <Link href={`/profile/${userId}`} className={styles.profile}>
        <Image
          src={DefaultProfile}
          width={0}
          height={0}
          alt="profile"
          className={styles.profileImg}
        />
      </Link>
    </div>
  );
}
