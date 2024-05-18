export type TOriginPrizeItem = {
  name: string;
};

export type TPrizeList = TOriginPrizeItem[];

export type TShowList = {
  name: string;
  itemType: 'button' | 'prize';
}[];

export type TLuckDrawInterface = {
  prizeList: TPrizeList;
  drawType: 'NINE_LATTICE';
};
