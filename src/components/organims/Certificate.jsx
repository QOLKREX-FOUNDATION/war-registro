import { useState } from "react";
import { useRef } from "react";
import { usePreloaderContext, useWeb3Context } from "../../contexts";
import { useStateContext } from "../../contexts/ContextProvider";
import { downloadImage } from "../../utils/download";
import { Sheet } from "../molecules/Sheet/Sheet";

export const certificatePrintPx = { width: 1113, height: 787 };

export const Certificate = ({ petValues, adopter, entityRegister }) => {
	const { currentColor } = useStateContext();
	const { web3 } = useWeb3Context();
	const { handlePreloader } = usePreloaderContext();

	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const [user, setUser] = useState({});

	return (
		<>
			<div className={`${ !petValues?.chip && "opacity-0" }`}>
				<div className="flex justify-center mb-4 gap-4 w-full">
					<div className="w-2/8">
						<button
							onClick={() => {
								handlePreloader(true);
								downloadImage(
									ref1,
									"certificate.png",
									certificatePrintPx.height,
									certificatePrintPx.width,
									1
								);
								setTimeout(() => {
									handlePreloader(false);
								}, 3000);
							}}
							type="submit"
							className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md rounded-lg "
							style={{ backgroundColor: currentColor }}
						>
							Descargar Certificado
						</button>
					</div>

					<div className="w-2/8">
						<button
							onClick={() => {
								handlePreloader(true);
								downloadImage(
									ref2,
									"certificate-print.png",
									certificatePrintPx.height,
									certificatePrintPx.width,
									1
								);
								setTimeout(() => {
									handlePreloader(false);
								}, 3000);
							}}
							type="submit"
							className=" py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md rounded-lg "
							style={{ backgroundColor: currentColor }}
						>
							Descargar para Imprimir
						</button>
					</div>
				</div>

				<div className="flex justify-center">
					<div
						style={{
							width: "55rem",
							height: "30rem",
						}}
					>
						<Sheet
							petValues={petValues}
							entityRegister={entityRegister}
							user={user}
						/>
					</div>
				</div>
			</div>
			<div
				style={{
					overflow: "hidden",
					height: "0",
				}}
			>
				<div
					ref={ref1}
					style={{
						display: "block",
						height: certificatePrintPx.height,
						width: certificatePrintPx.width,
					}}
				>
					<Sheet
						petValues={petValues}
						entityRegister={entityRegister}
						user={user}
						imp={true}
						impComplete={true}
					/>
				</div>
				<br />
			</div>

			<div
				style={{
					overflow: "hidden",
					height: "0",
				}}
			>
				<div
					ref={ref2}
					style={{
						display: "block",
						height: certificatePrintPx.height,
						width: certificatePrintPx.width,
					}}
				>
					<Sheet
						petValues={petValues}
						entityRegister={entityRegister}
						user={user}
						imp={true}
					/>
				</div>
				<br />
			</div>
		</>
	);
};
