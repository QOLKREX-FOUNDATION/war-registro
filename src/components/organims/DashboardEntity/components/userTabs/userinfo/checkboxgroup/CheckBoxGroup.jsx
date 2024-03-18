import classes from "./checkboxgroup.module.css";
// import classes2 from "../../../../../../components/Form/Checkbox/checkbox.module.css";

export const CheckBoxGroup = ({
  title,
  accessValues,
  handleAccessValues,
  pref,
  options,
  show = true,
}) => {
  return (
    <div>
      <div
        className={classes.title}
      >
        <h2>{title}</h2>
      </div>
      <div className={`${classes.divCenter} ${classes.divItemCenter}`}>
        {options.map((option, i) => (
          <label
            key={i}
            className={`${classes.option}${" "}
                        ${
                          accessValues[option.module][option.value] ==
                          option.value
                            ? classes.true
                            : classes.false
                        }
                    `}
          >
            <h2>{option.id}</h2>
            {show && (
              <div
                className={classes.checkbox}
              >
                <input
                  className={classes.checkboxSpin}
                  type="checkbox"
                  checked={
                    accessValues[option.module][option.value] == option.value
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    handleAccessValues(e, option.module, option.value)
                  }
                />
              </div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
};
