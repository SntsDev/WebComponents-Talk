import { z } from "zod";

export interface IFormModel extends Record<string, unknown> {
  title?: string;
  space?: number;
}

export const FormValidator: z.Schema<IFormModel> = z.object({
  title: z.string().min(1),
  space: z.number().min(6000),
});
