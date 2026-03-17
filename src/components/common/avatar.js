import PropTypes from 'prop-types';

export const Avatar = ({src, alt='avatar'}) => {
  return (
    <img
      src={src}
      alt={alt}
      width="40"
      height="40"
    />
  );
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
