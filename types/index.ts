export type Gallery = {
  id: number;
  title: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Role = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Photo = {
  id: number;
  userId: number | null;
  url: string;
  type: string | null;
  createdAt: Date;
  updatedAt: Date;
};
