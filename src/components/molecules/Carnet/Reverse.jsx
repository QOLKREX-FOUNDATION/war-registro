import classes from "./license.module.css";
import QRCode from "react-qr-code";
import { LicenseLanguaje } from "./validationLanguaje";
import { URL_WAR } from "../../../config";

const lang = { locale: "es-Es" };

export const Reverse = ({
	getPet,
	adopter,
	styles = { width: 45, height: 30 },
	entityRegister = {},
	imp = false,
}) => {
	console.log(adopter);
	const ajust = { height: styles.width * 16 };

	return (
		<div className={classes.container}>
			<div className="relative">
				<img
					style={{
						height: imp ? styles.height : `${ styles.height }rem`,
						width: imp ? styles.width : "100%",
					}}
					src="/img/license/reverse.png"
					alt="carnet"
				/>
			</div>
			<p
				className={classes.adopter}
				style={{ fontSize: imp ? "25px" : ajust.height / 45 }}
			>
				<span className={classes.adopter1}>
					{LicenseLanguaje[lang.locale].adopter1}
				</span>
				<span className={classes.adopter2}>
					{LicenseLanguaje[lang.locale].adopter2}
				</span>
			</p>

			<p
				className={`${ classes.text } ${ classes.adopterName }`}
				style={{ fontSize: imp ? "21px" : ajust.height / 60 }}
				translate="no"
			>
				<span className={classes.title}>
					{LicenseLanguaje[lang.locale].adopterName}
				</span>
				<br />
				{adopter ? adopter?.name : "no carga"}
			</p>
			<p
				className={`${ classes.text } ${ classes.adopterLastName }`}
				style={{ fontSize: imp ? "21px" : ajust.height / 60 }}
				translate="no"
			>
				<span className={classes.title}>
					{LicenseLanguaje[lang.locale].adopterLastName}
				</span>
				<br />
				{adopter ? adopter?.lastName : "no carga"}
			</p>

			<div
				className={classes.hr}
				style={{
					height: imp ? "2px" : ajust.height / 350,
					width: imp ? "350px" : ajust.height / 3,
				}}
			></div>

			<img
				className={classes.firulaix}
				style={{
					width: imp ? "250px" : ajust.height / 6,
				}}
				src="/img/certificate/firulaix.png"
				alt="Firulaix"
			/>

			<p
				className={`${ classes.text } ${ classes.address }`}
				style={{ fontSize: imp ? "16px" : ajust.height / 60 }}
			>
				{getPet?.adopter}
				<br />
				{LicenseLanguaje[lang.locale].hash}
				{getPet?.hash}
				<br />
			</p>

			<p
				className={`${ classes.text } ${ classes.description }`}
				style={{ fontSize: imp ? "16px" : ajust.height / 80 }}
			>
				{LicenseLanguaje[lang.locale].description1} {entityRegister?.email}{" "}
				{LicenseLanguaje[lang.locale].description2} {entityRegister?.phone}{" "}
				{LicenseLanguaje[lang.locale].description3}{" "}
				{`${ URL_WAR }validate/${ getPet?.chip ? Buffer.from(getPet?.chip).toString("base64") : ""
					}`}
			</p>

			<p
				className={`${ classes.text } ${ classes.copyright }`}
				style={{ fontSize: imp ? "16px" : ajust.height / 80 }}
			>
				{LicenseLanguaje[lang.locale].copyright}
				<br />
				by Qolkrex Foudantion
			</p>

			<div className={classes.qr}>
				<QRCode
					value={`${ URL_WAR }validate/${ getPet?.chip ? Buffer.from(getPet?.chip).toString("base64") : ""
						}`}
					size={imp ? 330 : ajust.height / 4}
				/>
			</div>
		</div>
	);
};
