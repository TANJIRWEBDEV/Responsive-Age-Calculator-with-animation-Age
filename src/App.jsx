import { useState, useRef } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { compute } from "./component/compute.js";
import Counter from "./component/Cnumber.jsx";
import "./App.css";
import Arrow from "./assets/icon.svg";

function App() {
  const res = useWindowSize();
  const [error, setError] = useState({ day: "", month: "", year: "" });
  const [oDate, setOdate] = useState({ day: "", month: "", year: "" });
  const [mData, setMdata] = useState("");
  const errorClass = error.day || error.month || error.year;
  const submit = () => {
    const fill =
      Boolean(oDate.day) && Boolean(oDate.month) && Boolean(oDate.year);

    const eObj = { day: "", month: "", year: "" };
    if (!oDate.day) {
      eObj.day = "This field is required";
    }
    if (!oDate.month) {
      eObj.month = "This field is required";
    }
    if (!oDate.year) {
      eObj.year = "This field is required";
    }

    if (fill) {
      const nDate = parseInt(oDate.day);
      const nMon = parseInt(oDate.month);
      const nYear = parseInt(oDate.year);
      const date = new Date(nYear, nMon - 1, nDate);
      const dateN = new Date();
      const ivDate = date.getDate() !== nDate;
      const ivYear = date > dateN;
      const ivMonth = nMon < 1 || nMon > 12;
      const mYear = nYear < 100;

      if (ivDate) {
        eObj.day = "Must be a valid day";
      }
      if (ivMonth) {
        eObj.month = "Must be a valid month";
      }

      if (ivYear) {
        eObj.year = "Must be in the past";
      }
      if (mYear) {
        eObj.year = "Minimum year needs to be above 100";
      }
      if (!ivDate && !ivMonth && !ivYear && !mYear) {
        const cal = compute(nYear, nMon, nDate);
        setMdata(cal);
      }
    }
    setError(eObj);
  };
  const valueC = (e) => {
    setOdate((p) => {
      return { ...p, [e.target.name]: e.target.value };
    });
    setError({ day: "", month: "", year: "" });
  };
  const cRef = useRef();
  const handleKey = (e) => {
    if (e.keyCode === 13 || e.keyCode === "Enter") {
      cRef.current.click();
    }
  };
  return (
    <div className="app">
      <div className="app__container">
        <div className="ac__items">
          <div className="ac__items__1">
            <div className="ac__items__1__1">
              <div
                className={
                  errorClass
                    ? "ac__items__1__1-1 acitems1_1_1"
                    : "ac__items__1__1-1"
                }
              >
                DAY
              </div>
              <input
                type="number"
                className={
                  errorClass
                    ? "ac__items__1__1-2 acitems1_1_2"
                    : "ac__items__1__1-2 "
                }
                placeholder="DD"
                value={oDate.day}
                onChange={valueC}
                name="day"
                onKeyUp={handleKey}
              />
              <p>{error.day}</p>
            </div>
            <div className="ac__items__1__1">
              <div
                className={
                  errorClass
                    ? "ac__items__1__1-1 acitems1_1_1"
                    : "ac__items__1__1-1"
                }
              >
                MONTH
              </div>
              <input
                type="number"
                className={
                  errorClass
                    ? "ac__items__1__1-2 acitems1_1_2"
                    : "ac__items__1__1-2 "
                }
                placeholder="MM"
                name="month"
                value={oDate.month}
                onChange={valueC}
                onKeyUp={handleKey}
              />
              <p>{error.month}</p>
            </div>
            <div className="ac__items__1__1">
              <div
                className={
                  errorClass
                    ? "ac__items__1__1-1 acitems1_1_1"
                    : "ac__items__1__1-1"
                }
              >
                YEAR
              </div>
              <input
                type="number"
                className={
                  errorClass
                    ? "ac__items__1__1-2 acitems1_1_2"
                    : "ac__items__1__1-2 "
                }
                placeholder="YYYY"
                name="year"
                value={oDate.year}
                onChange={valueC}
                onKeyUp={handleKey}
              />
              <p>{error.year}</p>
            </div>
          </div>
          <div className="ac__items__2">
            <div className="ac__items__2-1"></div>
            <button className="ac__items__2-2" onClick={submit} ref={cRef}>
              <img src={Arrow} alt="" />
            </button>
            {res.width < 620 && <div className="ac__items__2-1"></div>}
          </div>
          <div className="ac__items__3">
            <div className="ac__items__3-1">
              {mData.year ? <Counter from={0} to={mData.year} /> : <p>- -</p>}{" "}
              <div>years</div>
            </div>
            <div className="ac__items__3-1">
              {mData.month ? <Counter from={0} to={mData.month} /> : <p>- -</p>}
              <div>months</div>
            </div>
            <div className="ac__items__3-1">
              {mData.day ? <Counter from={0} to={mData.day} /> : <p>- -</p>}{" "}
              <div>days</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
