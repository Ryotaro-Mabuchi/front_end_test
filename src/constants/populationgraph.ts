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
  const r = (prefCode * 100) % 256;
  const g = (prefCode * 200) % 256;
  const b = (prefCode * 300) % 256;
  return `rgb(${r}, ${g}, ${b})`;
};
