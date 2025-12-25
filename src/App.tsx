import "./App.css";
import Footer from "./components/layout/footer";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { StrictMode } from "react";
function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <div className="d-flex flex-column min-vh-100 bg-body">
            <main className="flex-grow-1">
              <AppRoutes />
            </main>
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
}

export default App;
