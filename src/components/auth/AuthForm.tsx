const AuthForm = ({
  title,
  description,
  children,
  footer
}:{
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) => {
  return (<>
    <div className="h-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-md">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-gray-500 mb-6">{description}</p>
        <div className="w-full flex justify-center">
          {children}
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          {footer}
        </div>
      </div>
    </div>
  </>);
};
export default AuthForm;
