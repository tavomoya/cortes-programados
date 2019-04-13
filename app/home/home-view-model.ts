import { Observable } from "tns-core-modules/data/observable";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Outage } from "./shared/outage";
import * as http from "tns-core-modules/http";
import { DateFormatter } from "../utils/date.formatter"

export class HomeViewModel extends Observable {
	outages: ObservableArray<Outage>


	constructor() {
		super();

		this.outages = new ObservableArray([]);

		this.getOutages();
	}

	private getOutages() {
		const today = new Date();
		console.log('dejame verte: ', JSON.stringify({
			date: DateFormatter.ISOStringWithoutTimeZone(today)
		}));
		http.request({
			method: 'POST',
			url: 'https://cortes-programados-api.herokuapp.com/outage/filter',
			content: JSON.stringify({
				date: DateFormatter.ISOStringWithoutTimeZone(today)
			})
		})
			.then((response: any) => {
				console.log("hola", response);
				const res = response.content && response.content.toJSON();
				res && res.forEach(outage => {
					this.outages.push({
						id: outage.id,
						province: outage.province,
						date: outage.date,
						company: outage.company,
						circuit: outage.circuit,
					});
				});
			})
			.catch((err: any) => {
				console.log("hello bitch", err);
			});

		// http.getJSON("https://cortes-programados-api.herokuapp.com/outage")
	}
}
