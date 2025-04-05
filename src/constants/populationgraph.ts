export const chartSettings = {
  width: '100%', // 横幅
  height: 400, // 高さ
  margin: {
    // マージン
    top: 20,
    right: 30,
    left: 40,
    bottom: 5,
  },
  tickCount: 10, // 目盛り数
  strokeDasharray: '3 3', // グリッドの点線のスタイル
};

export const generateColorFromPrefCode = (prefCode: number): string => {
  const r = (prefCode * 100) % 256;
  const g = (prefCode * 200) % 256;
  const b = (prefCode * 300) % 256;
  return `rgb(${r}, ${g}, ${b})`;
};
