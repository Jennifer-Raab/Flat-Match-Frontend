import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import TwoWayNav from "./Components/TwoWayNav";
import RequestList from "./Components/RequestList";
import OfferList from "./Components/OfferList";
import OfferDetail from "./Components/OfferDetail";
import RequestDetail from "./Components/RequestDetail";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<TwoWayNav />} />
          <Route path="/angebote" element={<OfferList />} />
          <Route path="/gesuche" element={<RequestList />} />
          <Route path="/angebot/:id" element={<OfferDetail />} />
          <Route path="/gesuch/:id" element={<RequestDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
