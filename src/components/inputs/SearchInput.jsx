import { PiMagnifyingGlassLight, PiXLight } from "react-icons/pi";
function SearchInput({ placeholder, value, onChange }) {
  return (
    <>
      <div className="flex items-center gap-2 p-4 w-full bg-white text-background-primary-color-600 rounded-input shadow-2xs">
        <input
          type="text"
          minLength={1}
          maxLength={100}
          placeholder={placeholder}
          value={value}
          className="w-full bg-transparent outline-none"
          onChange={onChange}
        />
        {value.length > 0 ? (
          <button onClick={() => onChange({ target: { value: "" } })} className="cursor-pointer">
            <PiXLight className="dark:text-white text-background-primary-color-600  text-2xl" />
          </button>
        ) : (
          <button>
            <PiMagnifyingGlassLight className="dark:text-white text-background-primary-color-600  text-2xl" />
          </button>
        )}
      </div>
    </>
  );
}
export default SearchInput;
