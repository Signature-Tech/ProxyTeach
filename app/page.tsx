import { pgTable, text } from "drizzle-orm/pg-core";
import NavbarComponent from "@/components/Navbar";
import Teacher from "@/components/TeacherLayout";
import logo from "@/images/logo.png";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await auth();

  const teachers = pgTable('teachers', {
    id: text('teach_id'),
    name: text('name'),
    email: text('email'),
  })

  const response = await db.select().from(teachers);



  if (session?.user?.email === 'admin@gmail.com') {
    redirect('/control-hub')
  }

  else if (session?.user) {
    return (
      <main>
        <NavbarComponent />
        <div className="flex flex-wrap">
          {response.map((teacher) => (
            <Teacher key={teacher.id?.toString()} name={teacher.name as string} picture={logo} />
          ))}
        </div>
      </main>
    );
  }

  else {
    redirect('/api/auth/signin')
  }
}
