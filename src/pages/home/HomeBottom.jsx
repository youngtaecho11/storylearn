import styled from 'styled-components';
import ArrowUpIcon from '@/ic_arrow_up.svg?react';
import ArrowDownIcon from '@/ic_arrow_down.svg?react';
import { useCallback, useEffect } from 'react';
import { deleteTask, patchTask } from '../../services/tasks.js';
import TaskItem from '../../components/TaskItem.jsx';
import { toLocaleDate } from '../../utils/dateUtils.js';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../../../public/fonts/dropdown.css';
import { useToast } from '@chakra-ui/react'
import { deleteAllTasksByMemberId } from '../../services/members.js';
import logo from '@/logo.png';

const options = [
  { label: 'Oldest', value: 'OLDEST' },
  { label: 'Latest', value: 'LATEST' },
];
const defaultOption = options[0];

const HomeBottom = ({ tasks, fetchTasks, handleChangeDropdown, memberId }) => {
  const { fireToast } = useToast();

  const onClickCheckbox = useCallback(
    async task => {
      await patchTask(task?.id, { contents: task?.contents, isDone: !task?.isDone });
      if (task?.isDone !== true) {
        fireToast({ content: 'Task has been completed' });
      }
      await fetchTasks();
    },
    [fetchTasks, fireToast],
  );

  const onClickDeleteIcon = useCallback(
    async id => {
      await deleteTask(id);
      fireToast({ content: 'Task has been deleted' });
      await fetchTasks();
    },
    [fetchTasks, fireToast],
  );

  const onClickAllDelete = useCallback(async () => {
    if (confirm('전체 삭제하시겠습니까?')) {
      await deleteAllTasksByMemberId(memberId);
      fireToast({ content: 'All tasks have been deleted' });
      await fetchTasks();
    }
  }, [fetchTasks, fireToast, memberId]);

  useEffect(() => {
    (async () => await fetchTasks())();
  }, [fetchTasks]);

  return (
    <Container>
      {tasks?.length ? (
        <>
          <Wrapper>
            <DropdownWrapper>
              <Dropdown
                options={options}
                onChange={event => handleChangeDropdown(event.value)}
                value={defaultOption}
                arrowClosed={<ArrowDownIcon />}
                arrowOpen={<ArrowUpIcon />}
              />
              <BtnStyle onClick={onClickAllDelete}> clear all </BtnStyle>
            </DropdownWrapper>
            {tasks?.map(task => (
              <TaskItem
                key={task?.id}
                id={task?.id}
                contents={task?.contents}
                isDone={task?.isDone}
                createdDate={toLocaleDate(task?.createdDate)}
                modifiedDate={toLocaleDate(task?.modifiedDate)}
                onChange={() => onClickCheckbox(task)}
                onDelete={() => onClickDeleteIcon(task?.id)}
                fetchTasks={fetchTasks}
              />
            ))}
          </Wrapper>
        </>
      ) : (
        <>
          <IconWrapper>
              <img src={logo} alt="logo"/>
          </IconWrapper>
        </>
      )}
    </Container>
  );
};

export default HomeBottom;

HomeBottom.propTypes = {
  tasks: PropTypes.array,
  fetchTasks: PropTypes.func,
  handleChangeDropdown: PropTypes.func,
  memberId: PropTypes.string,
};

const Container = styled.div`
  width: 100%;
  min-height: 800px;
  background: #f4f4f4;
`;

const Wrapper = styled.div`
  padding: 24px 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  height: 40px;
  padding-bottom: 16px;
`;

const BtnStyle = styled.div`
  /* Text btn */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 10px;

  border-radius: 4px;
`;

const IconWrapper = styled.div`
  min-height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
