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
