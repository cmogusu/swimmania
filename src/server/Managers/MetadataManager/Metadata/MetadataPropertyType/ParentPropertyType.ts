import type {
	DbTableColumn,
	IMetadataPropertyType,
	IParentMetadataPropertyType,
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
	properties: Record<string, IMetadataPropertyType> = {};
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

	createChildInstance(name: string, value?: MetadataValue) {
		const childName = name.includes(".") ? name.split(".")[1] : name;
		if (this.properties[childName]) {
			if (isSet(value)) this.properties[childName].value = value;
			return;
		}

		const initializer = this.childInitializers[childName];
		if (!initializer) {
			throw Error("Invalid child name");
		}

		this.properties[childName] = initializer(value);
		this.properties[childName].name = `${this.name}.${childName}`;
		this.children.push(this.properties[childName]);
	}

	createAllChildInstances() {
		for (const childName in this.childInitializers) {
			this.createChildInstance(childName);
		}
	}

	getChild(name: string): IMetadataPropertyType {
		const childName = name.includes(".") ? name.split(".")[1] : name;
		if (!this.properties[childName]) {
			throw Error("Child not found");
		}

		return this.properties[childName];
	}

	get value(): MetadataValue {
		throw Error("Getting parent value not permitted");
	}

	set value(_v: unknown) {
		throw Error("Editing parent value not permitted");
	}

	get dbValue(): RawMetadata {
		const dbValue = {};
		this.children.forEach((child: IMetadataPropertyType) => {
			Object.assign(dbValue, child.dbValue);
		});

		return dbValue;
	}

	setSeedData() {
		this.children.map((c) => c.setSeedData());
	}
}
