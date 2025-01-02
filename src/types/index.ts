import { Id } from "../../convex/_generated/dataModel";

export interface Load {
    id: string;
    currentLocation: string;
    destinationLocation: string;
    weight: number;
    weightUnit: 'kg' | 'ton';
    truckLength: number;
    lengthUnit: 'm' | 'ft';
    contactNumber: string;
    email: string;
    createdAt: Date;
    coordinates: {
      current: { latitude: number; longitude: number };
      destination: { latitude: number; longitude: number };
    };
  }
  
  export interface User {
    _id: Id<"users">;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: 'admin' | 'user';
    createdAt: string;
  }
  
  export interface SearchDates {
    from: Date | null;
    to: Date | null;
  }