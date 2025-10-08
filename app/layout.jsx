import "../assets/styles/global.scss";
import Footer from "../components/Footer.jsx";
import NavBar from "../components/NavBar.jsx";
import AuthProvider from "../components/authProvider.jsx";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "../context/GlobalContext.js";
import "photoswipe/dist/photoswipe.css";

export const metadata = {
  title: "PropertyPulse | Find the Perfect Rental",
  description: "Find your dream rental property.",
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <NavBar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
