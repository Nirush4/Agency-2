import { pgTable, unique, pgPolicy, uuid, text, timestamp, index, foreignKey, integer, boolean, bigint, jsonb, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const ingredientCategory = pgEnum("ingredient_category", ['Vegetables', 'Protein', 'Dairy', 'Spices'])


export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	username: text().notNull(),
	email: text().notNull(),
	profileImage: text("profile_image"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_username_key").on(table.username),
	unique("users_email_key").on(table.email),
	pgPolicy("users_select_self", { as: "permissive", for: "select", to: ["authenticated"], using: sql`(id = ( SELECT auth.uid() AS uid))` }),
	pgPolicy("users_update_self", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("users_delete_self", { as: "permissive", for: "delete", to: ["authenticated"] }),
	pgPolicy("users_insert_self", { as: "permissive", for: "insert", to: ["anon", "authenticated"] }),
]);

export const recipes = pgTable("recipes", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
	description: text(),
	cookTime: integer("cook_time"),
	difficulty: text(),
	calories: integer(),
	servings: integer(),
	mealType: text("meal_type"),
	imageUrl: text("image_url"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	owner: uuid(),
	isPublished: boolean("is_published").default(true),
	ingredients: text(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	viewsCount: bigint("views_count", { mode: "number" }).default(0),
	metadata: jsonb().default({}),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	deletedAt: timestamp("deleted_at", { withTimezone: true, mode: 'string' }),
	// TODO: failed to parse database type 'tsvector'
	fts: unknown("fts"),
}, (table) => [
	index("idx_recipes_fts").using("gin", table.fts.asc().nullsLast().op("tsvector_ops")),
	index("idx_recipes_is_published").using("btree", table.isPublished.asc().nullsLast().op("bool_ops")),
	index("idx_recipes_metadata").using("gin", table.metadata.asc().nullsLast().op("jsonb_ops")),
	index("idx_recipes_owner").using("btree", table.owner.asc().nullsLast().op("uuid_ops")),
	index("idx_recipes_user_id").using("btree", table.owner.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.owner],
			foreignColumns: [users.id],
			name: "recipes_owner_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.owner],
			foreignColumns: [users.id],
			name: "recipes_user_id_fkey"
		}).onDelete("set null"),
	pgPolicy("public_select_published_recipes", { as: "permissive", for: "select", to: ["public"], using: sql`(is_published = true)` }),
	pgPolicy("auth_select_own_recipes", { as: "permissive", for: "select", to: ["authenticated"] }),
	pgPolicy("auth_insert_recipes", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("auth_update_own_recipes", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("auth_delete_own_recipes", { as: "permissive", for: "delete", to: ["authenticated"] }),
	pgPolicy("recipes_insert_own", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("recipes_update_own", { as: "permissive", for: "update", to: ["authenticated"] }),
	pgPolicy("recipes_delete_own", { as: "permissive", for: "delete", to: ["authenticated"] }),
	pgPolicy("recipes_select_published_or_own", { as: "permissive", for: "select", to: ["authenticated"] }),
]);

export const favorites = pgTable("favorites", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	recipeId: uuid("recipe_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	index("idx_favorites_user").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	index("idx_favorites_user_id").using("btree", table.userId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.recipeId],
			foreignColumns: [recipes.id],
			name: "favorites_recipe_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "favorites_user_id_fkey"
		}).onDelete("cascade"),
	unique("favorites_unique").on(table.userId, table.recipeId),
	pgPolicy("favorites_select_auth_owner", { as: "permissive", for: "select", to: ["authenticated"], using: sql`(user_id = ( SELECT auth.uid() AS uid))` }),
	pgPolicy("favorites_insert_auth_owner", { as: "permissive", for: "insert", to: ["authenticated"] }),
	pgPolicy("favorites_delete_auth_owner", { as: "permissive", for: "delete", to: ["authenticated"] }),
]);

export const profiles = pgTable("profiles", {
	id: uuid().primaryKey().notNull(),
	fullName: text("full_name"),
	avatarUrl: text("avatar_url"),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.id],
			foreignColumns: [users.id],
			name: "profiles_id_fkey"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.id],
			foreignColumns: [users.id],
			name: "profiles_user_fk"
		}).onDelete("cascade"),
]);

export const tags = pgTable("tags", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("tags_name_key").on(table.name),
]);

export const recipeTags = pgTable("recipe_tags", {
	recipeId: uuid("recipe_id").notNull(),
	tagId: uuid("tag_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.recipeId],
			foreignColumns: [recipes.id],
			name: "recipe_tags_recipe_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.tagId],
			foreignColumns: [tags.id],
			name: "recipe_tags_tag_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.recipeId, table.tagId], name: "recipe_tags_pkey"}),
]);
