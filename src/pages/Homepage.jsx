import Hero from "../components/Hero";
import About from "../components/About";
import CarouselComponent from "../components/Carousel";
import img1 from "/PDF/1.png";
import img2 from "/PDF/2.png";
import img3 from "/PDF/3.png";

const Homepage = () => {
  const description = `Entry-level driver training (ELDT) is required for drivers before obtaining a commercial driver's license (CDL).Prior to February 7, 2022, each state had its own commercial driver's license training requirements. To establish a single, national standard for obtaining your CDL, the Federal Motor Carrier Safety Association (FMCSA) has updated ELDT requirements. ELDT includes theory and behind-the-wheel training and must be completed with an FMCSA registered training program or provider–like TDI!`;

  const images = [img1, img2, img3];

  return (
    <>
      <CarouselComponent images={images} />
      <Hero description={description} subTitle="What is ELDT?" mainTitle="Entry Level Driving Class A" />
      <About />
    </>
  )
}

export default Homepage