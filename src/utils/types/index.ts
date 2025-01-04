import { ReactNode } from "react";

export interface ChildProps {
  children: ReactNode;
}

export interface CardListProps {
  images: string;
  title: string;
  description: string;
  tags: { quantity: string; label: string }[];
  number: string;
}
