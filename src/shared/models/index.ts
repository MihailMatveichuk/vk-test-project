export type CardType = {
  id: string;
  breeds: {
    name: string;
    description: string;
  }[];
  url: string;
};

export type EditData = {
  name: string;
  description: string;
};
