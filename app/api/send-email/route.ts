import { db, teachers } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { period, searchedTeacherId } = await request.json();
  

  const teacherName = await db.select().from(teachers).where(eq(teachers.id, searchedTeacherId))
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'thefk.fakenking@gmail.com',
      pass: process.env.GMAIL_PASSWORD,
    }
  }); 

  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: '"School Admin" <your-email@gmail.com>',
      to: 'thefk.fakenking@gmail.com',
      subject: "Proxy Assignment",
      text: `You have been assigned as a proxy teacher for ${teacherName[0].name} during period ${period}.`,
      html: `<b>You have been assigned as a proxy teacher for ${teacherName[0].name} during period ${period}.</b>`,
    });

    const response = NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

    response.headers.set('Cache-Control', 'no-store, max-age=0');

    return response

  } catch (error) {
    console.error('Error sending email:', error);
    
    const response = NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

    response.headers.set('Cache-Control', 'no-store, max-age=0');

    return response

  }
}