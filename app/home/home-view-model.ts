import { Observable } from "tns-core-modules/data/observable";
import {ObservableArray} from "tns-core-modules/data/observable-array";
import { Item } from "./shared/item";
import { Outage } from "./shared/outage";
import * as http from "tns-core-modules/http";

export class HomeViewModel extends Observable {
    items: Array<Item>;
    outages: ObservableArray<Outage>


    constructor() {
        super();

        this.items = new Array<Item>(
            {
                name: "Item 1",
                description: "Description for Item 1"
            },
            {
                name: "Item 2",
                description: "Description for Item 2"
            },
            {
                name: "Item 3",
                description: "Description for Item 3"
            },
            {
                name: "Item 4",
                description: "Description for Item 4"
            },
            {
                name: "Item 5",
                description: "Description for Item 5"
            },
            {
                name: "Item 6",
                description: "Description for Item 6"
            },
            {
                name: "Item 7",
                description: "Description for Item 7"
            },
            {
                name: "Item 8",
                description: "Description for Item 8"
            },
            {
                name: "Item 9",
                description: "Description for Item 9"
            },
            {
                name: "Item 10",
                description: "Description for Item 10"
            },
            {
                name: "Item 11",
                description: "Description for Item 11"
            },
            {
                name: "Item 12",
                description: "Description for Item 12"
            },
            {
                name: "Item 13",
                description: "Description for Item 13"
            },
            {
                name: "Item 14",
                description: "Description for Item 14"
            },
            {
                name: "Item 15",
                description: "Description for Item 15"
            },
            {
                name: "Item 16",
                description: "Description for Item 16"
            }
        );

        this.outages = new ObservableArray([]);

        this.getOutages();
    }

    private getOutages() {
        console.log("hola")
        http.getJSON("https://cortes-programados-api.herokuapp.com/outage")
        .then((res: any) => {
            console.log("hey!!", res[0]);
            res.forEach(outage => {
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
    }
}
