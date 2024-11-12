import styles from "./register.module.scss";
import SignInCard from "@/components/signInCard/signInCard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Regsiter() {
  const session = await auth();
  const userId = session?.user?.id;
  const email = session?.user?.email;
  if (!session) {
    redirect('/signIn')
  }

  return (
    <div>
      <main className={styles.main}>
        <SignInCard pageName={"register"} userId={userId} email={email} />
      </main>
    </div>
  );
}
