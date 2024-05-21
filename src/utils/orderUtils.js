export const sortByRule = (arr, latest) => {
  return latest === 'LATEST'
    ? arr?.sort((a, b) => new Date(b?.createdDate) - new Date(a?.createdDate))
    : arr?.sort((a, b) => new Date(a?.createdDate) - new Date(b?.createdDate));
};
