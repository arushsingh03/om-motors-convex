import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

interface User {
    _id: Id<"users">;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: "admin" | "user";
    createdAt: string;
}

export const getUser = query({
    args: {},
    handler: async (ctx) => {
        const user = await ctx.db.query("users").first();
        return user;
    },
});

export const getUserById = query({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        return user;
    },
});

export const getAllUsers = query({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query("users").collect();
        return users;
    },
});

export const register = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        password: v.string(),
        phone: v.string(),
        address: v.string(),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), args.email))
            .first();

        if (existingUser) {
            throw new Error("Email already registered");
        }

        const userId = await ctx.db.insert("users", {
            ...args,
            role: "user",
            createdAt: new Date().toISOString(),
        });

        return userId;
    },
});

export const login = mutation({
    args: {
        email: v.string(),
        password: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), args.email))
            .first();

        if (!user || user.password !== args.password) {
            throw new Error("Invalid credentials");
        }

        return user;
    },
});

export const updateProfile = mutation({
    args: {
        userId: v.id("users"),
        name: v.optional(v.string()),
        phone: v.optional(v.string()),
        address: v.optional(v.string()),
        password: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const { userId, ...updates } = args;

        const user = await ctx.db.get(userId);
        if (!user) throw new Error("User not found");

        await ctx.db.patch(userId, updates);
        return await ctx.db.get(userId);
    },
});

export const updateUserRole = mutation({
    args: {
        userId: v.id("users"),
        role: v.union(v.literal("admin"), v.literal("user")),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user) throw new Error("User not found");

        await ctx.db.patch(args.userId, { role: args.role });
        return await ctx.db.get(args.userId);
    },
});

export const deleteUser = mutation({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user) throw new Error("User not found");

        await ctx.db.delete(args.userId);
        return true;
    },
});