import PropTypes from 'prop-types';

export const Button = ({type='button', children, disabled = false}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="btn"
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};
