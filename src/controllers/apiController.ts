import { Request, Response } from "express";

export async function EmailSearch(req: Request, res: Response) {
  res.status(200).json({ message: "THis is the Data lol:" });
}

export async function ProfileFetcher(req: Request, res: Response) {
  res.status(200).json({ message: "This is from the Profile api" });
}
