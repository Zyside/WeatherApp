import React from 'react';
import { DefaultLayout } from '../components/templates/DefaultLayout';
import { HomePage } from '../components/pages/HomePage';

const App: React.FC = () => {
  return (
    <DefaultLayout>
      <HomePage />
    </DefaultLayout>
  );
};
export default App;
