import Image from "next/image";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { IoMdOpen } from "react-icons/io";
import { DefaultSiteImage } from "@/constants";
import type { EntityData, EntityType } from "@/server";
import { deleteEntity } from "@/server/api/apiActions";

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
				href={`/profile/${entityType}/${id}`}
				className="btn btn-square btn-ghost"
			>
				<IoMdOpen />
			</a>
			<a
				href={`/profile/${entityType}/${id}/edit`}
				className="btn btn-square btn-ghost"
			>
				<CiEdit />
			</a>
			<form action={deleteEntity}>
				<input type="hidden" name="entityId" value={id} />
				<input type="hidden" name="entityType" value={entityType} />
				<button type="submit" className="btn btn-square btn-ghost">
					<AiOutlineDelete />
				</button>
			</form>
		</li>
	);
};
