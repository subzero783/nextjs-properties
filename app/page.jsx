import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";

export const metadata = {
  title: "Home Page",
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
    </>
  );
};

export default HomePage;
