import { getStartOfWeek } from "./time.utils.js";

export const storage = {
    eventIdToDelete: null,
    displayedWeekStart: getStartOfWeek(new Date()),
}
