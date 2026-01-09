export type PasteVisibility = 'public' | 'unlisted' | 'private';

export interface Paste {
  id: string;
  title?: string;
  content: string;
  visibility: PasteVisibility;
  expiresAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  userId?: string;
  user?: {
    id: string;
    username: string;
  };
}

export interface CreatePasteInput {
  title?: string;
  content: string;
  visibility?: PasteVisibility;
  expiresAt?: Date | string | null;
}

export interface UpdatePasteInput {
  title?: string;
  content?: string;
  visibility?: PasteVisibility;
  expiresAt?: Date | string | null;
}
