import styled from 'styled-components';

const Error = () => {
  return (
    <Container>
      Error
    </Container>
  );
};

export default Error;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 50%;
  transform: translateY(-50%);
`;
