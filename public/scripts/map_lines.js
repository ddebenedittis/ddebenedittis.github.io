/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);

// Create the map chart
// https://www.amcharts.com/docs/v5/charts/map-chart/
var chart = root.container.children.push(am5map.MapChart.new(root, {
  panX: "rotateX",
  panY: "translateY",
  projection: am5map.geoMercator(),
  homeGeoPoint: { latitude: 2, longitude: 2 }
}));

var cont = chart.children.push(am5.Container.new(root, {
  layout: root.horizontalLayout,
  x: 20,
  y: 40
}));

// Add labels and controls
cont.children.push(am5.Label.new(root, {
  centerY: am5.p50,
  text: "Map"
}));

var switchButton = cont.children.push(am5.Button.new(root, {
  themeTags: ["switch"],
  centerY: am5.p50,
  icon: am5.Circle.new(root, {
    themeTags: ["icon"]
  })
}));

switchButton.on("active", function() {
  if (!switchButton.get("active")) {
    chart.set("projection", am5map.geoMercator());
    chart.set("panY", "translateY");
    chart.set("rotationY", 0);
    backgroundSeries.mapPolygons.template.set("fillOpacity", 0);
  } else {
    chart.set("projection", am5map.geoOrthographic());
    chart.set("panY", "rotateY")

    backgroundSeries.mapPolygons.template.set("fillOpacity", 0.1);
  }
});

cont.children.push(
  am5.Label.new(root, {
    centerY: am5.p50,
    text: "Globe"
  })
);

// Create series for background fill
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
backgroundSeries.mapPolygons.template.setAll({
  fill: root.interfaceColors.get("alternativeBackground"),
  fillOpacity: 0,
  strokeOpacity: 0
});

// Add background polygon
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
backgroundSeries.data.push({
  geometry: am5map.getGeoRectangle(90, 180, -90, -180)
});

// Create main polygon series for countries
// https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
  geoJSON: am5geodata_worldLow
}));

polygonSeries.mapPolygons.template.setAll({
  tooltipText: "{name}",
  templateField: "polygonSettings"
});

// Visited countries
// IT, GB, FR, ES, DE, CZ, HU, NO, SE, GR, CH, PT, AT, NL, HR, BG

polygonSeries.data.setAll([
  {id: "IT", polygonSettings: {fill: am5.color(0x7dd97b)}},
  {id: "GB", polygonSettings: {fill: am5.color(0x7dd97b)}},
  {id: "FR", polygonSettings: {fill: am5.color(0x7dd97b)}},
  {id: "ES", polygonSettings: {fill: am5.color(0x7dd97b)}},
  {id: "DE", polygonSettings: {fill: am5.color(0x7dd97b)}},
  {id: "CZ", polygonSettings: {fill: am5.color(0x7dd97b)}},
  {id: "HU", polygonSettings: {fill: am5.color(0x7dd97b)}},
  {id: "NO", polygonSettings: {fill: am5.color(0x7dd97b)}},
  {id: "SE", polygonSettings: {fill: am5.color(0x7dd97b)}},
  {id: "GR", polygonSettings: {fill: am5.color(0x7dd97b)}},
  {id: "CH", polygonSettings: {fill: am5.color(0x7dd97b)}},
  {id: "PT", polygonSettings: {fill: am5.color(0x7dd97b)}},
  {id: "AT", polygonSettings: {fill: am5.color(0x7dd97b)}},
  {id: "NL", polygonSettings: {fill: am5.color(0x7dd97b)}},
  {id: "HR", polygonSettings: {fill: am5.color(0x7dd97b)}},
  {id: "BG", polygonSettings: {fill: am5.color(0x7dd97b)}}
]);

// Create line series for trajectory lines
// https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/
var lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
lineSeries.mapLines.template.setAll({
  stroke: root.interfaceColors.get("alternativeBackground"),
  strokeOpacity: 0.3
});

// Create point series for markers
// https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

/* ========================================================================= */

var circleTemplate = am5.Template.new({
  tooltipText: "{title}\n{description}",
  fill: am5.color(0xffba00),
  stroke: root.interfaceColors.get("background"),
  strokeWidth: 2,
  tooltip: am5.Tooltip.new(root, {
    labelText: "{title}\n{description}",
    labelFill: am5.color(0xFFFFFF)
  })
});

var imageTemplate = am5.Template.new({
  src: ""
});

// Set the point series with templateField
pointSeries.setAll({
  polygonIdField: "id",
  calculateAggregates: true,
  valueField: "value"
});

