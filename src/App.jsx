import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView"; 
import PeliculasView from "./views/PeliculasView";
import CategoriesView from "./views/CategoriesView";
import CreateCategoryView from "./views/CreateCategorieView";
import UpdateCategoryView from "./views/UpdateCategorieView";
import CreateMoviesView from "./views/CreateMoviesView";
import UpdateMoviesView from "./views/UpdateMoviesView";
import RatingsView from "./views/RatingsView";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navbar />

      <main className="flex-1 container mx-auto p-4">
        <Routes>
          {/* Ruta Login */}
          <Route path="/login" element={<LoginView />} />
          <Route path="/movies" element={<PeliculasView />} />
          <Route path="/categories" element={<CategoriesView />} />
          <Route path="/ratings" element={<RatingsView />} />
          <Route path="/categories/admin/create" element={<CreateCategoryView />} />
          <Route path="/categories/admin/update/:id" element={<UpdateCategoryView/>}/>
          <Route path="/movies/admin/create/" element={<CreateMoviesView/>}/>
          <Route path="/movies/admin/update/:id" element={<UpdateMoviesView/>}/>
          {/* Ruta principal */}
          <Route
            path="/"
            element={
              <h1 className="text-xl">
                Bienvenido a Movies Rating. Para poder calificar las películas
                debes loguearte primero
              </h1>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;