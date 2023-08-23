import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Footer from "../components/Footer";

import CoursesList from "../redux/features/course/CoursesList";

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <CoursesList />
      <Footer />
    </>
  )
}

export default HomePage