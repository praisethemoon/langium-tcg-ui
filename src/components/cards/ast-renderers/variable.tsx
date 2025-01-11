interface VarProps {
    children: React.ReactNode;
    className?: string;
}

export const Var: React.FC<VarProps> = ({ children, className }) => {
    return (
        <span className={`inline-block px-1 mx-0.5 py-0.5 bg-slate-100 text-slate-700 font-mono border border-slate-300 rounded-sm ${className}`}>
            {children}
        </span>
    );
};