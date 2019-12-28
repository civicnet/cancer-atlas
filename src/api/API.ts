import { ServiceType } from "../components/ServiceMap";
import oboe from "oboe";

const VERSION = "0.2.4";

// TODO: Unify these two
export const fetchJSON = async (
  files: ServiceType[],
  cb: (data: any) => void
) => {
  const type = "json";
  const responses = files.map(file =>
    fetch(
      `https://cdn.jsdelivr.net/gh/civicnet/cancer-atlas-scripts@${VERSION}/data/${type}/national/${file}.${type}`
    )
      .then(response => response.json())
      .then(json => {
        return json.map((service: any) => {
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

export const streamJSON = (files: ServiceType[], cb: (data: any) => void) => {
  const type = "json";
  files.map(file => {
    oboe(
      `https://cdn.jsdelivr.net/gh/civicnet/cancer-atlas-scripts@${VERSION}/data/${type}/national/${file}.${type}`
    )
      .done(function(things) {
        cb(things);
      })
      .fail(function() {
        console.log("fail oboe");
      });
  });
};
