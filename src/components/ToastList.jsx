import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toastState } from '../stores/atoms.js';
import { useRecoilValue } from 'recoil';
import DeleteIcon from '@/ic_delete_white.svg?react';
import useToast from '../hooks/useToast.js';
import { useCallback } from 'react';

const ToastItem = ({ id, content }) => {
  const { removeToast } = useToast();

  const handleDelete = useCallback(() => {
    removeToast(id);
  }, [id, removeToast]);

  return (
    <Wrapper>
      {content}
      <DeleteIcon onClick={handleDelete} />
    </Wrapper>
  );
};

ToastItem.propTypes = {
  id: PropTypes.number,
  content: PropTypes.string,
};

const ToastList = () => {
  const toasts = useRecoilValue(toastState);

  return (
    <Container>
      {toasts?.map(toast => (
        <ToastItem key={toast?.id} id={toast?.id} content={toast?.content} />
      ))}
    </Container>
  );
};
export default ToastList;

const Container = styled.div`
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  position: fixed;
  z-index: 1000;
  width: 600px;
`;

const Wrapper = styled.div`
  background-color: #000000cc;
  color: #ffffff;
  width: 100%;
  height: 56px;

  font-family: Noto Sans KR;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 6px;
  padding: 0 20px 0 20px;
  margin-top: 14px;
`;
