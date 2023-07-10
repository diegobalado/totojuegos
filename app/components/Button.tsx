type ButtonProps = {
  children?: string;
};
export default function Button({ children, ...buttonProps }: ButtonProps) {
  return (
    <button
      className="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow"
      {...buttonProps}
    >
      <div className="absolute inset-0 w-3 bg-green-600 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
      <span className="relative text-black group-hover:text-white">
        {children || "Enviar"}
      </span>
    </button>
  );
}
