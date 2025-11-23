import { signUp, logIn } from '../services/authService.js';

export async function signUpHandler(req, res) {
  const { userName, email, password, role = 'user' } = req.body;
  const newUser = await signUp(userName, email, password, role);
  res.status(201).json({ message: `New user Created with id ${newUser.USER_ID}` });
}

export async function logInHandler(req, res) {
  const { email, password } = req.body;
  const accessToken = await logIn(email, password);
  res.status(200).json({ accessToken });
}



