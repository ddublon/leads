import { useEffect } from "react";
import "./App.css";
import {
  lightningChart,
  LightningChart,
  ChartXY,
  PolygonSeries,
  AutoCursorModes,
  SolidFill,
  ColorHEX,
  SolidLine,
  UIElementBuilders,
  UIOrigins,
  UITextBox,
  UIElement,
  UIBackground,
  emptyLine,
  emptyFill,
  Axis,
  EllipseSeries,
  LinearGradientFill,
} from "@arction/lcjs";

const contactColor = ColorHEX("#9E9E9e");
const solidFillContact = new SolidFill({ color: contactColor });

// https://lightningchart.com/js-charts/interactive-examples/edit/lcjs-example-0105-temperatureVariations.html
// https://www.w3schools.com/css/css3_gradients.asp
const solidFillBody = new LinearGradientFill({
  angle: 90,
  stops: [
    { color: ColorHEX("#C9C9C9"), offset: 0 },
    { color: ColorHEX("#EEEEEE"), offset: 0.5 },
    { color: ColorHEX("#C9C9C9"), offset: 1 },
  ],
});

const solidFillBackgroundCircle = new LinearGradientFill({
  angle: 90,
  stops: [
    { color: ColorHEX("#B4B4B4"), offset: 0 },
    { color: ColorHEX("#E0E0E0"), offset: 0.5 },
    { color: ColorHEX("#B4B4B4"), offset: 1 },
  ],
});

const drawText = (
  chart: ChartXY,
  axisX: Axis,
  axisY: Axis,
  text: string,
  center: { x: number; y: number }
) => {
  // Add text box for contact label
  const contactLabelTextBox = chart
    .addUIElement(UIElementBuilders.TextBox, { x: axisX, y: axisY })
    .setOrigin(UIOrigins.Center)
    .setVisible(true)
    .setText(text);

  // Set text box background
  contactLabelTextBox.setBackground((background: UIBackground) =>
    background.setFillStyle(emptyFill).setStrokeStyle(emptyLine)
  );

  // Disable mouse interactions for text box
  contactLabelTextBox.setMouseInteractions(false);

  // Function to update position of the text box
  const updatePosition = (textBox: UITextBox & UIElement) => {
    textBox.setPosition({ x: center.x, y: center.y });
  };

  // Update text box position
  updatePosition(contactLabelTextBox);
};

const drawLeadBody = (polygonSeries: PolygonSeries, topBody: number) => {
  const left = 4.35;
  const right = 5.65;

  const bottomBody = 3;
  polygonSeries
    .add([
      { x: left, y: topBody },
      { x: left, y: bottomBody },
      { x: right, y: bottomBody },
      { x: right, y: topBody },
      { x: left, y: topBody },
    ])
    .setFillStyle(solidFillBody)
    .setStrokeStyle(
      new SolidLine({
        thickness: 1,
        fillStyle: solidFillBody,
      })
    );
};

const drawContact = (
  top: number,
  text: string,
  polygonSeries: PolygonSeries,
  chart: ChartXY,
  axisX: Axis,
  axisY: Axis,
  ellipseSeries: EllipseSeries
) => {
  // Constants for left and right positions
  const left = 4.35;
  const right = 5.65;

  const upperCircle = ellipseSeries
    .add({ x: 5, y: top, radiusX: 0.65, radiusY: 0.2 })
    // Optional, changing default style
    .setFillStyle(solidFillBackgroundCircle)
    .setStrokeStyle(
      new SolidLine({ thickness: 1, fillStyle: solidFillBackgroundCircle })
    );

  // Calculate bottom from top by adding 1.5
  const bottom = top - 1.5;

  // Calculate center coordinates
  const centerX = (left + right) / 2;
  const centerY = (top + bottom) / 2;
  const center = { x: centerX, y: centerY };

  // Draw polygon representing contact
  polygonSeries
    .add([
      { x: left, y: top },
      { x: right, y: top },
      { x: right, y: bottom },
      { x: left, y: bottom },
      { x: left, y: top },
    ])
    .setFillStyle(solidFillContact)
    .setStrokeStyle(
      new SolidLine({
        thickness: 1,
        fillStyle: solidFillContact,
      })
    );

  drawText(chart, axisX, axisY, text, center);
};

const drawRightContact = (
  top: number,
  text: string,
  polygonSeries: PolygonSeries,
  chart: ChartXY,
  axisX: Axis,
  axisY: Axis,
  ellipseSeries: EllipseSeries
) => {
  // Constants for left and right positions
  const left = 5.8;
  const right = 7.1;
  const midpoint = (left + right) / 2;

  const upperCircle = ellipseSeries
    .add({ x: midpoint, y: top, radiusX: 0.65, radiusY: 0.2 })
    // Optional, changing default style
    .setFillStyle(solidFillBackgroundCircle)
    .setStrokeStyle(
      new SolidLine({ thickness: 1, fillStyle: solidFillBackgroundCircle })
    );

  // Calculate bottom from top by adding 1.5
  const bottom = top - 1.5;

  // Calculate center coordinates
  const centerX = (left + right) / 2;
  const centerY = (top + bottom) / 2;
  const center = { x: centerX, y: centerY };

  // Draw polygon representing contact
  polygonSeries
    .add([
      { x: left, y: top },
      { x: right, y: top },
      { x: right, y: bottom },
      { x: left, y: bottom },
      { x: left, y: top },
    ])
    .setFillStyle(solidFillContact)
    .setStrokeStyle(
      new SolidLine({
        thickness: 1,
        fillStyle: solidFillContact,
      })
    );

  drawText(chart, axisX, axisY, text, center);
};

