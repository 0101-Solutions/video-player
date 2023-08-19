import HeroSlide from "./HeroSlide";

const Hero = () => {
  const dummyText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus iste saepe vitae quia architecto voluptatem nulla autem, fugit quaerat molestiae magni consequatur aliquid ex. Maiores illo amet porro eius! Porro.";
  return (
    <div className="hero">
      <HeroSlide
        subTitle="Welcome to CDL City Driving School"
        mainTitle="Where we turn newbies to professional drivers"
        description={dummyText}
      />
    </div>
  );
};

export default Hero;