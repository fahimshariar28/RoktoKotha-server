import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponseMessage from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

// Login a user
const loginUser = catchAsyncFunc(async (req, res) => {
  const user = await AuthService.userLogin(req.body);

  const { accessToken, refreshToken, needPasswordChange } = user;

  // set refresh token in cookie
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "User log in successful",
    data: {
      needPasswordChange,
      accessToken,
    },
  });
});

// Refresh the access token
const refreshToken = catchAsyncFunc(async (req, res) => {
  const { refreshToken } = req.cookies;

  const accessToken = await AuthService.refreshToken(refreshToken);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Token refreshed successfully",
    data: {
      accessToken,
    },
  });
});

// Set the password of a user
const setPassword = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  await AuthService.setPassword(id, password);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Password set successfully",
  });
});

// Change password
const changePassword = catchAsyncFunc(async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  await AuthService.changePassword(id, oldPassword, newPassword);

  sendResponseMessage(res, {
    success: true,
    statusCode: 200,
    message: "Password changed successfully",
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  setPassword,
  changePassword,
};