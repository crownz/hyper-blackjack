declare module '*.css' {
  const content: any;
  export = content
}

interface Card {
  value: number | number[],
  id: string;
  title: string;
  isOpen?: boolean;
}