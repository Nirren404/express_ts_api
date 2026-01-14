import type { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  const users = [
    { id: 1, name: "Joe Kerry" },
    { id: 2, name: "Steve Harrington" },
  ];

  res.status(200).json(users);
};
