import NavbarComponent from "@/components/Navbar";
import ProxyLayout from "@/components/ProxyLayout";
import { db } from "@/lib/db";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { and, eq, ne } from "drizzle-orm";

async function findProxy(id: string, day: string) {
  const CanNotBeProxy = []

  const teachers = pgTable('teachers', {
    id: text('teach_id'),
    name: text('name'),
    email: text('email'),
  });

  const subjects = pgTable('subjects', {
    name: text('sub_name'),
  });

  const teacherName = await db.select({
    name: teachers.name,
  })
    .from(teachers)
    .where(eq(teachers.id, id));

  const absentTeacherScheduleTable = pgTable(teacherName[0].name as string, {
    day: text('day'),
    period: integer('period'),
    subject: text('subject_id').references(() => subjects.name),
    teachID: text('teach_id').references(() => teachers.id),
  });

  const absentTeacherSchedule = await db.select().from(absentTeacherScheduleTable);

  const allTeachers = await db.select({
    id: teachers.id,
    name: teachers.name
  }).from(teachers).where(ne(teachers.id, id));

  for (const schedule of absentTeacherSchedule) {
    const { period, day: scheduleDay } = schedule;    

    for (const teacher of allTeachers) {
      const teacherName = teacher.name;
      const proxyTeacherTable = pgTable(teacherName as string, {
        day: text('day'),
        period: integer('period'),
        subject: text('subject_id').references(() => subjects.name),
        teachID: text('teach_id').references(() => teachers.id),
      });

      const TeacherHavingClass = await db.select().from(proxyTeacherTable)
        .where(and(
          eq(proxyTeacherTable.day, scheduleDay as string),
          eq(proxyTeacherTable.period, period as number),
        ));

      for (const teacher of TeacherHavingClass) {
        const { teachID } = teacher;

        CanNotBeProxy.push({id : teachID, period : period, name : teacherName});
      }
    }
  }
  console.log(CanNotBeProxy);
}

export default async function Page() {
  await findProxy("1305", 'Sunday');
  return (
    <div>
      <NavbarComponent />
      <ProxyLayout content={"Hello"} />
    </div>
  );
}
