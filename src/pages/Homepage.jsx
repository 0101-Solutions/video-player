import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Footer from "../components/Footer";

const Homepage = () => {
  const description = `Entry-level driver training (ELDT) is required for drivers before obtaining a commercial driver's license (CDL).Prior to February 7, 2022, each state had its own commercial driver's license training requirements. To establish a single, national standard for obtaining your CDL, the Federal Motor Carrier Safety Association (FMCSA) has updated ELDT requirements. ELDT includes theory and behind-the-wheel training and must be completed with an FMCSA registered training program or provider–like TDI!`;

  return (
    <>
      <Header />
      <Hero description={description} subTitle="What is ELDT?" mainTitle="CDL City Driving School" />
      <About />
      <Footer />
    </>
  )
}

export default Homepage