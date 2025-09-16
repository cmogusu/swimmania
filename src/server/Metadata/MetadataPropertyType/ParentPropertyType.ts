import type { MetadataData } from "@/server/types";
import type {
	IMetadataPropertyType,
	MetadataValue,
	ParentTypeInputs,
	RawMetadata,
} from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

export class ParentPropertyType extends BaseMetadataPropertyType {
	// biome-ignore lint/suspicious/noExplicitAny: TODO - find better solution for this
	[key: string]: any;
	children: IMetadataPropertyType[] = [];

	constructor(inputs: ParentTypeInputs) {
		super(inputs);

		this.type = "parent";
	}

	createChildInstance(childName: string, rawMetadata?: RawMetadata) {
		const initializer = this.childInitializers[childName];
		if (!initializer) {
			throw Error("");
		}

		this[childName] = initializer(rawMetadata);
		this.children.push(this[childName]);
	}

	createAllChildInstances() {
		for (const childName in this.childInitializers) {
			if (!this[childName]) {
				this[childName] = this.childInitializers[childName]();
				this.children.push(this[childName]);
			}
		}
	}

	setChildren(children?: IMetadataPropertyType[]) {
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
		});
	}

	get value(): MetadataValue {
		throw Error("Getting parent value not permitted");
	}

	set value(_v: unknown) {
		throw Error("Editing parent value not permitted");
	}

	get dbValue(): MetadataData[] {
		return this.children.flatMap(
			(child: IMetadataPropertyType) => child.dbValue,
		);
	}
}
