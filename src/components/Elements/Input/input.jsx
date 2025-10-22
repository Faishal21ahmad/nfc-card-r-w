
const Input = (props) => {
    const { type, placeholder, name, label } = props;
    return (
        <>
            <label className="block mb-2 text-sm font-medium text-white">
                {label}
            </label>

            <input
                id={name}
                type={type}
                className='relative w-full cursor-default rounded-md bg-stone-950 py-2 pl-3 pr-10 text-left text-white shadow-sm ring-1 ring-inset ring-white/10 focus:outline-none sm:text-sm'
                placeholder={placeholder}
                name={name}
                autoComplete="off"
            />
        </>
    );
};

export default Input;