import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export const useDialogState = (defaultState = false) => {
  const [open, setOpen] = useState(defaultState); // 다이얼로그 기본 값은 false

  const pathname = useLocation().pathname; //현재 페이지 경로
  const initialPathname = useRef(pathname); // 컴포넌트가 처음 렌더링된 시점의 경로를 저장해두는 변수

  useEffect(() => {
    //경로가 바뀌면
    if (pathname !== initialPathname.current) {
      setOpen(false); //다이얼로그 닫음
      initialPathname.current = pathname; //현재 경로를 업데이트
    }
  }, [pathname, open]);

  return [open, setOpen] as const;
};
