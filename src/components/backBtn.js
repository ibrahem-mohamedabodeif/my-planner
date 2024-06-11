import { useNavigate } from "react-router-dom";
import "../style.css";

export default function BackBtn() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }
  return (
    <button className="add" onClick={goBack}>
      Back
    </button>
  );
}
