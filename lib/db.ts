import { drizzle } from 'drizzle-orm/xata-http';
import { XataClient } from '@/xata'; // Generated client

const xata = new XataClient({ apiKey: process.env.XATA_API_KEY, branch: process.env.XATA_BRANCH });
export const db = drizzle(xata);