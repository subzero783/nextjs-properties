import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";

export const metadata = {
  title: "Home Page",
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  );
};

export default HomePage;
