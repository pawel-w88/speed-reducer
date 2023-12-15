import { useReducer } from "react";
import vanImg from "./assets/van.svg";

const initialState = {
  engineOn: false,
  gear: 0,
  speed: 0,
  isStopped: false,
};

const actionType = {
  Start_Engine: "START_ENGINE",
  Stop_Engine: "STOP_ENGINE",
  Gear_Up: "GEAR_UP",
  Gear_Down: "GEAR_DOWN",
  Accelerate: "ACCELERATE",
  Stop: "STOP",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.Start_Engine:
      return {
        ...state,
        engineOn: true,
      };
    case actionType.Stop_Engine:
      return {
        ...state,
        engineOn: false,
        gear: 0,
        speed: 0,
        isStopped: false,
      };
    case actionType.Gear_Up:
      if (state.engineOn && state.gear < 4) {
        return {
          ...state,
          gear: state.gear + 1,
        };
      }
      return state;
    case actionType.Gear_Down:
      if (state.engineOn && state.gear > 0) {
        return {
          ...state,
          gear: state.gear - 1,
        };
      }
      return state;
    case actionType.Accelerate:
      if (state.engineOn && state.gear > 0) {
        return {
          ...state,
          speed: state.speed + state.gear * 10,
          isStopped: false,
        };
      }
      return state;
    case actionType.Stop:
      return {
        ...state,
        speed: 0,
        isStopped: true,
      };
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startEngine = () => {
    dispatch({ type: actionType.Start_Engine });
  };

  const stopEngine = () => {
    dispatch({ type: actionType.Stop_Engine });
  };

  const gearUp = () => {
    dispatch({ type: actionType.Gear_Up });
  };

  const gearDown = () => {
    dispatch({ type: actionType.Gear_Down });
  };

  const accelerate = () => {
    dispatch({ type: actionType.Accelerate });
  };

  const stop = () => {
    dispatch({ type: actionType.Stop });
  };

  return (
    <div className="App">
      <img
        className={`image${state.engineOn ? "2" : ""}`}
        src={vanImg}
        alt="van"
      />
      <button onClick={state.engineOn ? stopEngine : startEngine}>
        {state.engineOn ? "Stop Engine" : "Start Engine"}
      </button>

      <h2>The Current Gear is: {state.gear}</h2>
      <h2>The current Speed is: {state.speed}</h2>

      <div className="AppButton">
        <button onClick={gearUp} disabled={!state.engineOn}>
          Gear Up
        </button>
        <button onClick={gearDown} disabled={!state.engineOn}>
          Gear Down
        </button>
        <button onClick={accelerate} disabled={!state.engineOn || state.gear === 0}>
          Accelerate
        </button>
        <button onClick={stop} disabled={!state.engineOn || state.speed === 0 || state.isStopped}>
          Stop
        </button>
      </div>
    </div>
  );
}
