import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header component', () => {
  test('ヘッダーコンポーネントのテキストについて確認', () => {
    render(<Header />);
    const headerText = screen.getByText('都道府県別の人口推移グラフを表示する');
    expect(headerText).toBeInTheDocument();
  });
});
