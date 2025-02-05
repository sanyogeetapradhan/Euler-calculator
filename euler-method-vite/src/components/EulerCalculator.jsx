import { useState } from "react";
import "./EulerCalculator.css";

const EulerCalculator = () => {
  const [func, setFunc] = useState("Math.exp(x)"); // Default function
  const [x0, setX0] = useState(0);
  const [y0, setY0] = useState(1);
  const [h, setH] = useState(0.1);
  const [xn, setXn] = useState(1);
  const [result, setResult] = useState(null);

  const evaluateFunction = (fn, x, y) => {
    try {
      return new Function("x", "y", `return ${fn};`)(x, y);
    } catch (error) {
      alert("Invalid function! Use Math functions like Math.log(x), Math.exp(x), or Math.pow(x,2).");
      return null;
    }
  };

  const calculateEuler = () => {
    let x = parseFloat(x0);
    let y = parseFloat(y0);
    let step = parseFloat(h);
    let target = parseFloat(xn);
    let values = [{ x, y }];

    while (x < target) {
      let dydx = evaluateFunction(func, x, y);
      if (dydx === null) return;
      y = y + step * dydx;
      x = x + step;
      values.push({ x: parseFloat(x.toFixed(4)), y: parseFloat(y.toFixed(4)) });
    }

    setResult(values);
  };

  return (
    <div className="calculator">
      <h1>Euler's Method Calculator</h1>
      <div className="input-group">
        <label>Function (dy/dx) =</label>
        <input 
          type="text" 
          value={func} 
          onChange={(e) => setFunc(e.target.value)} 
          placeholder="Ex: Math.log(x), Math.exp(x), Math.pow(x,2)" 
        />
      </div>
      <div className="input-group">
        <label>Initial x (x₀) =</label>
        <input type="number" value={x0} onChange={(e) => setX0(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Initial y (y₀) =</label>
        <input type="number" value={y0} onChange={(e) => setY0(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Step size (h) =</label>
        <input type="number" value={h} onChange={(e) => setH(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Target x (xₙ) =</label>
        <input type="number" value={xn} onChange={(e) => setXn(e.target.value)} />
      </div>
      <button onClick={calculateEuler}>Calculate</button>

      {result && (
        <div className="result">
          <h2>Results:</h2>
          <table>
            <thead>
              <tr>
                <th>x</th>
                <th>y</th>
              </tr>
            </thead>
            <tbody>
              {result.map((point, index) => (
                <tr key={index}>
                  <td>{point.x}</td>
                  <td>{point.y}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="footer">by Sanyogeeta Pradhan</div>
    </div>
  );
};

export default EulerCalculator;
