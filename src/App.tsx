import React from 'react';
import './App.css';
import Header from './components/Header';
import PrefectureList from './components/PrefectureSelect';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* 3つのコンポーネントで構成する */}
      <Header />
      <PrefectureList />
    </div>
  );
};

export default App;
