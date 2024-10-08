// Import required functions and types from drizzle-orm/pg-core
import { pgTable, integer, pgEnum, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// Define the enum for user roles
export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user']);

// Define the chats table schema
export const chats = pgTable("chats", {
        id: serial("id").primaryKey(),
        pdfName: text("pdf_name").notNull(),
        pdfUrl: text("pdf_url").notNull(),
        createdAt: timestamp("created_at").notNull().defaultNow(),
        userId: varchar("user_id", { length: 256 }).notNull(),
        fileKey: text("file_key").notNull(),
});

// Define the messages table schema
export const messages = pgTable("messages", {
        id: serial("id").primaryKey(),
        chatId: integer("chat_id").references(() => chats.id).notNull(),
        content: text("content").notNull(), // Corrected notNull method call
        createdAt: timestamp("created_at").notNull().defaultNow(),
        role: userSystemEnum('role').notNull(),
});
