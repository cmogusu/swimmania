import type { MetadataData } from "@/server/types";
import type { IMetadataType, MetadataValue, ParentTypeInputs } from "../types";
import { BaseMetadataType } from "./BaseMetadataType";

export class ParentType extends BaseMetadataType {
	// biome-ignore lint/suspicious/noExplicitAny: TODO - find better solution for this
	[key: string]: any;
	children: IMetadataType[] = [];

	constructor(inputs: ParentTypeInputs) {
		super(inputs);

		this.type = "parent";
		this.setChildren(inputs.children);
	}

	setChildren(children?: IMetadataType[]) {
		if (!children) {
			throw Error("Children not set");
		}

		this.children = children;
		this.children.forEach((child) => {
			const childName = child.name;
			if (this[childName]) {
				throw Error("Metadata child name already set");
			}

			this[childName] = child;
			child.name = `${this.name}.${child.name}`;
			child.parent = this;
		});
	}

	get value(): MetadataValue {
		throw Error("Getting parent value not permitted");
	}

	set value(_v: unknown) {
		throw Error("Editing parent value not permitted");
	}

	get dbValue(): MetadataData[] {
		return this.children.flatMap((child: IMetadataType) => child.dbValue);
	}
}
