import { drizzle } from 'drizzle-orm/xata-http';
import { XataClient } from '@/xata'; // Generated client
import { pgTable, text } from 'drizzle-orm/pg-core';

const xata = new XataClient({ apiKey: "xau_Fb2Jvg3g3zqmvsMFgf8taxvPVGCtIXz75", branch: "main" });
export const db = drizzle(xata);

export const teachers = pgTable('teachers', {
    id: text('teach_id'),
    name: text('name'),
    email: text('email'),
});

export const subjects = pgTable('subjects', {
    id: text('xata_id'),
    name: text('sub_name'),
});