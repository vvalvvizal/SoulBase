import { SBTItem } from '@soulBase/ui/src/components/templates/SBTItem.tsx';

export default function SBTItempage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">선수 업적 보기</h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">야구선수의 SBT 업적을 확인하세요</p>
      </div>

      <SBTItem />
    </div>
    </div>
  );
}
