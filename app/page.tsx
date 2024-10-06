import { integer, pgTable, text } from "drizzle-orm/pg-core";
import NavbarComponent from "@/components/Navbar";
import Teacher from "@/components/CardLayout";
import logo from "@/images/logo.png";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth();

  const teachers = pgTable('teachers', {
    id: integer('teach_id'),
    name: text('name'),
    number: integer('number'),
  })

  const response = await db.select().from(teachers);

  if (session) {
    return (
      <main>
        <NavbarComponent />
        <div className="flex m-5 p-5 flex-wrap">
          {response.map((teacher) => (
            <Teacher key={teacher.id} name={teacher.name as string} picture={logo} />
          ))}
        </div>
      </main>
    );
  }

  else {
    redirect('/api/auth/signin')
  }
}
