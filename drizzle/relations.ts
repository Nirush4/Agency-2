import { relations } from "drizzle-orm/relations";
import { usersInAuth, recipes, users, favorites, profiles, recipeTags, tags } from "./schema";

export const recipesRelations = relations(recipes, ({one, many}) => ({
	usersInAuth: one(usersInAuth, {
		fields: [recipes.owner],
		references: [usersInAuth.id]
	}),
	user: one(users, {
		fields: [recipes.owner],
		references: [users.id]
	}),
	favorites: many(favorites),
	recipeTags: many(recipeTags),
}));

export const usersInAuthRelations = relations(usersInAuth, ({many}) => ({
	recipes: many(recipes),
	profiles_id: many(profiles, {
		relationName: "profiles_id_usersInAuth_id"
	}),
	profiles_id: many(profiles, {
		relationName: "profiles_id_usersInAuth_id"
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	recipes: many(recipes),
	favorites: many(favorites),
}));

export const favoritesRelations = relations(favorites, ({one}) => ({
	recipe: one(recipes, {
		fields: [favorites.recipeId],
		references: [recipes.id]
	}),
	user: one(users, {
		fields: [favorites.userId],
		references: [users.id]
	}),
}));

export const profilesRelations = relations(profiles, ({one}) => ({
	usersInAuth_id: one(usersInAuth, {
		fields: [profiles.id],
		references: [usersInAuth.id],
		relationName: "profiles_id_usersInAuth_id"
	}),
	usersInAuth_id: one(usersInAuth, {
		fields: [profiles.id],
		references: [usersInAuth.id],
		relationName: "profiles_id_usersInAuth_id"
	}),
}));

export const recipeTagsRelations = relations(recipeTags, ({one}) => ({
	recipe: one(recipes, {
		fields: [recipeTags.recipeId],
		references: [recipes.id]
	}),
	tag: one(tags, {
		fields: [recipeTags.tagId],
		references: [tags.id]
	}),
}));

export const tagsRelations = relations(tags, ({many}) => ({
	recipeTags: many(recipeTags),
}));