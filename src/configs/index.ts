export type TLevel = {
  id: "facile" | "normale" | "difficile";
  label: string;
  mouseCount: number;
  mousePerHole: number;
};
export const levels: TLevel[] = [
  {
    id: "facile",
    label: "Facile",
    mouseCount: 1,
    mousePerHole: 1,
  },
  {
    id: "normale",
    label: "Normale",
    mouseCount: 2,
    mousePerHole: 1,
  },
  {
    id: "difficile",
    label: "Difficile",
    mouseCount: 3,
    mousePerHole: 1,
  },
];
