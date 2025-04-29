import { useEffect, useState } from 'react';
import { useTransition, animated, config } from '@react-spring/web';

export interface IScrollTextProps {
  items: string[];
  className?: string;
}

export const ScrollText = ({ items, className }: IScrollTextProps) => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelected((prev) => (prev + 1) % items.length);
    }, 2000);
    //2초마다 변경

    return () => {
      clearInterval(interval);
    };
  }, [items.length]);

  const markers = useTransition([items[selected]], {
    keys: (item) => item,
    from: { opacity: 0, transform: 'translateY(-6px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    config: config.wobbly,
  });

  return (
    <div className="inline-block">
      {markers((style, item) => (
        <animated.div
          className={`text-2xl font-bold ${className}`}
          style={style}
        >
          {item}
        </animated.div>
      ))}
    </div>
  );
};
export const TokenInput = () => {
    return (<div></div>);
};
