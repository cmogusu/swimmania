import { Modal, Upload } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export const UploadImage = ({ uploadUrl, onComplete }) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const [fileList, setFileList] = useState([]);

	const handleCancel = () => setPreviewOpen(false);
	const handleChange = ({ file, fileList: newFileList }) => {
		setFileList(newFileList);
		if (file.status === "done") {
			onComplete?.();
		}
	};
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
		);
	};

	return (
		<div>
			<Upload
				action={uploadUrl}
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
			>
				<div>
					<FaPlus />
					<div style={{ marginTop: 8 }}>Upload</div>
				</div>
			</Upload>
			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				{/** biome-ignore lint/performance/noImgElement: TODO - change later on */}
				<img
					alt="example"
					style={{
						width: "100%",
					}}
					src={previewImage}
				/>
			</Modal>
		</div>
	);
};

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
