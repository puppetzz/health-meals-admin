export const getBMIStatus = (bmi: number) => {
  if (bmi < 18.5) return "thiếu cân(gầy)";

  if (bmi >= 18.5 && bmi < 25) return "bình thường";

  if (bmi >= 25 && bmi < 30) return "thừa cân";

  if (bmi >= 30) return "béo phì";
};
