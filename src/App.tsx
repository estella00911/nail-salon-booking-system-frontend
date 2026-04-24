import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import { HomePage, LoginPage, RegisterPage, ServicesPage, BookingPage } from "./pages";
import { ProtectedRoute } from "./routes";

function App() {
  return (<>
    <Routes>
      <Route element={<MainLayout />}>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/services" element={<ServicesPage />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/booking" element={<BookingPage />} />
        </Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;