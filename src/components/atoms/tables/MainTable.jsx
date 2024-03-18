import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { FaEdit, FaSyringe, FaFilter } from "react-icons/fa";
import { AiFillFileZip, AiOutlineShake } from "react-icons/ai";
import { Pet } from "../../templates/PetWizard/Pet";
import { isModule, permisionActive } from "../../../utils/war/permissionVerifi";
import { useWeb3Context } from "../../../contexts";
import { Documents } from "../../templates/Documents";
import { FormModal } from "../../molecules/modals/FormModal";
import { Vaccines } from "../../organims/Vaccines";
import { Status } from "../Status/Status";
import { useStateContext } from "../../../contexts/ContextProvider";
import Papa from "papaparse";
import { Button } from "@material-ui/core";

export const MainTable = ({ data, handleGetRecords }) => {
	const { web3 } = useWeb3Context();
	const [tableData, setTableData] = useState([]);
	const dataPet = data;

	const [openEdit, setOpenEdit] = useState(false);
	const [openDoc, setOpenDoc] = useState(false);
	const [openStatus, setOpenStatus] = useState(false);
	const [openVacunnas, setOpenVacunnas] = useState(false);

	const [chip, setChip] = useState("");
	const [pet, setPet] = useState({});
	const [update, setUpdate] = useState("");
	const [vacunnas, setVacunnas] = useState("");
	const [status, setStatus] = useState("");
	const [filter, setFilter] = useState(false);
	const [dateType, setDateType] = useState("date");
	const {
		setCurrentColor,
		setCurrentMode,
		currentMode,
		currentColor,
		themeSettings,
		setThemeSettings,
	} = useStateContext();

	useEffect(() => {
		if (permisionActive(web3.account, 1, 2)) {
			setUpdate({
				icon: () => <FaEdit />,
				tooltip: "Editar Mascota",
				onClick: (event, rowData) => {
					setOpenEdit(true);
					setChip(rowData.chip);
				},
			});
		}

		if (isModule(web3.account, 5)) {
			setVacunnas({
				icon: () => <FaSyringe />,
				tooltip: "Ver Vacunas",
				onClick: (event, rowData) => {
					setOpenVacunnas(true);
					setChip(rowData.chip);
				},
			});
		}

		if (permisionActive(web3.account, 4, 1)) {
			setStatus({
				onClick: (event, rowData) => {
					setOpenStatus(true);
					setChip(rowData.chip);
					setPet(rowData);
				},
				icon: () => <AiOutlineShake />,
				tooltip: "Estado",
			});
		}
	}, [web3.account]);

	useEffect(() => {
		// console.log(data.pets)
		setTableData(data.pets);
	}, [data]);

	const columns = [
		{
			title: "Registro",
			field: "created_at",
			emptyValue: () => <em></em>,
			type: dateType,
			render: (rowData) => {
				const date = new Intl.DateTimeFormat("es-ES", {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				}).format(new Date(rowData.created_at));
				return date;
			},
		},
		{
			title: "Micro Chip",
			field: "chip",
			emptyValue: () => <em></em>,
		},
		{
			title: "Mascota",
			field: "name",
			emptyValue: () => <em></em>,
		},
		{
			title: "Tipo",
			field: "type",
			emptyValue: () => <em></em>,
		},
		{
			title: "Género",
			field: "gender",
			emptyValue: () => <em></em>,
		},
		{
			title: "Esterilizado",
			field: "sterilized",
			emptyValue: () => <em></em>,
		},
		{
			title: "Estado",
			field: "status",
			emptyValue: () => <em></em>,
		},
		{
			title: "Adoptante",
			field: "adopterName",
			emptyValue: () => <em></em>,
			render: (client) => {
				return `${ client.adopterName } ${ client.adopterLastName }`;
			},
		},
		{
			title: "Doc. de identidad",
			field: "documentNumber",
			emptyValue: () => <em>null</em>,
			render: (client) => {
				const ad = data.adopters.filter(
					(values) => values.address == client.adopter
				);
				// console.log(ad[0])
				return `${ ad[0]?.documentNumber ?? "No Disponible" }`;
			},
		},
		// {
		// 	title: "Num. de celular",
		// 	field: "phone",
		// 	emptyValue: () => <em>null</em>,
		// 	render: (client) => {
		// 		const ad = data.adopters.filter(
		// 			(values) => values.address == client.adopter
		// 		);
		// 		return `${ ad[0]?.phone ?? "No Disponible" }`;
		// 	},
		// },
		// {
		// 	title: "Correo",
		// 	field: "email",
		// 	emptyValue: () => <em>null</em>,
		// 	render: (client) => {
		// 		const ad = data.adopters.filter(
		// 			(values) => values.address == client.adopter
		// 		);
		// 		return `${ ad[0]?.email ?? "No Disponible" }`;
		// 	},
		// },
	];

	const columnsCsv = [
		{
			title: "Registro",
			field: "created_at",
		},
		{
			title: "Micro Chip",
			field: "chip",
		},
		{
			title: "Mascota",
			field: "name",
		},
		{
			title: "Tipo",
			field: "type",
		},
		{
			title: "Género",
			field: "gender",
		},
		{
			title: "Raza",
			field: "race",
		},
		{
			title: "Color",
			field: "colour",
		},
		{
			title: "Fecha de Nacimiento",
			field: "date",
		},
		{
			title: "Esterilizado",
			field: "sterilized",
		},
		{
			title: "Adoptante",
			field: "adopterName",
		},
		{
			title: "Doc. de identidad",
			field: "documentNumber"
		},
	];

	return (
		<>
			<div className="text-xs	relative">
				<Button
					variant="contained"
					color="primary"
					onClick={() => setFilter(!filter)}
					startIcon={<FaFilter />}
					style={{
						position: "absolute",
						left: "10px",
						top: "20px",
						zIndex: "100",
					}}
				>
					Filter
				</Button>
				<MaterialTable
					title=""
					columns={columns}
					data={tableData}
					style={currentMode === "Dark" && { backgroundColor: "#171616", color: "#f0f0f0", transition: "all 0.5s ease-in-out" }}
					options={{
						sorting: true,
						filtering: filter,
						paginationType: "stepped",
						exportButton: true,
						exportAllData: false,
						exportCsv: (columns, data) => {
							console.log("exportCsv", columns, data);
							const csvData = data.map((row) => {
								const rowData = {};
								columnsCsv.forEach((columnDef, index) => {
									rowData[columnDef.title] = row[columnDef.field];
									// const dni =
									const user = dataPet.adopters.filter(
										(values) => values.address == row.adopter
									);
									rowData['Registro'] = new Intl.DateTimeFormat("es-ES", {
										year: "numeric",
										month: "2-digit",
										day: "2-digit",
										hour: "2-digit",
										minute: "2-digit",
										second: "2-digit",
									}).format(new Date(row['created_at']));
									rowData['Doc. de identidad'] = user[0]?.documentNumber ?? "No Disponible";
									// console.log("user", user);
									// console.log("adopters", row.adopter);
									// console.log("address", columnDef.address);
								});
								// console.log("rowData", rowData);
								return rowData;
							});
							// const csvColumns = columns.map((columnDef) => columnDef.title);
							const csvColumns = columnsCsv.map((columnDef) => columnDef.title);
							// console.log("csvColumns", csvColumns);
							const csvDataString = Papa.unparse({
								fields: csvColumns,
								data: csvData,
							});

							const blob = new Blob([csvDataString], { type: "text/csv" });
							const url = URL.createObjectURL(blob);
							const a = document.createElement("a");
							a.setAttribute("hidden", "");
							a.setAttribute("href", url);
							a.setAttribute("download", "data.csv");
							document.body.appendChild(a);
							a.click();
							document.body.removeChild(a);
						},
						actionsColumnIndex: -1,
						pageSize: 10,
						actionsCellStyle: {
							color: currentMode === "Dark" && "#f0f0f0",
						},
						headerStyle: {
							color: currentMode === "Dark" && "#f0f0f0",
							background: currentMode === "Dark" && "#171616",
						},
						filterRowStyle: {
							color: currentMode === "Dark" && "#f0f0f0",
						},
						searchFieldStyle: {
							color: currentMode === "Dark" && "#f0f0f0",
						},
					}}
					// editable={{
					// 	onRowUpdate: (newRow, oldRow) =>
					// 		new Promise((resolve, reject) => {
					// 			const updatedData = [...tableData];
					// 			updatedData[oldRow.tableData.id] = newRow;
					// 			setTableData(updatedData);
					// 			setTimeout(() => resolve(), 500);
					// 		}),
					// }}
					actions={[
						update,
						vacunnas,
						status,
						{
							onClick: (event, rowData) => {
								setOpenDoc(true);
								setChip(rowData.chip);
							},
							icon: () => <AiFillFileZip style={currentMode === "Dark" && { color: "#f0f0f0", transition: "all 0.5s ease-in-out" }} />,
							tooltip: "Documentos",
						},
					]}
				/>
			</div>

			{openEdit && (
				<FormModal handleClose={setOpenEdit} title="Editar Mascota">
					<Pet
						update={true}
						chip={chip}
						handleClose={setOpenEdit}
						handleGetRecords={handleGetRecords}
					/>
				</FormModal>
			)}

			{openDoc && (
				<FormModal isFullScreen handleClose={setOpenDoc} title="Documentos">
					<Documents chip={chip} />
				</FormModal>
			)}

			{openStatus && (
				<FormModal handleClose={setOpenStatus} title={`Estado`}>
					<Status
						chip={chip}
						pet={pet}
						handleClose={setOpenStatus}
						handleGetRecords={handleGetRecords}
					/>
				</FormModal>
			)}

			{openVacunnas && (
				<FormModal handleClose={setOpenVacunnas} title="Vacunas">
					<Vaccines chip={chip} />
				</FormModal>
			)}
		</>
	);
};
