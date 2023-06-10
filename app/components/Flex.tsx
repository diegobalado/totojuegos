export default function Flex({ children, vertical, ...flexProps }: any) {
  return (
    <div className={`flex ${vertical && "flex-col"}`} {...flexProps}>
      {children}
    </div>
  );
}
