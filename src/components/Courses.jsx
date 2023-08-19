import Title from "./Title";
import Course from "./Course";
import img from "../assets/Images/img-1.jpg";
import img2 from "../assets/Images/img-2.jpg";

const Courses = () => {
  const dummyText =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum corrupti iusto reprehenderit similique natus mollitia dolorum fuga quam minima fugit.";
  return (
    <section className="courses" id="courses">
      <Title
        subTitle="we have a variety of courses to make you drive your dream car"
        mainTitle="browse our courses"
      />
      <Course
        img={img}
        title="driving for absolute beginners"
        description={dummyText}
        instructorName="kevin johnson"
        numRatings={4.7}
        numStudents={180}
        numHours={500}
        numLectures={35}
        level="beginners"
        price="500"
      />

      <Course
        img={img2}
        title="advanced truck driving techniques"
        description={dummyText}
        instructorName="elvis powell"
        numRatings={3}
        numStudents={80}
        numHours={500}
        numLectures={35}
        level="experts"
        price="900"
      />
    </section>
  );
};
export default Courses;

// turn each card into a link so that it can be clicked for more details