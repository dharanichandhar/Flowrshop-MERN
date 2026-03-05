import "./Input.css";

export default function Input({ label, ...props }) {
  return (
    <div className="iWrap">
      <label className="iLabel">{label}</label>
      <input className="iField" {...props} />
    </div>
  );
}