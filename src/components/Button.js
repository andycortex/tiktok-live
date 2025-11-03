
const Button = ({ children, onClick, type = 'button', fullWidth = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`gradient-bg text-white font-semibold py-4 rounded-lg hover:opacity-90 transition-all btn-hover flex items-center justify-center gap-2 ${
        fullWidth ? 'w-full' : ''
      }`}>
      {children}
    </button>
  );
};

export default Button;
