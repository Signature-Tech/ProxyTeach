import NavbarComponent from "@/components/Navbar";
import ProxyLayout from "@/components/ProxyLayout";
import { db } from "@/lib/db";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { eq, ne } from "drizzle-orm";

async function findProxy(id: string, day: string) {
  const teachers = pgTable('teachers', {
    id: text('teach_id'),
    name: text('name'),
    email: text('email'),
  });

  const subjects = pgTable('subjects', {
    name: text('sub_name'),
  });

  // Get absent teacher's name
  const absentTeacher = await db.select().from(teachers).where(eq(teachers.id, id)).limit(1);
  if (!absentTeacher.length) throw new Error("Absent teacher not found");

  const absentTeacherScheduleTable = pgTable(absentTeacher[0].name as string, {
    day: text('day'),
    period: integer('period'),
    subject: text('subject_id').references(() => subjects.name),
    teachID: text('teach_id').references(() => teachers.id),
  });

  // Get absent teacher's schedule for the day
  const absentTeacherSchedule = await db.select().from(absentTeacherScheduleTable).where(eq(absentTeacherScheduleTable.day, day));

  // Get all other teachers
  const allTeachers = await db.select().from(teachers).where(ne(teachers.id, id));

  // Create a map to store teachers who can't be proxies for each period
  const cannotBeProxyMap = new Map<number, Set<string>>();

  // Initialize the map with empty sets for each period
  absentTeacherSchedule.forEach(schedule => {
    cannotBeProxyMap.set(schedule.period as number, new Set<string>());
  });

  // Check each teacher's schedule
  for (const teacher of allTeachers) {
    const teacherScheduleTable = pgTable(teacher.name as string, {
      day: text('day'),
      period: integer('period'),
      subject: text('subject_id').references(() => subjects.name),
      teachID: text('teach_id').references(() => teachers.id),
    });

    const teacherSchedule = await db.select().from(teacherScheduleTable)
      .where(eq(teacherScheduleTable.day, day));

    teacherSchedule.forEach(schedule => {
      const cannotBeProxySet = cannotBeProxyMap.get(schedule.period as number);
      if (cannotBeProxySet) {
        cannotBeProxySet.add(teacher.id as string);
      }
    });
  }

  // Find potential proxies for each period
  const potentialProxies = absentTeacherSchedule.map(schedule => {
    const cannotBeProxySet = cannotBeProxyMap.get(schedule.period as number) || new Set<string>();
    const potentialProxiesForPeriod = allTeachers.filter(teacher => !cannotBeProxySet.has(teacher.id as string));

    return {
      period: schedule.period,
      potentialProxies: potentialProxiesForPeriod
    };
  });

  return potentialProxies;
  
}



export default async function Page() {
  
  const proxy = await findProxy("9007", "Sunday");

  console.log(proxy);
  
  return (
    <div>
      <NavbarComponent />
      <ProxyLayout content={"Hello"} />
    </div>
  );
}
