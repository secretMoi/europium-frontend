import {Component} from "@angular/core";

@Component({ template: '' })
export abstract class BaseComponent {
	public trackById(_: any, item: { id: number }): number {
		return item.id;
	}
}
