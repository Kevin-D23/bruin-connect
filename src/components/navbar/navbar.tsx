import Logo from "../logo/logo";
import Home from "../../assets/icons/home.svg";
import Clubs from "../../assets/icons/clubs.svg";
import Friends from "../../assets/icons/friends.svg";
import Messages from "../../assets/icons/messages.svg";
import Search from "../../assets/icons/search.svg";
import defaultProfile from "../../assets/images/defaultProfile.png";
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Logo />
        <ul>
          <li>
            <Link className={styles.icon} href={"/home"}>
              <Image src={Home} width={0} height={0} alt="home" />
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link className={styles.icon} href={"/clubs"}>
              <Image src={Clubs} width={0} height={0} alt="clubs" />
              <p>Clubs</p>
            </Link>
          </li>
          <li>
            <Link className={styles.icon} href={"/friends"}>
              <Image src={Friends} width={0} height={0} alt="friends" />
              <p>Friends</p>
            </Link>
          </li>
          <li>
            <Link className={styles.icon} href={"/messages"}>
              <Image src={Messages} width={0} height={0} alt="messages" />
              <p>Messages</p>
            </Link>
          </li>
        </ul>
        <div>
          <Image src={Search} width={0} height={0} alt="search" />
        </div>
      </div>
    </nav>
  );
}
