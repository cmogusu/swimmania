import type {
	DbTableColumn,
	IMetadataPropertyType,
	IParentMetadataPropertyType,
	MetadataData,
	MetadataValue,
	RawMetadata,
} from "@/server/types";
import { isSet } from "@/server/utils";
import type { MetadataPropertyInitializer, ParentTypeInputs } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

export class ParentPropertyType
	extends BaseMetadataPropertyType
	implements IParentMetadataPropertyType
{
	// biome-ignore lint/suspicious/noExplicitAny: TODO - find better solution for this
	[key: string]: any;
	children: IMetadataPropertyType[] = [];
	childInitializers: Record<string, MetadataPropertyInitializer>;

	constructor(inputs: ParentTypeInputs) {
		super(inputs);

		this.type = "parent";
		this.childInitializers = inputs.childInitializers;
	}

	get names() {
		return this.children.map((p) => p.name);
	}

	getDbTableColumn(): DbTableColumn {
		throw Error("Can't get column of parent");
	}

	getDbTableColumns(): DbTableColumn[] {
		return this.children.map((p) => p.getDbTableColumn());
	}

	createChildInstance(name: string, rawMetadata?: RawMetadata) {
		const childName = name.includes(".") ? name.split(".")[1] : name;
		if (this[childName]) {
			const { id, value } = rawMetadata || {};
			if (isSet(id)) this[childName].id = id;
			if (isSet(value)) this[childName].value = value;
			return;
		}

		const initializer = this.childInitializers[childName];
		if (!initializer) {
			throw Error("Invalid child name");
		}

		this[childName] = initializer(rawMetadata);
		this[childName].name = `${this.name}.${childName}`;
		this.children.push(this[childName]);
	}

	createAllChildInstances() {
		for (const childName in this.childInitializers) {
			this.createChildInstance(childName);
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
