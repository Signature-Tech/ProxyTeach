import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "./lib/db";
import { eq } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/api/auth/signin',
  },
  providers: [Credentials({
    credentials: {
      email: {
        label: "Email",
        type: "email",
        placeholder: "username@example.com",
      },
      password: {
        label: "Password",
        type: "password",
        placeholder: "********",
      },
    },
    async authorize(credentials) {
      const users = pgTable('users', {
        name: text('name'),
        email: text('email'),
        password: text('password')
      })
      const response = await db.select().from(users).where(eq(users.email, credentials?.email as string))

      const userRecord = response.find(user => user.email === credentials?.email)

      if (!userRecord) {
        throw new Error("No user found with this email");
      }
    
      const passwordCorrect = await bcrypt.compare(credentials?.password as string, userRecord.password || '')
    
      if (!passwordCorrect) {
        throw new Error("Incorrect password");
      }

      if (passwordCorrect) {
        return {
          name: userRecord?.name,
          email: userRecord?.email,
        }
      }

      return null
    }
  }),],
})