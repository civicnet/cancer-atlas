import oboe from "oboe";
import {
  MedicalServiceData,
  MedicalServiceDataLayer,
  ApiCode
} from "../components/ServiceMap/ServiceMapSlice";

import { ServiceType } from "../components/ServiceMap/ServiceMapSlice";

const VERSION = "0.2.4";
const getJsonPath = (type: string, file: string) =>
  `https://cdn.jsdelivr.net/gh/civicnet/cancer-atlas-scripts@${VERSION}/data/${type}/national/${file}.${type}`;

export const fetchGeoJSON = async (
  files: { file: string; type: ServiceType }[],
  cb: (data: any) => void
) => {
  const type = "geojson";
  const responses = files.map(({ file }) =>
    fetch(
      `https://cdn.jsdelivr.net/gh/civicnet/cancer-atlas-scripts@${VERSION}/data/${type}/${file}.${type}`
    )
      .then(response => response.json())
      .then(json => {
        return json.features.map((service: any) => {
          return {
            ...service,
            type: file
          };
        });
      })
  );

  Promise.all(responses).then(results => {
    const allServices = [].concat.apply([], results);
    cb(allServices);
  });
};

export const streamJSON = (
  files: ServiceType[],
  onDone: (service: ServiceType, data: MedicalServiceDataLayer) => void,
  onEach: (data: MedicalServiceData) => void,
  onFail: (service: ServiceType, msg: string) => void
) => {
  const type = "json";
  files.forEach(file => {
    oboe(getJsonPath(type, file))
      .node("{lat lng}", (data: MedicalServiceData) => {
        onEach(data);
        return {
          ...data,
          type: file
        };
      })
      .done((data: MedicalServiceData[]) => {
        onDone(file, {
          data,
          status: {
            code: ApiCode.OK
          }
        });
      })
      .fail(() => {
        onFail(file, `failed loading data`);
      });
  });
};
