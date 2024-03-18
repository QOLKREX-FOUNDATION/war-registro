import Select from "react-select";
import { useStateContext } from "../../../contexts/ContextProvider";
export const ReactSelect = ({
	name = false,
	value = {},
	onChange = () => false,
	options = [],
	required = false,
	isMulti = false,
	readOnly = false,
}) => {
	const { currentColor } = useStateContext();

	const style = {
		fontSize: "0.75rem",
		lineHeight: "1rem",
	};

	const customStyles = {
		indicatorSeparator: (provided, state) => ({
			...provided,
			...style,
		}),
		input: (provided, state) => ({
			...provided,
			...style,
		}),
		dropdownIndicator: (provided, state) => ({
			...provided,
			...style,
		}),
		indicatorsContainer: (provided, state) => ({
			...provided,
			...style,

		}),
		valueContainer: (provided, state) => ({
			...provided,
			...style,
		}),
		singleValue: (provided, state) => ({
			...provided,
			...style,

		}),
		multiValue: (provided, state) => {
			let colour = state.data?.hex ? state.data.hex : "hsl(0, 0%, 90%)";
			return {
				...provided,
				...style,
				backgroundColor: `${colour}`,
				fontWeight: "bold",
			};
		},
		multiValueLabel: (provided, state) => ({
			...provided,
			...style,
		}),
		multiValueRemove: (provided, state) => ({
			...provided,
			...style,
		}),
		control: (base) => ({
			...base,
			fontSize: "0.75rem",
			margin: 0,
		}),
		container: (provided, state) => ({
			...provided,
			...style,
		}),
	};

	return (
		<div className=" relative ">
			<label className="text-gray-700 text-xs">
				<p className="capitalize mb-2" style={{ color: currentColor }}>
					{name}
					{required && <span className="text-red-500 required-dot"> *</span>}
				</p>
			</label>
			<Select
				isDisabled={readOnly}
				styles={customStyles}
				options={options}
				value={value}
				onChange={onChange}
				isMulti={isMulti}
			/>
		</div>
	);
};
