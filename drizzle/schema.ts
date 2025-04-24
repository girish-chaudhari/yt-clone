import { pgTable, uniqueIndex, unique, uuid, text, timestamp, foreignKey, integer, primaryKey, pgEnum } from "drizzle-orm/pg-core"

export const reactionType = pgEnum("reaction_type", ['like', 'dislike'])
export const videoVisibility = pgEnum("video_visibility", ['public', 'private'])


export const categories = pgTable("categories", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	uniqueIndex("name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
	unique("categories_name_unique").on(table.name),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	clerkId: text("clerk_id").notNull(),
	name: text().notNull(),
	imageUrl: text("image_url").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	uniqueIndex("clerck_id_idx").using("btree", table.clerkId.asc().nullsLast().op("text_ops")),
	unique("users_clerk_id_unique").on(table.clerkId),
]);

export const playlists = pgTable("playlists", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	userId: uuid("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "playlists_user_id_users_id_fk"
		}).onDelete("cascade"),
]);

export const videos = pgTable("videos", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	title: text().notNull(),
	description: text(),
	userId: uuid("user_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	categoryId: uuid("category_id"),
	muxStatus: text("mux_status"),
	muxAssetId: text("mux_asset_id"),
	muxUploadId: text("mux_upload_id"),
	muxPlaybackId: text("mux_playback_id"),
	muxTrackId: text("mux_track_id"),
	muxTrackStatus: text("mux_track_status"),
	thumbnailUrl: text("thumbnail_url"),
	previewUrl: text("preview_url"),
	duration: integer().default(0).notNull(),
	visibility: videoVisibility().default('private').notNull(),
	thumbnailKey: text("thumbnail_key"),
	previewKey: text("preview_key"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "videos_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "videos_category_id_categories_id_fk"
		}).onDelete("set null"),
	unique("videos_mux_asset_id_unique").on(table.muxAssetId),
	unique("videos_mux_upload_id_unique").on(table.muxUploadId),
	unique("videos_mux_playback_id_unique").on(table.muxPlaybackId),
	unique("videos_mux_track_id_unique").on(table.muxTrackId),
]);

export const comments = pgTable("comments", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	videoId: uuid("video_id").notNull(),
	value: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	parentId: uuid("parent_id"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "comments_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.videoId],
			foreignColumns: [videos.id],
			name: "comments_video_id_videos_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.parentId],
			foreignColumns: [table.id],
			name: "comments_parent_id_fkey"
		}).onDelete("cascade"),
]);

export const playlistVideos = pgTable("playlist_videos", {
	playlistId: uuid("playlist_id").notNull(),
	videoId: uuid("video_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	primaryKey({ columns: [table.playlistId, table.videoId], name: "playlist_videos_pk"}),
]);

export const videoViews = pgTable("video_views", {
	userId: uuid("user_id").notNull(),
	videoId: uuid("video_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "video_views_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.videoId],
			foreignColumns: [videos.id],
			name: "video_views_video_id_videos_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.userId, table.videoId], name: "video_views_pk"}),
]);

export const subscriptions = pgTable("subscriptions", {
	viewerId: uuid("viewer_id").notNull(),
	creatorId: uuid("creator_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.viewerId],
			foreignColumns: [users.id],
			name: "subscriptions_viewer_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.creatorId],
			foreignColumns: [users.id],
			name: "subscriptions_creator_id_users_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.viewerId, table.creatorId], name: "subscriptions_pk"}),
]);

export const videoReactions = pgTable("video_reactions", {
	userId: uuid("user_id").notNull(),
	videoId: uuid("video_id").notNull(),
	type: reactionType().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "video_reactions_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.videoId],
			foreignColumns: [videos.id],
			name: "video_reactions_video_id_videos_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.userId, table.videoId], name: "video_reactions_pk"}),
]);

export const commentReactions = pgTable("comment_reactions", {
	userId: uuid("user_id").notNull(),
	commentId: uuid("comment_id").notNull(),
	type: reactionType().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "comment_reactions_user_id_users_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.commentId],
			foreignColumns: [comments.id],
			name: "comment_reactions_comment_id_comments_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.userId, table.commentId], name: "comment_reactions_pk"}),
]);
