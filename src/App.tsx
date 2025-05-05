import { Routes, Route } from 'react-router-dom';
import CharacterList from './pages/CharacterList';
import CharacterDetails from './pages/CharacterDetails';
import FavoritesList from './pages/FavoritesList';
import NotFound from './pages/NotFound';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
        <Route path="/favorites" element={<FavoritesList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
