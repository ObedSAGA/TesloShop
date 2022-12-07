import bcrypt from "bcryptjs";

import { User } from "../models";
import { db } from ".";

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email });
  await db.disconnect();

  if (!user) {
    return null;
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { role, name, _id } = user;

  return {
    role,
    name,
    id: _id,
    email: email.toLocaleLowerCase(),
  };
};

// This function create or verify the user from OAuth authentications.
export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();

  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
    const { _id, name, email, role } = user;

    return {
      id: _id,
      name,
      email,
      role,
    };
  }
  const newUser = new User({
    email: oAuthEmail,
    name: oAuthName,
    password: "",
    role: "client",
  });
  await newUser.save();
  await db.disconnect();

  const { _id, name, password, role } = newUser;

  return {
    id: _id,
    name,
    password,
    role,
  };
};
