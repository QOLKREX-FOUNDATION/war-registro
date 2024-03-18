import { useStateContext } from '../../../contexts/ContextProvider';

export const Checkbox = ({
  name,
  id = name,
  label = "",
  onChange = () => false,
  checked = () => false,
}) => {
  const { currentColor } = useStateContext();

  return (
    <div className='w-full p-0 m-0 mr-2 '>
      <div className="flex relative m-0 text-sm	" >
        <input
          className="peer hidden "
          type="checkbox"
          name={name}
          id={id}
          onChange={onChange}
          checked={checked}
        />
        <span
          className="w-4 h-4 mr-1 border-2	border-slate-400	border-solid	overflow-hidden relative inline-block "
          style={{
            background: checked ? currentColor : 'transparent'
          }}
        ></span>

        <label className="flex items-center block cursor-pointer w-full uppercase dark:text-gray-100 " htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  );
}
