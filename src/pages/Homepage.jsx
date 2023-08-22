import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Footer from "../components/Footer";
import CoursesList from "../redux/features/course/CoursesList";

const Homepage = () => {
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

export default Homepage