import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";
export default function HomePage() {
  const [qoute, setqoute] = useState([]);
  const [randomQoute, setrandomQoute] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://type.fit/api/quotes");
        const data = await res.json();
        setqoute(data);
      } catch {
        console.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (qoute.length > 0) {
      const randomIndex = Math.floor(Math.random() * qoute.length);
      setrandomQoute(qoute[randomIndex]);
    }
  }, [qoute]);

  return (
    <div className="container">
      <div className="header">
        <h1>My Planner</h1>
      </div>
      <div className="qoute">{randomQoute && <p>{randomQoute.text}</p>}</div>
      <div className="cards">
        <Link className="card" to={"todolist"}>
          To Do List
        </Link>
        <Link className="card" to={"notes"}>
          Notes
        </Link>
      </div>
    </div>
  );
}
