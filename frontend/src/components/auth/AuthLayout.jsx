const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
