import styled from 'styled-components';
import PropTypes from 'prop-types';

const HorizontalGap = ({ gap }) => {
  return <GapStyle gap={gap} />;
};

export default HorizontalGap;

HorizontalGap.propTypes = {
  gap: PropTypes.string,
};

const GapStyle = styled.div`
  padding-bottom: ${({ gap }) => gap};
`;
