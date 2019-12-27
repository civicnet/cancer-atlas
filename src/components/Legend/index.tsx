import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";

import { LayerType } from "../LayerPicker/LayerPickerSlice";
import { getAggregateColorRange } from "../ServiceMap/layers";
import chroma from "chroma-js";
import { Icon } from "@material-ui/core";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const Legend: React.FC<Props> = props => {
  const { layerType } = useSelector(
    (state: RootState) => state.layerPickerReducer
  );

  return (
    <div className={props.className} style={props.style}>
      {(layerType === LayerType.Heatmap || layerType === LayerType.Grid) && (
        <div style={{ flex: 1, display: "flex", border: "2px solid #FFF" }}>
          {getAggregateColorRange().map((color, idx) => (
            <div
              key={`legend-${color}-${idx}`}
              style={{
                flex: 1,
                backgroundColor: chroma(color).hex(),
                display: "flex",
                textAlign: "center"
              }}
            >
              {idx === 0 && (
                <Icon
                  title="Zone cu număr mai mic de furnizori de servicii medicale"
                  className="fal fa-long-arrow-alt-down"
                  style={{ color: "#fff", alignSelf: "center" }}
                />
              )}
              {idx === 5 && (
                <Icon
                  title="Zone cu număr mai mare de furnizori de servicii medicale"
                  className="fal fa-long-arrow-alt-up"
                  style={{ color: "#333", alignSelf: "center" }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Legend;
