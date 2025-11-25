import { sql, InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  jsonb,
  serial,
  timestamp,
  bigint,
  index,
} from "drizzle-orm/pg-core";

const advocates = pgTable("advocates", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  city: text("city").notNull(),
  degree: text("degree").notNull(),
  specialties: jsonb("specialties").default([]).notNull().$type<string[]>(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
}, (table) => ({
  firstNameIdx: index("first_name_idx").on(table.firstName),
  lastNameIdx: index("last_name_idx").on(table.lastName),
  specialtiesIdx: index("specialties_idx").on(table.specialties),
}));

export { advocates };

export type Advocates = InferSelectModel<typeof advocates>;
