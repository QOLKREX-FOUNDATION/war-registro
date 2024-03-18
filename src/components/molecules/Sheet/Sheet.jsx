import QRCode from "react-qr-code";
import { URL_EXPLORER } from "../../../config";
import { dateNow } from "../../../utils/date";
import { useSpecie } from "../../organims/Cpanel/components/PetForm/hooks/useSpecie";
import classes from "./sheet.module.css";

export const certificatePrintPx = { width: 1113, height: 787 };

export const Sheet = ({
	petValues,
	entityRegister,
	imp = false,
	impComplete = false,
	styles = { width: 55, height: 40 },
}) => {
	const { species, races } = useSpecie(petValues.type);
	const ajust = { height: styles.width * 16 };

	return (
		<div className={classes.container}>
			<div
				className="relative"
				style={{
					height: imp ? certificatePrintPx.height : `${ styles.height }rem`,
					width: imp ? certificatePrintPx.width : `${ styles.width }rem`,
				}}
			>
				{(!imp || (impComplete && imp)) && (
					<>
						<img
							style={{
								height: imp ? certificatePrintPx.height : `${ styles.height }rem`,
								width: imp ? certificatePrintPx.width : `${ styles.width }rem`,
							}}
							src="/img/certificate/background.png"
							alt="background"
						/>
						<img
							className={classes.backgroundFiru}
							style={{
								width: impComplete ? "200px" : ajust.height / 5.5,
							}}
							src="/img/certificate/firulaix-logo-alt.png"
							alt="firulaix"
						/>
						<img
							className={classes.firulaix}
							style={{
								width: impComplete ? "120px" : ajust.height / 9,
							}}
							src="/img/certificate/firulaix-logo.png"
							alt="firulaix"
						/>

						<img
							className={classes.coin}
							style={{
								width: impComplete ? "130px" : ajust.height / 8,
							}}
							src="/img/certificate/coin.png"
							alt="Coin"
						/>

						<img
							className={classes.firulaixT}
							style={{
								maxHeight: impComplete ? "45px" : ajust.height / 30,
								maxWidth: impComplete ? "150px" : ajust.height / 8,
							}}
							src="/img/certificate/firulaix.png"
							alt="firulaix"
						/>

						<img
							className={classes.war}
							style={{
								width: impComplete ? "750px" : ajust.height / 1.7,
							}}
							src="/img/certificate/world-animal-registry.png"
							alt="Wold animal registry"
						/>

						<img
							className={classes.warAlt}
							style={{
								width: impComplete ? "170px" : ajust.height / 6.5,
							}}
							src="/img/certificate/world-animal-registry-alt.png"
							alt="Wold animal registry"
						/>
					</>
				)}

				<img
					className={classes.erLogo}
					style={{
						maxHeight: imp ? "45px" : ajust.height / 30,
						maxWidth: imp ? "150px" : ajust.height / 8,
					}}
					src={`https://firulaixcoin.finance/images/logos/${ petValues?.idRegisteringEntity }.png`}
					onError={({ currentTarget }) => {
						currentTarget.onerror = null;
						currentTarget.src = `/img/logo/2.png`;
					}}
					alt="Entity Register"
				/>

				<p
					className={`${ classes.text } ${ classes.date }`}
					style={{ fontSize: imp ? "14px" : ajust.height / 80 }}
				>
					<span className={imp && !impComplete ? classes.opacity : ""}>
						FECHA:{" "}
					</span>
					&nbsp;
					<span className={classes.textAlt}>{dateNow(true, true)}</span>
				</p>

				<p
					className={`${ classes.text } ${ classes.title }`}
					style={{ fontSize: imp ? "17px" : ajust.height / 65 }}
				>
					<span className={imp && !impComplete ? classes.opacity : ""}>
						Este documento certifica que{" "}
					</span>
				</p>

				<p
					className={`${ classes.text } ${ classes.name }`}
					style={{
						fontSize: imp ? "17px" : ajust.height / 65,
						left: imp ? "22.5%" : "",
					}}
				>
					<span className={imp && !impComplete ? classes.opacity : ""}>
						El Sr./Sra.{" "}
					</span>
					&nbsp;
					<span className={classes.textAlt}>
						{`${ petValues.adopterName } ${ petValues.adopterLastName }`}
					</span>
				</p>

				<div
					className={`${ classes.text } ${ classes.address }`}
					style={{ fontSize: imp ? "17px" : ajust.height / 65 }}
				>
					<span className={imp && !impComplete ? classes.opacity : ""}>
						Con número de Address{" "}
					</span>
					<div className={classes.textAlt}>{petValues.adopter}</div>
				</div>

				<p
					className={`${ classes.text } ${ classes.petName }`}
					style={{
						fontSize: imp ? "17px" : ajust.height / 65,
						left: imp ? "21%" : "",
					}}
				>
					<span className={imp && !impComplete ? classes.opacity : ""}>
						Oficialmente adopta a:{" "}
					</span>
					&nbsp;
					<span className={classes.textAlt}>
						{petValues.name} {petValues.adopterLastName}
					</span>
				</p>

				<div
					className={`${ classes.text } ${ classes.pet }`}
					style={{
						fontSize: imp ? "17px" : ajust.height / 80,
					}}
				>
					<span className={classes.textAltOrange}>
						{species.map(
							(values) => values.value == petValues.type && values.label
						)}
					</span>
					<div
						className={imp && !impComplete ? classes.opacity : ""}
						style={{
							borderTop: `${ imp ? 3 : ajust.height / 300 }px solid #E5BB00`,
						}}
					>
						ANIMAL
					</div>
				</div>

				<div
					className={`${ classes.text } ${ classes.race }`}
					style={{
						fontSize: imp ? "17px" : ajust.height / 80,
					}}
				>
					<span className={classes.textAltOrange}>
						{races.map(
							(values) => values.value == petValues.race && values.label
						)}
					</span>
					<div
						className={imp && !impComplete ? classes.opacity : ""}
						style={{
							borderTop: `${ imp ? 3 : ajust.height / 300 }px solid #E5BB00`,
							fontSize: imp ? "17px" : ajust.height / 80,
						}}
					>
						RAZA
					</div>
				</div>

				<div
					className={`${ classes.text } ${ classes.gender }`}
					style={{
						fontSize: imp ? "17px" : ajust.height / 80,
					}}
				>
					<span className={classes.textAltOrange}>
						{petValues.gender == "MALE" && "MACHO"}

						{petValues.gender == "FEMALE" && "HEMBRA"}
					</span>
					<div
						className={imp && !impComplete ? classes.opacity : ""}
						style={{
							borderTop: `${ imp ? 3 : ajust.height / 300 }px solid #E5BB00`,
							fontSize: imp ? "17px" : ajust.height / 80,
						}}
					>
						SEXO
					</div>
				</div>

				<p
					className={`${ classes.text } ${ classes.signature } ${ imp && !impComplete ? classes.opacity : ""
						}`}
					style={{
						borderTop: `${ imp ? 3 : ajust.height / 300 }px solid #E5BB00`,
						fontSize: imp ? "17px" : ajust.height / 80,
					}}
				>
					FIRMA ADOPTANTE
				</p>

				<p
					className={`${ classes.text } ${ classes.signatureEr } ${ imp && !impComplete ? classes.opacity : ""
						}`}
					style={{
						borderTop: `${ imp ? 3 : ajust.height / 300 }px solid #E5BB00`,
						fontSize: imp ? "17px" : ajust.height / 80,
					}}
				>
					FIRMA ENTIDAD REGISTRADORA
				</p>

				<p
					className={`${ classes.text } ${ classes.textOne } ${ imp && !impComplete ? classes.opacity : ""
						}`}
					style={{ fontSize: imp ? "17px" : ajust.height / 65 }}
				>
					y promete cuidarlo, brindarle amor y proveerle como parte de su
					familia
				</p>

				<p
					className={`${ classes.text } ${ classes.textTwo } ${ imp && !impComplete ? classes.opacity : ""
						}`}
					style={{ fontSize: imp ? "17px" : ajust.height / 80 }}
				>
					Firmando este certificado, promete darle a mi mascota una vida llena
					de amor, diversión y deliciosos snacks. Prometo, ser su mejor amigo/a
					por siempre.
				</p>

				<p
					className={`${ classes.text } ${ classes.textThree } ${ imp && !impComplete ? classes.opacity : ""
						}`}
					style={{ fontSize: imp ? "12px" : ajust.height / 95 }}
				>
					Queda prohibida su reproducción total o parcial sin autorización de
					los propietarios del registro civil.
				</p>

				<p
					className={`${ classes.text } ${ classes.copyRight } ${ imp && !impComplete ? classes.opacity : ""
						}`}
					style={{ fontSize: imp ? "12px" : ajust.height / 95 }}
				>
					Firulaix | Todos los derechos reservados
				</p>

				<p
					className={`${ classes.text } ${ classes.website } ${ imp && !impComplete ? classes.opacity : ""
						}`}
					style={{ fontSize: imp ? "15px" : ajust.height / 80 }}
				>
					firulaixcoin.finance
				</p>

				<p
					className={`${ classes.text } ${ classes.registeringEntity }`}
					style={{ fontSize: imp ? "8.5px" : ajust.height / 140 }}
				>
					ADDRESS {petValues?.addressEr}
				</p>

				<div className={classes.qr}>
					{petValues.chip != "" &&
						petValues.chip != null &&
						petValues.chip != undefined && (
							<QRCode
								value={`${ URL_EXPLORER }tx/${ petValues.hash }`}
								size={imp ? 115 : ajust.height / 10}
							/>
						)}
					<div
						className={classes.hash}
						style={{ fontSize: imp ? "9.5px" : ajust.height / 120 }}
					>
						{`${ URL_EXPLORER }tx/${ petValues.hash }`}
					</div>
				</div>
			</div>
		</div>
	);
};
