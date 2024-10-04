import { drizzle } from 'drizzle-orm/xata-http';
import { XataClient } from '@/xata'; // Generated client

const xata = new XataClient({ apiKey: "xau_Fb2Jvg3g3zqmvsMFgf8taxvPVGCtIXz75", branch: "main" });
export const db = drizzle(xata);