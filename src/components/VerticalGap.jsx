import styled from 'styled-components';
import PropTypes from 'prop-types';

const VerticalGap = ({ gap }) => {
  return <GapStyle gap={gap} />;
};

export default VerticalGap;

VerticalGap.propTypes = {
  gap: PropTypes.string,
};

const GapStyle = styled.div`
  padding-right: ${({ gap }) => gap};
`;
