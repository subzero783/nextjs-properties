import "@/assets/styles/global.scss";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import AuthProvider from "@/components/authProvider";

export const metadata = {
  title: "PropertyPulse | Find the Perfect Rental",
  description: "Find your dream rental property.",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
