import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db/database";
import User from "@/lib/db/models/userModel";
import { NextResponse } from "next/server";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials, req) {
        await connectDB();
        try {
          const user = await User.findOne({
            userName: credentials?.username,
          });

          if (!user) {
            return NextResponse.json(
              { error: "User not found" },
              { status: 404 }
            );
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            console.log(user);
            return user;
          } else {
            return NextResponse(
              { message: "Password Incorrect" },
              { status: 401 }
            );
          }
        } catch (error) {
          console.log(error);
          throw new Error("Error for cheking", error);

          //   return NextResponse.json(
          //     { error: "Internal Server Error" },
          //     { status: 500 }
          //   );
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.email = token.email;
        session.user.userName = token.userName;
        token.FirstName = token.fullName;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.userName = user.userName;
        token.email = user.email;
        token.FirstName = user.fullName;
      }
    },
  },
  pages: {
    signIn: "sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
