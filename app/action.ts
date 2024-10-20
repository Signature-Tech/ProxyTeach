"use server";


import { db, teachers, subjects } from "@/lib/db";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { eq, ne } from "drizzle-orm";

export async function findProxy(formData: FormData, selectedDay: string | undefined) {

    const id = formData.get('ID') as string
    const day = selectedDay as string // You might want to make this dynamic

    const absentTeacher = await db.select().from(teachers).where(eq(teachers.id, id)).limit(1);
    if (!absentTeacher.length) throw new Error("Absent teacher not found");

    const absentTeacherScheduleTable = pgTable(absentTeacher[0].name as string, {
        day: text('day'),
        period: integer('period'),
        subject: text('subject_id').references(() => subjects.name),
        teachID: text('teach_id').references(() => teachers.id),
    });

    const absentTeacherSchedule = await db.select().from(absentTeacherScheduleTable).where(eq(absentTeacherScheduleTable.day, day));

    const allTeachers = await db.select().from(teachers).where(ne(teachers.id, id));

    const cannotBeProxyMap = new Map<number, Set<string>>();

    absentTeacherSchedule.forEach(schedule => {
        cannotBeProxyMap.set(schedule.period as number, new Set<string>());
    });

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
            // Update class count for this teacher
            teacherClassCount.set(teacher.id as string, (teacherClassCount.get(teacher.id as string) || 0) + 1);
        });
    }

    const potentialProxies = absentTeacherSchedule.map(schedule => {
        const cannotBeProxySet = cannotBeProxyMap.get(schedule.period as number) || new Set<string>();
        const potentialProxiesForPeriod = allTeachers.filter(teacher => 
            !cannotBeProxySet.has(teacher.id as string) && 
            (teacherClassCount.get(teacher.id as string) || 0) < 4
        );
    
        return {
            period: schedule.period,
            potentialProxies: potentialProxiesForPeriod
        };
    });

    return potentialProxies

}

const teacherClassCount = new Map<string, number>();
