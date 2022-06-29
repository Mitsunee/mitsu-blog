import type { NextApiRequest, NextApiResponse } from "next";

export default function Hello(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: "John Doe" });
}
