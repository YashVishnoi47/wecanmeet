import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db/database";
import User from "@/lib/db/models/userModel";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        try {
          const user = await User.findOne({
            Email: credentials?.email,
          });

          if (!user) {
            throw new Error("User not found");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Password Incorrect");
          }
        } catch (error) {
          throw new Error("Internal server error");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.Email = token.Email;
        session.user.userName = token.userName;
        session.user.FullName = token.FullName;
        session.user.MeetingCardID = token.MeetingCardID;
        session.user.Meetings = token.Meetings;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.userName = user.userName;
        token.Email = user.Email;
        token.FullName = user.FullName;
        token.MeetingCardID = user.MeetingCardID;
        token.Meetings = user.Meetings;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
