import { dateToEpoch } from "lib/time";
import { z } from "zod";

const PostDateReg =
  /^\d{4}-\d{2}-\d{2} \d{2}:\d{2} UTC(?:\+|-)\d{1,2}(?::\d{2})?$/i;

export const PostFrontmatterSchema = z.object({
  title: z.string(),
  date: z
    .string()
    .regex(PostDateReg)
    .transform(val => dateToEpoch(val)),
  editedAt: z
    .string()
    .regex(PostDateReg)
    .transform(val => dateToEpoch(val))
    .optional(),
  description: z.string(),
  tags: z.array(z.string()),
  unpublished: z.literal(true).optional()
});

export type PostFrontmatterRaw = z.input<typeof PostFrontmatterSchema>;
export type PostFrontmatter = z.output<typeof PostFrontmatterSchema>;
