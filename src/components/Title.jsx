import PropTypes from 'prop-types';

const Title = ({ subTitle, mainTitle }) => {
  return (
    <div className="title">
      <p className="title__sub">{subTitle}</p>
      <h3 className="title__main">{mainTitle}</h3>
    </div>
  );
};

Title.propTypes = {
  subTitle: PropTypes.string.isRequired,
  mainTitle: PropTypes.string.isRequired,
}

export default Title;