pointSeries.bullets.push(function(root, dataItem) {
  // Create a container to hold both the circle and the image
  var container = am5.Container.new(root, {
    tooltipText: "{title}",
    cursorOverStyle: "pointer",
    draggable: false,
    scale: 1,
  });

  container.events.on("click", function () {
    var dataItem = container.dataItem;
    if (dataItem && dataItem.dataContext && dataItem.dataContext.url) {
      window.open(dataItem.dataContext.url, "_blank");      // new tab
      // window.location.href = dataItem.dataContext.url;   // same tab
    }
  });

  // Create the background circle with custom color
  var circle = am5.Circle.new(root, {
    radius: 10,
    templateField: "circleTemplate"
  }, circleTemplate);

  // Create the image
  var image = am5.Picture.new(root, {
    width: 16,
    height: 16,
    centerX: am5.p50,
    centerY: am5.p50,
    templateField: "imageTemplate"
  }, imageTemplate);

  container.children.push(circle);
  container.children.push(image);

  return am5.Bullet.new(root, { sprite: container });
});

// chart.events.on("wheel", function() {
chart.events.onAll(function(event) {
  setTimeout(() => {
  var zoomLevel = chart.get("zoomLevel") || 1;

  pointSeries.dataItems.forEach(function(dataItem) {
    if (dataItem.bullets) {
      dataItem.bullets.forEach(function(bullet) {
        var container = bullet.get("sprite");
        if (container) {
          container.animate({
            key: "scale",
            to: zoomLevel ** 0.35,
            duration: 400,
            easing: am5.ease.out(am5.ease.cubic)
          });
        }
      });
    }
  });
  }, 400); // 200ms delay before animation starts
});

// Debugging events
// chart.events.onAll(function(event) {
//   console.log("Event triggered:", event);
// });

/* ========================================================================= */

var bari = addCity(
  41.1253, 16.8662,
  "Bari – Scacchi",
  "https://www.liceoscacchibari.it/",
  "#6f869a",
  "/icons/scacchi_white.png",
  "2009 – 2014\nScientific High School"
);
var pisa_1 = addCity(
  43.4667, 10.3500,
  "Pisa – UniPi & Sant'Anna",
  "/cv#sssa",
  "#b40010",
  "/icons/sssa_white.svg",
  "2014 – 2018\nBachelor's Degree in Mechanical Engineering"
);
var pisa_2 = addCity(
  43.9667, 10.6500,
  "Pisa – UniPi",
  "/cv#phd",
  "#0f4a7c",
  "/icons/unipi_white.svg",
  "2018 – 2026\nMaster's Degree and PhD in Robotics Engineering"
);
var madrid = addCity(
  40.4168, -3.7038,
  "Madrid – CSIC",
  "/cv#csic",
  "#b01220",
  "/icons/csic_white.svg",
  "Apr. 2023\nResearch stay"
);

var lineDataItem = lineSeries.pushDataItem({
  pointsToConnect: [bari, pisa_1, madrid, pisa_2]
});

var planeSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

var plane = am5.Graphics.new(root, {
  svgPath:
    "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47",
  scale: 0.06,
  centerY: am5.p50,
  centerX: am5.p50,
  fill: am5.color(0x000000)
});

planeSeries.bullets.push(function() {
  var container = am5.Container.new(root, {});
  container.children.push(plane);
  return am5.Bullet.new(root, { sprite: container });
});


var planeDataItem = planeSeries.pushDataItem({
  lineDataItem: lineDataItem,
  positionOnLine: 0,
  autoRotate: true
});
planeDataItem.dataContext = {};

planeDataItem.animate({
  key: "positionOnLine",
  to: 1,
  duration: 10000,
  loops: Infinity,
  easing: am5.ease.yoyo(am5.ease.linear)
});

planeDataItem.on("positionOnLine", (value) => {
  if (planeDataItem.dataContext.prevPosition < value) {
    plane.set("rotation", 0);
  }

  if (planeDataItem.dataContext.prevPosition > value) {
    plane.set("rotation", -180);
  }
  planeDataItem.dataContext.prevPosition = value;
});

function addCity(latitude, longitude, title, url, color, imageSrc, description) {
  var dataItem = pointSeries.pushDataItem({
    latitude: latitude,
    longitude: longitude,
    title: title,
    description: description,
    circleTemplate: { fill: color },
    imageTemplate: { src: imageSrc }
  });

  // Explicitly set dataContext to ensure URL is accessible in click event
  dataItem.dataContext = {
    url: url,
    circleTemplate: { fill: color },
    imageTemplate: { src: imageSrc },
  };

  return dataItem;
}

// Make stuff animate on load
chart.appear(1000, 100);