import { IconChevronRight } from '@tabler/icons-react';
import { numberWithCommas } from '../../utils/numberCommasFormat';

type MealMacronutrientBlockProps = {
  title: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
};

export function MealMacronutrientBlock({
  title,
  calories,
  protein,
  fat,
  carbs,
}: MealMacronutrientBlockProps) {
  return (
    <div>
      <span className="font-semibold">{title}</span>
      <div className="flex  items-center">
        <div className="w-fit rounded-xl bg-[#ed8537] px-6 py-3">
          <div className="flex min-w-[130px] flex-col items-center text-white">
            <span className="text-4xl font-bold">
              {numberWithCommas(calories)}
              <span className="text-xl">cal</span>
            </span>
            <span className=" font-semibold text-[#f7c7b3]">calories</span>
          </div>
        </div>
        <IconChevronRight className="h-10 w-10" />
        <div className="flex min-w-[310px] items-center rounded-xl bg-[#ed8537] py-5 text-white">
          <div className="flex w-1/3 flex-col items-center border-r-[0.5px]">
            <span className="text-3xl font-bold">{`${protein}g`}</span>
            <span className="text-sm font-semibold text-[#f7c7b3]">
              protein
            </span>
          </div>
          <div className="flex w-1/3 flex-col items-center border-x-[0.5px]">
            <span className="text-3xl font-bold">{`${fat}g`}</span>
            <span className="text-sm font-semibold text-[#f7c7b3]">fats</span>
          </div>
          <div className="flex w-1/3 flex-col items-center border-l-[0.5px]">
            <span className="text-3xl font-bold">{`${carbs}g`}</span>
            <span className="text-sm font-semibold text-[#f7c7b3]">carbs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
