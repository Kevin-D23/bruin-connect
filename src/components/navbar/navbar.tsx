import Logo from "../logo/logo";
import Home from "../../assets/icons/home.svg";
import Clubs from "../../assets/icons/clubs.svg";
import Friends from "../../assets/icons/friends.svg";
import Messages from "../../assets/icons/messages.svg";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Logo />
      <ul>
        <li>
          <Link href={"/home"}>
            <Image src={Home} width={0} height={0} alt="home" />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link href={"/clubs"}>
            <Image src={Clubs} width={0} height={0} alt="clubs" />
            <p>Clubs</p>
          </Link>
        </li>
        <li>
          <Link href={"/friends"}>
            <Image src={Friends} width={0} height={0} alt="friends" />
            <p>Friends</p>
          </Link>
        </li>
        <li>
          <Link href={"/messages"}>
            <Image src={Messages} width={0} height={0} alt="messages" />
            <p>Messages</p>
          </Link>
        </li>
      </ul>
      <div></div>
    </nav>
  );
}
