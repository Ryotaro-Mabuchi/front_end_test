export const chartSettings = {
  width: '100%',
  height: 400,
  margin: {
    top: 20,
    right: 30,
    left: 40,
    bottom: 5,
  },
  Xaxistickcount: 10,
  Xaxislabel: {
    value: '年度',
    position: 'insideBottomRight',
    offset: -10,
    fontSize: 14,
  },
  strokeDasharray: '3 3',
};

export const generateColorFromPrefCode = (prefCode: number): string => {
  const h = (prefCode * 7) % 360;
  const s = 80;
  const l = 60;

  return `hsl(${h}, ${s}%, ${l}%)`;
};
