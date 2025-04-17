import { ScrollText } from '../molecules/ScrollText';
import { BaseballIcon } from '../atmos/Baseballicon';

export interface ILogoProps {}

export const Logo = () => {
  return (
    <div className="relative flex items-center gap-2">
      <BaseballIcon />
      <div className="z-10 text-xl font-semibold">
        <div>SoulBase</div>
        <div className="text-xs text-gray">vvalvvizal</div>
      </div>

      <div className="absolute top-0 z-20 px-1 mb-4 -translate-y-1/2 left-full">
        <ScrollText
          items={['1', '2', '3', '4', '5', '6', '7']}
          className="px-2 text-xs font-semibold text-black border border-white rounded shadow-xl bg-white/30 backdrop-black"
        />
      </div>
    </div>
  );
};
