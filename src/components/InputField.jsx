// import PropTypes from 'prop-types';
// import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// import styled from 'styled-components';
// import DeleteIcon from '@/ic_delete.svg?react';
// import SendIcon from '@/ic_send_hov.svg?react';
// import SendNorIcon from '@/ic_send_nor.svg?react';
// import CheckIcon from '@/btn_check.svg?react';
// import { checkContainSpecialCharacters, validateEmail } from '../utils/regexUtils.js';
//
// const InputField = ({
//   width,
//   height,
//   placeholder,
//   type,
//   onChange,
//   onConfirm,
//   isFocus,
//   isDuplicated,
//   defaultValue,
//   ...restProps
// }) => {
//   const [value, setValue] = useState(defaultValue || '');
//   const inputRef = useRef(null);
//
//   const handleChange = useCallback(
//     event => {
//       setValue(event.target.value);
//       onChange && onChange(event.target.value);
//     },
//     [onChange],
//   );
//
//   const handleClear = useCallback(() => {
//     setValue('');
//     onChange && onChange('');
//     //inputRef.current.focus();
//   }, [onChange]);
//
//   const handleConfirm = useCallback(() => {
//     onConfirm && onConfirm();
//     if (!type.includes('EMAIL')) {
//       setValue('');
//     }
//   }, [onConfirm, type]);
//
//   const handleKeyDown = useCallback(
//     event => {
//       if (event.key === 'Enter') {
//         handleConfirm();
//       }
//       inputRef.current.focus();
//     },
//     [handleConfirm],
//   );
//
//   const hasRegexError = useMemo(
//     () => (type.includes('EMAIL') ? validateEmail(value).toString() : checkContainSpecialCharacters(value).toString()),
//     [value, type],
//   );
//
//   useEffect(() => {
//     if (isFocus) {
//       inputRef.current.focus();
//     }
//   }, [isFocus]);
//
//   return (
//     <Container>
//       <Wrapper
//         width={width}
//         height={height}
//         type={type}
//         error={(hasRegexError === 'true' || isDuplicated === 'true').toString()}
//         {...restProps}
//       >
//         <input
//           type={'text'}
//           value={value}
//           placeholder={placeholder}
//           onChange={handleChange}
//           onKeyDown={handleKeyDown}
//           ref={inputRef}
//         />
//         {type === 'BOX' || !value ? null : (
//           <DeleteIconWrapper>
//             <DeleteIcon tabIndex={1} onClick={handleClear} />
//           </DeleteIconWrapper>
//         )}
//         {value && hasRegexError === 'false' ? (
//           <>
//             {type === 'EMAIL' ? (
//               <CheckButton tabIndex={1} onClick={handleConfirm}>
//                 {isDuplicated === 'false' ? <CheckIcon width={'43px'} /> : 'Check'}
//               </CheckButton>
//             ) : (
//               <>{type === 'USERNAME' ? null : <SendIcon tabIndex={1} onClick={handleConfirm} />}</>
//             )}
//           </>
//         ) : (
//           <DisabledStyle type={type} value={value}>
//             {type === 'EMAIL' ? (
//               <CheckButton disabled>Check</CheckButton>
//             ) : (
//               <>{type === 'USERNAME' ? null : <SendNorIcon />}</>
//             )}
//           </DisabledStyle>
//         )}
//       </Wrapper>
//       {isDuplicated ? (
//         <ErrorText status={isDuplicated}>
//           {isDuplicated === 'true' ? 'This email already exists' : 'This email is available'}
//         </ErrorText>
//       ) : hasRegexError === 'true' ? (
//         <ErrorText>{type.includes('EMAIL') ? 'Invalid email format' : 'Invalid text format'}</ErrorText>
//       ) : null}
//     </Container>
//   );
// };
// export default InputField;
//
// InputField.propTypes = {
//   width: PropTypes.string,
//   height: PropTypes.string,
//   placeholder: PropTypes.string,
//   type: PropTypes.oneOf(['EMAIL', 'USERNAME', 'BOX', 'LINE', 'EMAIL_LOGIN']),
//   isFocus: PropTypes.bool,
//   isDuplicated: PropTypes.string,
//   onChange: PropTypes.func,
//   onConfirm: PropTypes.func,
//   defaultValue: PropTypes.string,
// };
//
// const Container = styled.div`
//   margin-bottom: 8px;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
// `;
//
// const Wrapper = styled.div`
//   /* Input */
//
//   /* Auto layout */
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   padding: 0;
//
//   width: ${({ width }) => width || '680px'};
//   border: ${({ type, error }) =>
//     type === 'BOX' ? (error === 'true' ? '1px solid #D15050' : '1px solid #2a82f0') : 'none'};
//   background-color: #ffffff;
//
//   > input {
//     width: calc(100% - 50px);
//     height: ${({ height }) => height || '32px'};
//     margin-left: ${({ type }) => (type === 'BOX' ? '10px' : 0)};
//     outline: none;
//     /* Line 1 */
//
//     border-bottom: ${({ type, error }) =>
//       type === 'BOX' ? 'none' : error === 'true' ? '1px solid #D15050' : '1px solid #cccccc'};
//     border-top: none;
//     border-left: none;
//     border-right: none;
//
//     /* Inside auto layout */
//     flex: none;
//     order: 0;
//     align-self: stretch;
//     flex-grow: 0;
//
//     font-family: Roboto;
//     font-size: 16px;
//     font-weight: 400;
//     line-height: 24px;
//     text-align: left;
//
//     &:focus {
//       border-bottom: ${({ type, error }) =>
//         type === 'BOX' ? 'none' : error === 'true' ? '1px solid #D15050' : '1px solid #2a82f0'};
//       border-top: none;
//       border-left: none;
//       border-right: none;
//     }
//   }
// `;
//
// const DeleteIconWrapper = styled.div`
//   position: relative;
//   right: 20px;
// `;
//
// const DisabledStyle = styled.div`
//   padding-left: ${({ type, value }) => (type === 'BOX' ? 0 : type.includes('EMAIL') && value ? 0 : '20px')};
// `;
//
// const ErrorText = styled.div`
//   /* error message */
//
//   width: 100%;
//   height: 18px;
//
//   font-family: 'Roboto';
//   font-style: normal;
//   font-weight: 400;
//   font-size: 12px;
//   line-height: 18px;
//   /* identical to box height, or 150% */
//
//   color: ${({ status }) => (status === 'false' ? '#2A82F0' : '#d15050')};
//
//   /* Inside auto layout */
//   flex: none;
//   order: 1;
//   flex-grow: 0;
// `;
//
// const CheckButton = styled.div`
//   /* Text btn */
//
//   box-sizing: border-box;
//
//   width: 69px;
//   height: 32px;
//   background: ${({ disabled }) => (disabled ? '#00000014' : '#FFFFFF')};
//   border: 1px solid rgba(0, 0, 0, 0.3);
//   border-radius: 4px;
//   padding: 6px 12px;
//
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//
//   cursor: pointer;
// `;
