type Components = {
	day: number,
	month: number,
	year: number
}

const paddingLeft = (str, paddingLength, paddingValue) => {
	return String(paddingValue + str).slice(-paddingLength);
};

export class DateFormatter {
	// 2018-11-11T00:00:00
	static ISOStringWithoutTimeZone = (date: Date): string => {
		const components = DateFormatter.format(DateFormatter.components(date))
		return `${components.year}-${components.month}-${components.day}T00:00:00Z`
	}

	static format = (components: Components) => {
		return {
			day: paddingLeft(`${components.day}`, 2, '0'),
			month: paddingLeft(`${components.month}`, 2, '0'),
			year: components.year
		}
	}

	static components = (date: Date): Components => {
		return {
			day: date.getDate(),
			month: date.getMonth() + 1,
			year: date.getFullYear()
		}
	}
}