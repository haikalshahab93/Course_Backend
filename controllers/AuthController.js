const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const Joi = require("joi");
const { sendVerificationEmail } = require("../services/mailService");

const {JWT_SIGN,JWT_REFRESH_SIGN,ACCESS_TOKEN_EXPIRATION,REFRESH_TOKEN_EXPIRATION} = require("../config/jwt");

const successResponse = (res, message, data = null) => {
  const response = { message };
  if (data !== null) {
    response.data = data;
  }
  return res.status(200).json(response);
};

const errorResponse = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({ error: message });
};

const validateRegistration = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    fullName: Joi.string().required(),
    role: Joi.string().optional()
  });

  const { error } = schema.validate(data, { abortEarly: false });
  return error
    ? error.details.map((detail) => detail.message).join(", ")
    : null;
};

const validateLogin = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(data, { abortEarly: false });
  return error
    ? error.details.map((detail) => detail.message).join(", ")
    : null;
};

const register = async (req, res) => {
  try {
    const validationError = validateRegistration(req.body);
    if (validationError) {
      return errorResponse(res, validationError);
    }
    const {
      username,
      email,
      password,
      fullName,
      role,
    } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return errorResponse(res, "Email already exists");
    }

    const verificationToken = crypto.randomBytes(32).toString("hex")
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        VerificationToken: verificationToken,
        role: role || "USER",
        fullName,
      },
      include:{
         profile:true
      }
    });

    const nameParts = fullName.split(" ");
    const firstName= nameParts[0];
    const phone = ''
    const photo = ''

    const lastName = nameParts.slice(1).join(" ");
    const newProfile = await prisma.profile.create({
      data: {
        firstName: firstName || null,
        lastName: lastName || null,
        phone: phone || null,
        photo: photo || null,
        user: {
          connect: { id: newUser.id },
        },
      },
    });

    await sendVerificationEmail(email, verificationToken);

    successResponse(res, "User successfully registered, Verification Check Email", {
      userId:newUser.id,
      profileId: newProfile.id,
      username,
      email,
    });
  } catch (error) {
    console.error(error);
    errorResponse(res, error.message || "Registration failed");
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const userAuth = await prisma.User.findUnique({
      where: { VerificationToken: token },
    });
    if (!userAuth) {
      return errorResponse(res, "Invalid verification token.");
    }

    await prisma.User.update({
      where: { id: userAuth.id },
      data: { Verified: true, VerificationToken: null },
    });

    successResponse(res, "Email verified successfully!");
  } catch (error) {
    errorResponse(res, error.message || "Email verification failed");
  }
};

const login = async (req, res) => {
  try {
    const validationError = validateLogin(req.body);
    if (validationError) {
      return errorResponse(res, validationError);
    }

    const { username, password } = req.body;

    const userAuth = await prisma.User.findUnique({
      where: { username: username },
      include:{
        profile:true
      }
    });

    if (!userAuth) {
      return errorResponse(res, "User does not exist");
    }
    if (!userAuth.Verified) {
      return errorResponse(
        res,
        "Email not verified. Please verify your email first."
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, userAuth.password);
    if (!isPasswordCorrect) {
      return errorResponse(res, "Password is incorrect");
    }

    const payload =  {
      username: userAuth.username,
      id: userAuth.id,
      role: userAuth.role,
    }
    const accessToken = jwt.sign(payload,JWT_SIGN, { expiresIn: ACCESS_TOKEN_EXPIRATION });
    const refreshToken = jwt.sign(payload,JWT_REFRESH_SIGN,{ expiresIn: REFRESH_TOKEN_EXPIRATION });

    successResponse(res, "Login successful", {
      userId: userAuth.id,
      accessToken,
      refreshToken,
      accessTokenExp: ACCESS_TOKEN_EXPIRATION,
      refreshTokenExp: REFRESH_TOKEN_EXPIRATION,
      role: userAuth.Role,
    });
  } catch (error) {
    errorResponse(res, error.message);
  }
};


const getUserProfileByUserId = async (req,res) => {
  try {
    const userAndProfile = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
      },
    });

    return userAndProfile;
  } catch (error) {
    throw new Error(`Error getting user and profile: ${error.message}`);
  }
};

module.exports = {
  register,
  verifyEmail,
  login,
  getUserProfileByUserId
};
