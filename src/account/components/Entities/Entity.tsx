import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { IoMdOpen } from "react-icons/io";
import { DefaultSiteImage } from "@/constants";
import { deleteEntity } from "@/server/api/apiActions";
import type { EntityData, EntityType } from "@/server/types";

type Props = {
	entityType: EntityType;
	entity: EntityData;
};

export const Entity = ({ entityType, entity }: Props) => {
	const { id, name, description, defaultImage } = entity;
	const image = defaultImage || DefaultSiteImage;

	return (
		<li className="list-row">
			<div>
				<Image
					alt={image.alt}
					className="size-10 rounded-box"
					width={1000}
					height={667}
					src={image.src}
				/>
			</div>
			<div>
				<div>{name}</div>
				<div className="text-xs uppercase font-semibold opacity-60">
					{description}
				</div>
			</div>

			<a
				href={`/account/${entityType}/view/${id}`}
				className="btn btn-square btn-ghost"
			>
				<IoMdOpen />
			</a>
			<EditElements entityId={id} entityType={entityType} />
		</li>
	);
};

type EditElementsProps = {
	entityType: EntityType;
	entityId: number;
};

const EditElements = ({ entityType, entityId }: EditElementsProps) => (
	<>
		<a
			href={`/account/${entityType}/edit/${entityId}`}
			className="btn btn-square btn-ghost"
		>
			<CiEdit />
		</a>
		<form action={deleteEntity}>
			<input type="hidden" name="entityId" value={entityId} />
			<input type="hidden" name="entityType" value={entityType} />
			<button type="submit" className="btn btn-square btn-ghost">
				<AiOutlineDelete />
			</button>
		</form>
	</>
);
