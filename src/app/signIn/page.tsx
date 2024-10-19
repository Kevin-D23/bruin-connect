import SignInCard from "@/components/signInCard/signInCard";
import styles from "./signIn.module.scss";
import { auth } from "@/auth";
import { redirect } from "next/navigation";


export default async function SignIn() {
    const session = await auth();
    const userId = session?.user?.id;
    let redirectPath: string | null = null;
    try {
      const response = await fetch(`http://localhost:8000/api/user/${userId}`);
      if (!response.ok) {
        console.error("Network response was not ok");
      }
      const result = await response.json();
      if (result) redirectPath = "/home";
    } catch (error) {
      console.error("User does not exist");
    } finally {
      if (redirectPath) redirect(redirectPath)
        else if (session) redirect('/signIn/register')
    }
  return (
    <div>
      <main className={styles.main}>
       <SignInCard pageName="signIn"/>
      </main>
    </div>
  );
}
