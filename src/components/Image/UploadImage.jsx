import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { useCallback, useState } from "react";

export const UploadImage = ({ onFileUpload }) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");

	const handleCancel = () => setPreviewOpen(false);
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

	const beforeUpload = useCallback(
		(file) => {
			onFileUpload(file);
			return false;
		},
		[onFileUpload],
	);

	return (
		<div>
			<Upload
				beforeUpload={beforeUpload}
				listType="picture-card"
				maxCount={1}
				onPreview={handlePreview}
			>
				<div>
					<PlusOutlined />
					<div style={{ marginTop: 8 }}>Upload</div>
				</div>
			</Upload>
			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
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
