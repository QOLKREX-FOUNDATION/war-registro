import { Grid, Paper, styled } from "@mui/material";
import { initAccessValues } from "../../../../../atoms/Wallet/utils";
import classes from "./groupPermit.module.css";
import { CheckBoxGroup } from "./checkboxgroup/CheckBoxGroup";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const GroupPermit = ({
	accessValues,
	handleAccessValues,
	permit = initAccessValues(),
	show = true,
}) => {

	return (
		<>
			<h3 style={{ textAlign: "center" }}>
				Accesos y Permisos
			</h3>
			{!show && (
				<div
					className="flex justify-center items-center gap-4 my-3"
				>
					<div className="flex justify-center items-center">
						<p>Si &nbsp;</p>
						<div
							className={classes.true}
						></div>
					</div>
					<div className="flex justify-center items-center">
						<p>No &nbsp;</p>
						<div
							className={classes.false}
						></div>
					</div>
				</div>
			)}
			<div></div>
			<Grid>
				<>
					{(permit[1][1] != 0 || permit[1][2] != 0 || permit[1][3] != 0) && (
						<Item col={4}>
							<CheckBoxGroup
								title={"Registrar"}
								accessValues={accessValues}
								handleAccessValues={handleAccessValues}
								pref="warOffice.form.er"
								options={[
									{ id: "save", module: 1, value: 1 },
									{ id: "update", module: 1, value: 2 },
									{ id: "delete", module: 1, value: 3 },
								]}
								show={show}
							/>
						</Item>
					)}
					{permit[2][1]!= 0 && (
						<Item col={2}>
							<CheckBoxGroup
								title={"Transferencia"}
								accessValues={accessValues}
								handleAccessValues={handleAccessValues}
								pref="warOffice.form.er"
								options={[{ id: "permit", module: 2, value: 1 }]}
								show={show}
							/>
						</Item>
					)}
					{permit[3][1]!= 0 && (
						<Item col={2}>
							<CheckBoxGroup
								title={"Adopción de Animal"}
								accessValues={accessValues}
								handleAccessValues={handleAccessValues}
								pref="warOffice.form.er"
								options={[{ id: "permit", module: 3, value: 1 }]}
								show={show}
							/>
						</Item>
					)}
				</>
			</Grid>
			<Grid>
				<>
					{(permit[5][1]!= 0 || permit[5][2]!= 0 || permit[5][3]!= 0) && (
						<Item col={4}>
							<CheckBoxGroup
								title={"Vacunas"}
								accessValues={accessValues}
								handleAccessValues={handleAccessValues}
								pref="warOffice.form.er"
								options={[
									{ id: "save", module: 5, value: 1 },
									{ id: "update", module: 5, value: 2 },
									{ id: "delete", module: 5, value: 3 },
								]}
								show={show}
							/>
						</Item>
					)}
					{permit[4][1]!= 0 && (
						<Item col={2}>
							<CheckBoxGroup
								title={"Estado de Animal"}
								accessValues={accessValues}
								handleAccessValues={handleAccessValues}
								pref="warOffice.form.er"
								options={[{ id: "permit", module: 4, value: 1 }]}
								show={show}
							/>
						</Item>
					)}
				</>
			</Grid>
		</>
	);
};
