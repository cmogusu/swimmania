import { useState } from "react";

function ImageUploadForm() {
	const [selectedFile, setSelectedFile] = useState(null);

	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!selectedFile) return;

		const formData = new FormData();
		formData.append("image", selectedFile);

		try {
			const response = await fetch("/api/upload", {
				// Replace with your API endpoint
				method: "POST",
				body: formData,
			});
			const data = await response.json();
			console.log("Upload successful:", data);
			// Handle success, e.g., display the uploaded image
		} catch (error) {
			console.error("Upload failed:", error);
			// Handle error
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="file" accept="image/*" onChange={handleFileChange} />
			<button type="submit" disabled={!selectedFile}>
				Upload Image
			</button>
		</form>
	);
}

export default ImageUploadForm;
