import { useState, Fragment, FC } from "react";
import myModule from "./periodic_table_data.tsx";
import Element from "./Element.tsx";
import "./styles/main.css";

interface ElementInfo {
  name: string;
  appearance?: string;
  atomic_mass?: number;
  boil?: number;
  category?: string;
  color?: string | null;
  density?: number;
  discovered_by?: string;
  melt?: number;
  molar_heat?: number;
  named_by?: string;
  number: number;
  period?: number;
  phase?: string;
  source?: string;
  spectral_img?: string;
  summary: string;
  symbol: string;
  xpos?: number;
  ypos?: number;
  shells?: number[];
}

const PeriodicTable: FC = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [element, setElement] = useState<ElementInfo | null>(null);
  const [showLegend] = useState<boolean>(true);

  const showElementInfo = (num: number): void => {
    const selectedElement = myModule.elements[num] as ElementInfo | undefined;
    if (selectedElement) {
      setShowInfo(true);
      setElement(selectedElement);
    } else {
      // Handle the case where selectedElement is undefined
      console.error(`Element not found for number: ${num}`);
    }
  };

  const closeElementInfo = (): void => {
    setShowInfo(false);
  };

  const populateElements = (start: number, end: number): JSX.Element[] => {
    return Array.from({ length: end - start + 1 }, (_, index) => (
        <Element key={start + index} showInfo={showElementInfo} num={start + index} />
    ));
  };

  return (
      <div className="wrapper">
        <div id="table">
          {/* Elements 1-4 */}
          {populateElements(1, 4)}
          {/* Information Table */}
          {showInfo && element && (
              <Fragment>
                <div id="element-box" className={`${element.category}`}>
                  <div className="number">{element.number}</div>
                  <div className="symbol">{element.symbol}</div>
                  <div className="element-name">{element.name}</div>
                </div>
                <div id="information">
                  <div
                      onClick={closeElementInfo}
                      className="close-button"
                      title="Close Info"
                  >
                    Close [&times;]
                  </div>
                  <div>
                    <h1 className="big_title">{element.name}</h1>
                    <span className={`cat_name ${element.category}`}>{element.category}</span>
                    {element.appearance && (
                        <div className="appearance">
                          <strong>Appearance:</strong> {element.appearance}
                        </div>
                    )}
                    <div className="atom_info">
                      <span>Atomic Mass: {element.atomic_mass} | </span>
                      <span>Density: {element.density}</span>
                      {element.molar_heat && <span> | Molar Heat: {element.molar_heat}</span>}
                      {element.melt && <span> | Melt: {element.melt}K</span>}
                      {element.boil && <span> | Boil: {element.boil}K</span>}
                    </div>
                    <div>
                      {element.summary} ...{" "}
                      <a target="_blank" rel="noopener noreferrer" href={element.source}>
                        Source
                      </a>
                    </div>
                  </div>
                </div>
              </Fragment>
          )}

          {/* Populating elements from 5-57 */}
          {populateElements(5, 57)}
          {/* Lanthanoids split 72-89 */}
          {populateElements(72, 89)}
          {/* Actinoids split 104-119*/}
          {populateElements(104, 118)}
          {/* Lanthanoids 58-71*/}
          {populateElements(58, 71)}
          {/* Actinoids 90-103 */}
          {populateElements(90, 103)}
        </div>
        {showLegend && (
            <Fragment>
              <div id="legend-parent">
                <h1>E L E M E N T S - L E G E N D</h1>
                <div className="legend">
                  {/* Legend items go here */}
                </div>
              </div>
            </Fragment>
        )}
      </div>
  );
};

export default PeriodicTable;
