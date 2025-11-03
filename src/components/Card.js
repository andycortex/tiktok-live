
const Card = ({ children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return (
    <div className="gradient-bg p-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="p-8 space-y-6">{children}</div>;
};

export default Card;
