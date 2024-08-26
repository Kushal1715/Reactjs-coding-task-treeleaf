import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Profiles from "./pages/Profiles";
import FormPage from "./pages/FormPage";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<FormPage />} />
            <Route path="/profiles" element={<Profiles />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
