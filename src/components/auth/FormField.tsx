type FormProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}
const FormField = ({
  label,
  htmlFor,
  required,
  children,
  error,
}: FormProps
) => {
  return (<>
    <div className="w-full flex flex-col mb-6">
      <label htmlFor={htmlFor} className="flex items-center font-medium mb-1">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {children}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  </>);
};

export default FormField;