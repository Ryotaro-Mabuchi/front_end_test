import React from 'react';

// タイトル部分のコンポーネント
const Header: React.FC = () => {
  return (
    <header style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h1>都道府県別の総人口推移グラフを表示する</h1>
    </header>
  );
};

export default Header;
