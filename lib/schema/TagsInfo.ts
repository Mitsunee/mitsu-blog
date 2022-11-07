import { z } from "zod";

export const TagsInfoSchema = z.record(
  z.object({
    title: z.string(),
    description: z.string()
  })
);

export type TagsInfo = z.infer<typeof TagsInfoSchema>;
