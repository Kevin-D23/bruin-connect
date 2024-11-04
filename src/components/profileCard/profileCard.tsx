import Image from "next/image";
import styles from "./profileCard.module.scss";
import { pronounOptions } from "@/assets/lists/pronouns";
import { majorOptions } from "@/assets/lists/majorOptions";

type ProfileCard = {
  imgLink: string;
  firstName: string;
  lastName: string;
  pronouns: string;
  major: string;
};

export default function ProfileCard({
  imgLink,
  firstName,
  lastName,
  pronouns,
  major,
}: ProfileCard) {
  return (
    <div className={styles.profileCard}>
      <Image src={imgLink} width={0} height={0} alt="profile" />
      <div className={styles.textContainer}>
        <div className={styles.nameContainer}>
          <p className={styles.firstName}>{firstName + " " + lastName}</p>
          &#8729;
          <p className={styles.pronouns}>
            {
              pronounOptions[
                pronounOptions.findIndex(
                  (pronounOption) => pronounOption.value === pronouns
                )
              ].label
            }
          </p>
        </div>
        <p className={styles.major}>
          {
            majorOptions[
              majorOptions.findIndex(
                (majorOption) => majorOption.value == major
              )
            ].label
          }
        </p>
      </div>
    </div>
  );
}
