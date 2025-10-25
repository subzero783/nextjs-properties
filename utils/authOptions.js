import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // 1. Connect to the database
        await dbConnect();

        // 2. Find the user by email
        const user = await User.findOne({ email: credentials.email }).select("+password");
        // NOTE: If your User schema sets 'select: false' for the password, you must explicitly select it here.

        // 3. Check if the user exists and the password is correct
        if (user) {
          // Compare the provided password with the hashed password in the database
          const isMatch = await bcrypt.compare(credentials.password, user.password);

          if (isMatch) {
            // Success: Return an object with public user information
            return {
              id: user._id.toString(),
              name: user.name, // Assuming a 'name' field
              email: user.email,
              // DO NOT return the password hash
            };
          } else {
            // Failure: Password mismatch
            throw new Error("Invalid credentials");
          }
        } else {
          // Failure: User not found
          throw new Error("User Not Found");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Invoked on successful signin
    async signIn({ profile }) {
      // 1. Connect to database
      await connectDB();
      // 2. Check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // 3. If not, then add user to database
      if (!userExists) {
        // Truncate user name if too long
        const username = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. Return true to allow sign in
      return true;
    },
    // Modifies the session object
    async session({ session }) {
      // 1. Get user from database
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign the user id to the session
      session.user.id = user._id.toString();
      // 3. return session
      return session;
    },
  },
};
