import { Resort } from "./resort";
import { User } from "./user";

export interface Favorite {
  id: number;
  userId: number;
  resortId: number;
  user?: User;
  resort?: Resort;
  createdAt: string;
}

export interface CreateFavoriteDto {
  userId: number;
  resortId: number;
}
