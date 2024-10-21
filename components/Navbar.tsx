import { auth } from "@/auth";
import Navbar from "./NavbarWrapper";

export default async function NavbarComponent() {

    const session = await auth();
    const name = session?.user?.name;

  return (
    <div>
      <Navbar name={name as string} />
    </div>
  )
}
