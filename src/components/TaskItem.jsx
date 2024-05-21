import styled from 'styled-components';
import PropTypes from 'prop-types';
import RemoveIcon from '@/btn_remove_nor.svg?react';
import RemoveHoverIcon from '@/btn_remove_hov.svg?react';
import { useCallback, useState } from 'react';
import { patchTask } from '../services/tasks.js';
import { useToast } from '@chakra-ui/react'
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from '@chakra-ui/react'

const TaskItem = ({ id, contents, isDone, createdDate, modifiedDate, onChange, onDelete, fetchTasks }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [inContents, setInContents] = useState(contents || '');
  const [isHovered, setIsHovered] = useState(false);
  const { fireToast } = useToast();

  const handleChange = useCallback(() => {
    onChange && onChange();
  }, [onChange]);

  const handleDelete = useCallback(() => {
    onDelete && onDelete();
  }, [onDelete]);

  const handleChangeInput = useCallback(value => {
    setInContents(value);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (inContents === '' || inContents === contents) {
      setIsEditable(false);
      return;
    }
    await patchTask(id, { contents: inContents, isDone: isDone });
    fireToast({ content: 'Task has been modified' });
    await fetchTasks();
    setIsEditable(false);
  }, [inContents, contents, id, isDone, fireToast, fetchTasks]);

  return (
    <>
      {isEditable ? (
          <Editable defaultValue='Take some chakra'>
            <EditablePreview />
            <EditableInput />
          </Editable>
      ) : (
        <Box>
          <LeftBox>
            <input type="checkbox" checked={isDone} onChange={handleChange} />
            <Text tabIndex={0} onFocus={() => setIsEditable(!isDone)}>
              {contents}
            </Text>
          </LeftBox>
          <RightBox>
            <DateWrapper>
              <DateStyle>{createdDate}</DateStyle>
              <DateStyle>{modifiedDate}</DateStyle>
            </DateWrapper>
            <RemoveIconWrapper onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              {isHovered ? <RemoveHoverIcon onClick={handleDelete} /> : <RemoveIcon />}
            </RemoveIconWrapper>
          </RightBox>
        </Box>
      )}
    </>
  );
};
export default TaskItem;

TaskItem.propTypes = {
  id: PropTypes.number,
  contents: PropTypes.string,
  isDone: PropTypes.bool,
  createdDate: PropTypes.string,
  modifiedDate: PropTypes.string,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
  fetchTasks: PropTypes.func,
};

const Box = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  justify-content: space-between;

  background: #ffffff;
  border-radius: 4px;
  width: calc(100% - 32px);
  margin-bottom: 8px;
`;

const LeftBox = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  justify-content: flex-start;
`;

const Text = styled.span`
  /* Task 01 */
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  color: #000000;
  cursor: text;
`;

const RightBox = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  justify-content: flex-start;
`;

const DateStyle = styled.span`
  margin: 0 auto;
  width: 65px;
  height: 18px;

  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height, or 150% */

  color: #000000;

  opacity: 0.6;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
`;

const RemoveIconWrapper = styled.div``;
