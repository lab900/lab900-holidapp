export interface ApprovedHoliday {
  email: string;
  dates: ApprovedHolidayDate[];
}

interface ApprovedHolidayDate {
  // date in yyyy-mm-dd format
  date: string;
  // duration in seconds
  duration: number;
}
