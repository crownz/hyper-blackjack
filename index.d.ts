declare module '*.css' {
  const content: any;
  export = content;
}

interface Card {
  id: string;
  value: number;
  title: string;
  optionalValues?: number[];
  lowestValue?: number;
  isHidden?: boolean;
}
