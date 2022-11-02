import { Dayjs } from "dayjs";

import { DayType } from "../days";

export interface Sprint {
	id: string;
	name: string;
	startDate: Dayjs;
	endDate: Dayjs;
	days: DayType[];
}