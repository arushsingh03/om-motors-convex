import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
  args: {
    currentLocation: v.string(),
    destinationLocation: v.string(),
    weight: v.number(),
    weightUnit: v.string(),
    truckLength: v.number(),
    lengthUnit: v.string(),
    contactNumber: v.string(),
    email: v.string(),
    coordinates: v.object({
      current: v.object({
        latitude: v.number(),
        longitude: v.number(),
      }),
      destination: v.object({
        latitude: v.number(),
        longitude: v.number(),
      }),
    }),
    createdAt: v.string(),
  },
  handler: async (ctx, args) => {
    const load = await ctx.db.insert("loads", args);
    return load;
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("loads").collect();
  },
});
