// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
//
// const DropDown = ({ onChange }) => {
//   const [selected, setSelected] = useState('OLDEST');
//
//   const handleChangeSelect = event => {
//     setSelected(event.target.value);
//     onChange && onChange(event.target.value);
//   };
//
//   return (
//     <Container>
//       <SelectStyle id={'dropdown__01'} value={selected} onChange={handleChangeSelect}>
//         <OptionStyle value={'OLDEST'}> Oldest </OptionStyle>
//         <OptionStyle value={'LATEST'}> Latest </OptionStyle>
//       </SelectStyle>
//     </Container>
//   );
// };
//
// export default DropDown;
//
// DropDown.propTypes = {
//   onChange: PropTypes.func,
// };
//
// const Container = styled.div`
//   /* Dropdown */
//
//   /* Auto layout */
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   padding: 15px 12px;
//   gap: 34px;
//
//   background: #ffffff;
//   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
//   border-radius: 4px;
//
//   width: 120px;
// `;
//
// const SelectStyle = styled.select`
//   border: 0;
//   width: calc(100% + 24px);
//   height: 40px;
//
//   /* Oldest */
//
//   font-family: 'Roboto';
//   font-style: normal;
//   font-weight: 400;
//   font-size: 16px;
//   line-height: 20px;
//   /* identical to box height, or 125% */
//
//   color: #000000;
//
//   & option:checked {
//     background-color: rgba(42, 130, 240, 0.1);
//
//     /* Oldest */
//     font-family: 'Roboto';
//     font-style: normal;
//     font-weight: 400;
//     font-size: 16px;
//     line-height: 20px;
//     color: #2a82f0;
//   }
// `;
//
// const OptionStyle = styled.option`
//   /* Auto layout */
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   padding: 12px;
//
//   position: absolute;
//   width: 1000px;
//   height: 40px;
//
//   /* Inside auto layout */
//   flex: none;
//   order: 1;
//   flex-grow: 0;
//
//   border: 0;
//
//   /* Oldest */
//   font-family: 'Roboto';
//   font-style: normal;
//   font-weight: 400;
//   font-size: 16px;
//   line-height: 20px;
//   /* identical to box height, or 125% */
//
//   color: #000000;
//
//   /* Inside auto layout */
//   flex: none;
//   order: 0;
//   flex-grow: 0;
// `;
