export function compute(y, m, d) {
  const birth = new Date(y, m - 1, d);
  const now = new Date();

  let ageInYears = now.getFullYear() - birth.getFullYear();
  let ageInMonths = now.getMonth() - birth.getMonth();
  let ageInDays = now.getDate() - birth.getDate();

  if (ageInMonths < 0 || (ageInMonths === 0 && ageInDays < 0)) {
    ageInYears--;
    ageInMonths += 12;
  }

  if (ageInDays < 0) {
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth(), 0);
    ageInDays += lastMonthDate.getDate();
    ageInMonths--;
  }

  return { year: ageInYears, month: ageInMonths, day: ageInDays };
}
