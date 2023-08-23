import Title from "../../../components/Title";
import image from "../../../assets/Images/trailer.jpg";

const About = () => {
  // TO-DO: Add selcectCourseById to be able to populate students 
  // with respective video data
  return (
    <section className="about" id="about">
      <Title
        subTitle="learn more about what the course expects from you."
        mainTitle="About The Course"
      />
      <div className="about__container">
        <div className="about__image">
          <img
            src={image}
            alt="photo depicting about us"
            className="about__image--img"
          />
        </div>
        <div className="about__text">
          <h4 className="about__text--title">
            we are focus on taking your driving skills to the next level
          </h4>
          <p className="about__text--description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab incidunt
            consectetur illo nulla omnis obcaecati cum vero, hic totam cumque
            saepe itaque commodi molestiae recusandae! Sed voluptatum quo,
            deserunt hic temporibus enim incidunt fugit debitis error sequi eius
            quia quis. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus similique, hic distinctio rerum eum vitae voluptas eos
            adipisci. Animi quam iste ipsa eveniet quos, voluptatum consectetur
            sint! Modi magni fuga sequi officiis tempora inventore eveniet unde
            beatae, quas reprehenderit a! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quae, velit!
          </p>
        </div>
      </div>
      <br />
    </section>
  );
};

export default About;