export const getPageName = (pathname) => {
    let name;
    if(pathname === '/'){
        name = '나만의 스토리로 문제 만들기'
    } else if(pathname === '/login'){
        name = '로그인'
    } else if(pathname === '/signup'){
        name = '회원가입'
    } else if(pathname === '/solving'){
        name = '문제 풀어보기'
    }
    return name;
};

export const getABCDE = (problem) => {
    const cleanedInput = problem.replace(/\n/g, '');
    const [part1, rest1] = cleanedInput.split('A)');
    const [part2, rest2] = rest1.split('B)');
    const [part3, rest3] = rest2.split('C)');
    const [part4, rest4] = rest3.split('D)');
    const [part5, rest] = rest4.split('E)');

    return {
        contents: part1.trim(),    // 앞쪽 문자열
        contentsA: part2.trim(),  // A)와 B) 사이의 문자열
        contentsB: part3.trim(),  // B) 이후의 문자열
        contentsC: part4.trim(),  // B) 이후의 문자열
        contentsD: part5.trim(),  // B) 이후의 문자열
        contentsE: rest.trim()   // B) 이후의 문자열
    };
}
