import type { MetadataData } from "@/server/types";
import type {
	IMetadataPropertyType,
	MetadataPropertyInitializer,
	MetadataValue,
	ParentTypeInputs,
	RawMetadata,
} from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

export class ParentPropertyType extends BaseMetadataPropertyType {
	// biome-ignore lint/suspicious/noExplicitAny: TODO - find better solution for this
	[key: string]: any;
	children: IMetadataPropertyType[] = [];
	childInitializers: Record<string, MetadataPropertyInitializer>;

	constructor(inputs: ParentTypeInputs) {
		super(inputs);

		this.type = "parent";
		this.childInitializers = inputs.childInitializers;
	}

	createChildInstance(name: string, rawMetadata?: RawMetadata) {
		const childName = name.includes(".") ? name.split(".")[1] : name;
		if (this[childName] && rawMetadata?.value) {
			this[childName].id = rawMetadata.id;
			this[childName].value = rawMetadata.value;
			this[childName].itemIndex = rawMetadata.itemIndex;
			return;
		}

		const initializer = this.childInitializers[childName];
		if (!initializer) {
			throw Error("Invalid child name");
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

	getChild(name: string): IMetadataPropertyType {
		const childName = name.includes(".") ? name.split(".")[1] : name;

		if (!this[childName]) {
			throw Error("Child not found");
		}

		return this[childName];
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

	setSeedData() {
		this.children.map((c) => c.setSeedData());
	}
}
