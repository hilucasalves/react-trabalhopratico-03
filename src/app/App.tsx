import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import TelaDespesas from './TelaDespesas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/despesas/:anoMes" element={<TelaDespesas />} />
        <Route path="/" element={<Navigate to="/despesas/2021-06" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
