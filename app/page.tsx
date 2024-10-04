import { auth } from "@/auth";
import NavbarComponent from "@/components/Navbar";

export default async function Home() {
  const session = await auth();
  return (
    <main>
      <NavbarComponent user={{ name: session?.user?.name }} />
      <h1>Hello World</h1>
    </main>
  );
}
