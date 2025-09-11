import {
  Map as MapLibre,
  NavigationControl,
  FullscreenControl,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export function renderMap(container, setZoom, mapTilerApiKey) {
  const map = new MapLibre({
    container,
    zoom: 15.5,
    center: [144.96177471761524, -37.81467349847328],
    style: `https://api.maptiler.com/maps/backdrop/style.json?key=${mapTilerApiKey}`,
    pitch: 0,
    maxZoom: 18,
    maxPitch: 85,
  });

  map.addControl(new FullscreenControl(), "top-left");
  map.addControl(
    new NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true,
      visualizeRoll: true,
    }),
    "top-left"
  );

  // map.on("load", () => {
  //   const firstSymbolId = getFirstSymbol(map);
  //   addDevelopmentData(map, firstSymbolId);

  //   onSourceLoad(map, "street-addresses-source").then(() => {
  //     setTimeout(() => {
  //       map.zoomTo(7, { duration: 10000 });
  //     }, 2000);
  //   });

  //   updateZoom(map, setZoom);
  // });

  map.on("zoom", () => {
    updateZoom(map, setZoom);
  });
}

const onSourceLoad = (map, targetSourceId) =>
  new Promise((resolve) => {
    const loadingCheck = (event) => {
      const { isSourceLoaded, sourceId } = event;
      if (isSourceLoaded && sourceId === targetSourceId) {
        map.off("sourcedata", loadingCheck);
        resolve();
      }
    };

    map.on("sourcedata", loadingCheck);
  });

function updateZoom(map, setZoom) {
  const zoom = map.getZoom();
  setZoom(zoom.toFixed(2));
}

function addDevelopmentData(map, firstSymbolId) {
  map.addSource("street-addresses-source", {
    type: "geojson",
    // data: "https://clived.live/street-addresses.geojson",
    data: "/development-activity-monitor.geojson",
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
  });

  map.addLayer(
    {
      id: "heatmap",
      type: "heatmap",
      source: "street-addresses-source",
      maxzoom: 13,
      paint: {
        "heatmap-weight": [
          "interpolate",
          ["linear"],
          ["get", "mag"],
          0,
          0,
          10,
          1,
        ],
        "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 1, 12, 80],
        "heatmap-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          0,
          0,
          8,
          1,
          12,
          0,
        ],
        "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 12, 4],
        "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0,
          "rgba(33,102,172,0)",
          0.2,
          "rgb(103,169,207)",
          0.4,
          "rgb(209,229,240)",
          0.6,
          "rgb(253,219,199)",
          0.8,
          "rgb(239,138,98)",
          1,
          "rgb(178,24,43)",
        ],
      },
    },
    firstSymbolId
  );

  map.addLayer(
    {
      id: "street-addresses-layer",
      type: "circle",
      source: "street-addresses-source",
      paint: {
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          4,
          1,
          6,
          1.5,
          8,
          2,
          12,
          2.5,
          16,
          5,
        ],
        "circle-opacity": 0.8,
        "circle-color": "#51bbd6",
      },
      filter: ["==", "$type", "Point"],
      minzoom: 9,
      maxzoom: 24,
    },
    firstSymbolId
  );

  map.addLayer(
    {
      id: "clusters",
      type: "circle",
      source: "street-addresses-source",
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#51bbd6",
          100,
          "#f1f075",
          750,
          "#f28cb1",
        ],
        "circle-opacity": ["interpolate", ["linear"], ["zoom"], 9, 0, 10, 1],
        "circle-radius": ["step", ["get", "point_count"], 10, 50, 15, 500, 25],
      },
      minzoom: 9,
    },
    firstSymbolId
  );

  map.addLayer(
    {
      id: "cluster-count",
      type: "symbol",
      source: "street-addresses-source",
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["Arial Unicode MS Bold"],
        "text-variable-anchor": ["top", "bottom", "left", "right"],
        "text-size": 8,
      },
      minzoom: 9,
    },
    firstSymbolId
  );

  map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: "street-addresses-source",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#11b4da",
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  });

  map.on("click", "clusters", async (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["clusters"],
    });
    const clusterId = features[0].properties.cluster_id;
    const zoom = await map
      .getSource("street-addresses-source")
      .getClusterExpansionZoom(clusterId);
    map.easeTo({
      center: features[0].geometry.coordinates,
      zoom,
    });
  });

  map.on("mouseenter", "clusters", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "clusters", () => {
    map.getCanvas().style.cursor = "";
  });
}

function getFirstSymbol(map) {
  const layers = map.getStyle().layers;

  let firstSymbolId;
  for (let i = 0; i < layers.length; i++) {
    if (layers[i].type === "symbol") {
      firstSymbolId = layers[i].id;
      break;
    }
  }

  return firstSymbolId;
}

// function checkSourceIsLoaded(source) {
//   let limit = 1000
//   const intervalId = setInterval(() => {
//     if (limit-- < 1) {
//       map.isSourceLoaded(source)
//       clearInterval(intervalId)
//     }
//   }, 100)
// }
