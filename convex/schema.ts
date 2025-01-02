import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    name: v.string(),
    phone: v.string(),
    email: v.string(),
    password: v.string(),
    address: v.string(),
    role: v.string(),
    createdAt: v.string(),
  }),
  loads: defineTable({
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
  }),
});