const User = require("../models/User");
const { sendEmail } = require("../utils/email");
const BlacklistedToken = require("../models/BlacklistedToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const JWT_SECRET = process.env.JWT_SECRET;

const userResolvers = {
  Query: {
    me: async (_, args, context) => {
      if (!context.isAuth) {
        throw new Error("Not authenticated");
      }
      return await User.findById(context.user.userId);
    },
  },
  Mutation: {
    // Create a new user
    createUser: async (_, args) => {
      const newUser = new User(args.userInput);
      await newUser.save();
      return newUser;
    },

    // Update the logged-in user's information
    updateUser: async (_, { update }, context) => {
      if (!context.isAuth) {
        throw new Error("Not authenticated");
      }

      // Ensure users can only update their own profile
      const updatedUser = await User.findByIdAndUpdate(
        context.user.userId,
        update,
        {
          new: true,
        }
      );

      return updatedUser;
    },

    // login user
    async login(_, { email, password }) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User does not exist!");
      }

      const isEqual = bcrypt.compareSync(password, user.password);
      if (!isEqual) {
        throw new Error("Password is incorrect!");
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      return { userId: user.id, token: token, tokenExpiration: 1 };
    },

    //logout
    async logout(_, { token }) {
      const decodedToken = jwt.decode(token);
      const expiryDate = new Date(decodedToken.exp * 1000);

      await BlacklistedToken.create({
        token: token,
        expireAt: expiryDate,
      });

      return true;
    },

    // reset password request
    async requestPasswordReset(_, { email }) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found.");
      }

      // Generate a reset token - this is simplistic, consider a more secure approach
      const resetToken = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      await user.save();

      // Send an email to the user with the reset token - implement sendEmail function based on your setup
      const resetUrl = `https://yourfrontend.com/reset-password/${resetToken}`;
      await sendEmail(
        user.email,
        "Password Reset",
        `Please go to ${resetUrl} to reset your password.`
      );

      return true;
    },

    // reset password
    async resetPassword(_, { resetToken, newPassword }) {
      const user = await User.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        throw new Error("Password reset token is invalid or has expired.");
      }

      user.password = await bcrypt.hash(newPassword, 12);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      return true;
    },
  },
};

module.exports = userResolvers;
