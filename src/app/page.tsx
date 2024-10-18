import Image from "next/image";
import styles from "./page.module.scss";
import Logo from "@/components/logo/logo";
import Link from "next/link";
import rightArrow from "../assets/icons/rightArrow.svg";
import carouselImage1 from "../assets/images/carouselImage1.png";
import carouselImage2 from "../assets/images/carouselImage2.png";
import carouselImage3 from "../assets/images/carouselImage3.png";
import carouselImage4 from "../assets/images/carouselImage4.png";
import carouselImage5 from "../assets/images/carouselImage5.png";
import carouselImage6 from "../assets/images/carouselImage6.png";
import carouselImage7 from "../assets/images/carouselImage7.png";
import carouselImage8 from "../assets/images/carouselImage8.png";
import carouselImage9 from "../assets/images/carouselImage9.png";
import carouselImage10 from "../assets/images/carouselImage10.png";

export default function Home() {
  const carouselImages = [
    carouselImage1,
    carouselImage2,
    carouselImage3,
    carouselImage4,
    carouselImage5,
    carouselImage6,
    carouselImage7,
    carouselImage8,
    carouselImage9,
    carouselImage10,
  ];
  const topCarousel = (
    <>
      {carouselImages.map((image, index) => {
        return (
          <Image key={index} src={image} width={0} height={0} alt="ucla" />
        );
      })}
    </>
  );
  const bottomCarousel = (
    <>
      {carouselImages.reverse().map((image, index) => {
        return (
          <Image key={index} src={image} width={0} height={0} alt="ucla" />
        );
      })}
    </>
  );

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Logo size={24} className={styles.logo} />
        <div className={styles.container}>
          <h2>
            A{" "}
            <span
              style={{
                color: "var(--primary)",
              }}
            >
              community{" "}
            </span>
            dedicated to all things{" "}
            <span
              style={{
                background:
                  "linear-gradient(120deg, var(--primary),var(--accent))",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Bruin
            </span>
          </h2>
          <p>
            Join us to connect with students, explore clubs, and hear the latest
            UCLA news!
          </p>
          <div className={styles.btnContainer}>
            <Link className={styles.primaryBtn} href="signIn">
              Get started{" "}
              <Image
                src={rightArrow}
                width={14}
                height={14}
                alt="right arrow"
              />
            </Link>
            <Link className={styles.secondaryBtn} href="/signIn">
              Sign In
            </Link>
          </div>
        </div>
        <div className={styles.carouselContainer}>
          <div className={styles.topCarouselContainer}>
            <div className={styles.topCarousel}>{topCarousel}</div>
            <div className={styles.topCarousel}>{topCarousel}</div>
          </div>
          <div className={styles.bottomCarouselContainer}>
            <div className={styles.bottomCarousel}>{bottomCarousel}</div>
            <div className={styles.bottomCarousel}>{bottomCarousel}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
