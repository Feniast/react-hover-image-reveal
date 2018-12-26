import PropTypes from 'prop-types';

export const commonProps = {
  shown: PropTypes.bool.isRequired,
  imgSrc: PropTypes.string.isRequired,
  onShown: PropTypes.func,
  onHidden: PropTypes.func
};

export const commonDefaultProps = {
  shown: false
};