const drawLeftContact = (
  top: number,
  text: string,
  polygonSeries: PolygonSeries,
  chart: ChartXY,
  axisX: Axis,
  axisY: Axis,
  ellipseSeries: EllipseSeries
) => {
  // Constants for left and right positions
  const left = 2.9;
  const right = 4.2;
  const midpoint = (left + right) / 2;

  const upperCircle = ellipseSeries
    .add({ x: midpoint, y: top, radiusX: 0.65, radiusY: 0.2 })
    // Optional, changing default style
    .setFillStyle(solidFillBackgroundCircle)
    .setStrokeStyle(
      new SolidLine({ thickness: 1, fillStyle: solidFillBackgroundCircle })
    );

  // Calculate bottom from top by adding 1.5
  const bottom = top - 1.5;

  // Calculate center coordinates
  const centerX = (left + right) / 2;
  const centerY = (top + bottom) / 2;
  const center = { x: centerX, y: centerY };

  // Draw polygon representing contact
  polygonSeries
    .add([
      { x: left, y: top },
      { x: right, y: top },
      { x: right, y: bottom },
      { x: left, y: bottom },
      { x: left, y: top },
    ])
    .setFillStyle(solidFillContact)
    .setStrokeStyle(
      new SolidLine({
        thickness: 1,
        fillStyle: solidFillContact,
      })
    );

  drawText(chart, axisX, axisY, text, center);
};

const drawLastContact = (
  top: number,
  text: string,
  polygonSeries: PolygonSeries,
  chart: ChartXY,
  axisX: Axis,
  axisY: Axis,
  ellipseSeries: EllipseSeries
) => {
  const upperCircle = ellipseSeries
    .add({ x: 5, y: top, radiusX: 0.65, radiusY: 0.2 })
    // Optional, changing default style
    .setFillStyle(solidFillBackgroundCircle)
    .setStrokeStyle(
      new SolidLine({ thickness: 1, fillStyle: solidFillBackgroundCircle })
    );

  // Constants for left and right positions
  const left = 4.35;
  const right = 5.65;

  // Calculate bottom from top by adding 1 and not 1.5 because we need to also add the ellipse at the end
  const bottom = top - 1;

  // Calculate center coordinates
  const centerX = (left + right) / 2;
  const centerY = (top + bottom) / 2;
  const center = { x: centerX, y: centerY };

  // Draw polygon representing contact
  polygonSeries
    .add([
      { x: left, y: top },
      { x: right, y: top },
      { x: right, y: bottom },
      { x: left, y: bottom },
      { x: left, y: top },
    ])
    .setFillStyle(solidFillContact)
    .setStrokeStyle(
      new SolidLine({
        thickness: 1,
        fillStyle: solidFillContact,
      })
    );

  const lowerCircle = ellipseSeries
    .add({ x: 5, y: bottom, radiusX: 0.65, radiusY: 0.5 })
    // Optional, changing default style
    .setFillStyle(solidFillContact)
    .setStrokeStyle(
      new SolidLine({ thickness: 1, fillStyle: solidFillContact })
    );

  drawText(chart, axisX, axisY, text, center);
};

const App = () => {
  useEffect(
    () => {
      const lc: LightningChart = lightningChart();
      const chart: ChartXY = lc.ChartXY({
        container: "chart",
      });
      chart.setTitle(``);
      chart.setMouseInteractions(false);

      let polygonSeries: PolygonSeries = chart.polygonSeriesLead;
      const electrodeName = "Boston Scientific Vercise";
      if (electrodeName === "Boston Scientific Vercise") {
        // Boston Scientific Vercise Segmented
        // decided to make 5 as the center of the lead.
        const axisX = chart.getDefaultAxisX();
        const axisY = chart.getDefaultAxisY();

        // Initialize polygonSeries if it doesn't exist
        if (!polygonSeries) {
          polygonSeries = chart.addPolygonSeries({ axisX, axisY });
          polygonSeries.setAutoScrollingEnabled(false);
          console.log({ polygonSeries });
          chart.polygonSeriesLead = polygonSeries;
          polygonSeries.setAutoScrollingEnabled(false);
          polygonSeries.setHighlightOnHover(false);
          chart.setAutoCursorMode(AutoCursorModes.disabled);
        }
        drawLeadBody(polygonSeries, 10);
        const ellipseSeries = chart
          .addEllipseSeries()
          .setAutoScrollingEnabled(false)
          .setHighlightOnHover(false);
        drawContact(9, "4", polygonSeries, chart, axisX, axisY, ellipseSeries);
        drawContact(7, "3A", polygonSeries, chart, axisX, axisY, ellipseSeries);
        drawRightContact(7, "3B", polygonSeries, chart, axisX, axisY, ellipseSeries);
        drawLeftContact(7, "3C", polygonSeries, chart, axisX, axisY, ellipseSeries);
        drawContact(5, "2A", polygonSeries, chart, axisX, axisY, ellipseSeries);
        drawRightContact(5, "2B", polygonSeries, chart, axisX, axisY, ellipseSeries);
        drawLeftContact(5, "2B", polygonSeries, chart, axisX, axisY, ellipseSeries);
        drawLastContact(
          3,
          "1",
          polygonSeries,
          chart,
          axisX,
          axisY,
          ellipseSeries
        );
      }


      return () => {
        // second
        chart.dispose();
      };
    },
    [
      // third
    ]
  );

  return (
    <div
      id="chart"
      style={{ width: "500px", height: "500px", border: "1px black solid" }}
    ></div>
  );
};

export default App;
