import "./Button.css";

export default function Button({ children, ...props }) {
  return <button className="btnMain" {...props}>{children}</button>;
}