export function WeekRange(date) {
    if (!date) date = new Date().getTime();
    var dt = new Date(date);
    dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    dt = new Date(dt.getTime() - (dt.getDay() > 0 ? (dt.getDay() - 1) * 1000 * 60 * 60 * 24 : 6 * 1000 * 60 * 60 * 24));
    return { start: dt, end: new Date(dt.getTime() + 1000 * 60 * 60 * 24 * 7 - 1) };
}