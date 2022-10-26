import { Metadata } from "./Metatdata";

export interface Player {
  id: string;
  connectionId: string;
  role: "GM" | "PLAYER";
  selection?: string[];
  name: string;
  color: string;
  syncView: boolean;
  metadata: Metadata;
}
