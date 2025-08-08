const AuthLayout = ({ title, children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-800 via-violet-900 to-black flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md p-10 rounded-xl shadow-xl w-full max-w-md text-white">
                <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout;
