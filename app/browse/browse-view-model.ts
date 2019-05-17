import { Observable } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Outage } from "../home/shared/outage";
import * as http from "tns-core-modules/http";
import { DateFormatter } from "../utils/date.formatter";
import { WeekRange } from "../utils/date.utils";

export class BrowseViewModel extends Observable {

    outages: ObservableArray<Outage>;

    constructor() {
        super();

        this.outages = new ObservableArray([]);
		this.getOutages();
    }

    private getOutages() {
		const today = new Date();
		const week = WeekRange(today);

		console.log('dejame verte: ', JSON.stringify({
			date: {
				'$gte': DateFormatter.ISOStringWithoutTimeZone(week.start),
				'$lte': DateFormatter.ISOStringWithoutTimeZone(week.end)
			}
		}));
		http.request({
			method: 'POST',
			url: 'https://cortes-programados-api.herokuapp.com/outage/filter',
			content: JSON.stringify({
				date: {
					'$gte': DateFormatter.ISOStringWithoutTimeZone(week.start),
					'$lte': DateFormatter.ISOStringWithoutTimeZone(week.end)
				}
			})
		})
			.then((response: any) => {
				console.log("hola", response);
				const res = response.content && response.content.toJSON();
				const outages: Array<Outage> = [];
				res && res.forEach(outage => {
					outages.push({
						id: outage.id,
						province: outage.province,
						date: new Date(outage.date),
						company: outage.company,
						circuit: outage.circuit,
					});
				});

				outages.sort((a, b) => a.date.getTime() - b.date.getTime())
				this.outages.push(outages);
			})
			.catch((err: any) => {
				console.log("hello bitch", err);
			});

		// http.getJSON("https://cortes-programados-api.herokuapp.com/outage")
	}
}
