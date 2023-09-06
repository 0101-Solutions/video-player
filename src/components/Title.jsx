import PropTypes from 'prop-types';

const Title = ({ mainTitle }) => {
  return (
    <div className="title">
      <h3 className="title__main">{mainTitle}</h3>
    </div>
  );
};

Title.propTypes = {
  mainTitle: PropTypes.string.isRequired,
}

export default Title;