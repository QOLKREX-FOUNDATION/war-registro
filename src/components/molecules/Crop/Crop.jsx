import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useEffect, useRef, useState } from "react";
import { FileInput } from "../../atoms/Form";
import { initPetImage } from "./Data/Data";
import { canvasPreview } from "./Data/previewCanvasRef";
import { useStateContext } from "../../../contexts/ContextProvider";

export const Crop = ({
	name,
	value,
	values,
	error,
	setValues,
	pxRecomend = "Proporción Recomendada. 350px x 467px",
	required = false,
}) => {
	const { currentColor } = useStateContext();
	const ref = useRef(null);
	const previewCanvasRef = useRef(null);
	const [crop, setCrop] = useState(initPetImage);

	const [file, setFile] = useState({});
	const [filReader, setFileReader] = useState(null);

	useEffect(() => {
		if (file?.name != null && file?.name != undefined) {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				setFileReader(reader.result);
			});
			reader.readAsDataURL(file);
		}
	}, [file]);

	return (
		<div
			style={{
				overflow: "visible",
				maxWidth: "600px",
				maxHeight: "600px",
			}}
		>
			{file?.name != null && file?.name != undefined && file?.name != "" && (
				<>
					<ReactCrop
						className="w-auto"
						crop={crop}
						onChange={(c) => {
							setCrop({
								...c,
								resizeH: ref.current.offsetHeight,
								resizeW: ref.current.offsetWidth,
							});
							if (
								crop?.width &&
								crop?.height &&
								ref.current &&
								previewCanvasRef.current
							) {
								canvasPreview(
									ref.current,
									previewCanvasRef.current,
									crop,
									1,
									0
								);

								previewCanvasRef.current.toBlob((resolve) => {
									const files = new File([resolve], `image.jpg`, {
										type: "image/jpeg",
									});
									setValues(value, files);
								});
							}
						}}
						locked={true}
					>
						<img
							className="text-xs"
							ref={ref}
							src={filReader}
							style={{
								overflow: "visible",
								maxWidth: "600px",
								maxHeight: "600px",
								minHeight: "467px",
								minWidth: "350px",
							}}
						/>
					</ReactCrop>
				</>
			)}
			<div className=" relative">
				<label className="text-gray-700 text-xs">
					<p className="capitalize mb-2" style={{ color: currentColor }}>
						{name}
						{required && <span className="text-red-500 required-dot"> *</span>}
					</p>
				</label>
				<FileInput
					accept="image/jpeg, image/png,image/jpg"
					onChange={{
						onChange: (e) => {
							setFile(e.target.files[0]);
						},
					}}
				/>

				<p className="text-xs">{pxRecomend}</p>
			</div>
			<input
				type="hidden"
				required
				{...values("image", {
					required: {
						value: true,
						message: "Campo requerido",
					},
				})}
			/>
			{error && <small className="text-red-400">{error.message}</small>}

			<canvas
				ref={previewCanvasRef}
				style={{
					display: "none",
					objectFit: "contain",
					width: crop.width,
					height: crop.height,
				}}
			/>
		</div>
	);
};
