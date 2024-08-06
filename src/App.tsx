import React, { useEffect } from "react";
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
const BackgroundFill = new SolidFill({
  // to optimize this I can share the same BackgroundFill object across all charts
  color: ColorHEX("#ffffff"),
});

const BackgroundFillBlack = new SolidFill({
  // to optimize this I can share the same BackgroundFill object across all charts
  color: ColorHEX("#ffffff"),
});
const solidFillContact = new LinearGradientFill({
  angle: 90,
  stops: [
    { color: ColorHEX("#404040"), offset: 0 },
    { color: ColorHEX("#C9C9C9"), offset: 0.5 },
    { color: ColorHEX("#404040"), offset: 1 },
  ],
});

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

const segmentedWhiteBar = new SolidFill({
  // to optimize this I can share the same BackgroundFill object across all charts
  color: ColorHEX("#eeeeee"),
});

const segmentedWhiteDarkerBar = new SolidFill({
  // to optimize this I can share the same BackgroundFill object across all charts
  color: ColorHEX("#A3A3A3"),
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

  contactLabelTextBox.setTextFillStyle(BackgroundFillBlack);
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

const drawClosedSegmented = (
  top: number,
  text: string,
  polygonSeries: PolygonSeries,
  chart: ChartXY,
  axisX: Axis,
  axisY: Axis,
  ellipseSeries: EllipseSeries,
  polygonSeriesSegmetedWhiteLines: PolygonSeries
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

  const bottomCircle = ellipseSeries
    .add({ x: 5, y: bottom, radiusX: 0.65, radiusY: 0.2 })
    // Optional, changing default style
    .setFillStyle(solidFillContact)
    .setStrokeStyle(
      new SolidLine({ thickness: 1, fillStyle: solidFillContact })
    );

  // Calculate center coordinates
  const centerX = (left + right) / 2;
  const centerY = (top + bottom) / 2;
  const center = { x: centerX, y: centerY };
  // Draw polygon representing contact
  polygonSeries
    .add([
      { x: centerX, y: top },
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

  // draw white lines for segmented contact
  polygonSeriesSegmetedWhiteLines
    .add([
      { x: centerX - 0.03, y: top + 0.2 },
      { x: centerX + 0.03, y: top + 0.2 },
      { x: centerX + 0.03, y: top - 0.2 },
      { x: centerX - 0.03, y: top - 0.2 },
      { x: centerX - 0.03, y: top + 0.2 },
    ])
    .setFillStyle(segmentedWhiteBar)
    .setStrokeStyle(
      new SolidLine({
        thickness: 1,
        fillStyle: segmentedWhiteBar,
      })
    );

  polygonSeriesSegmetedWhiteLines
    .add([
      { x: right - 0.03 - 0.2, y: top - 0.15 },
      { x: right + 0.03 - 0.2, y: top - 0.14 },
      { x: right + 0.03 - 0.2, y: bottom - 0.14 },
      { x: right - 0.03 - 0.2, y: bottom - 0.15 },
      { x: right - 0.03 - 0.2, y: top - 0.2 },
    ])
    .setFillStyle(segmentedWhiteDarkerBar)
    .setStrokeStyle(
      new SolidLine({
        thickness: 1,
        fillStyle: segmentedWhiteDarkerBar,
      })
    );

  polygonSeriesSegmetedWhiteLines
    .add([
      { x: right - 0.03 - 0.2, y: top - 0.15 },
      { x: right + 0.03 - 0.2, y: top - 0.14 },
      { x: right + 0.03 - 0.2, y: bottom - 0.14 },
      { x: right - 0.03 - 0.2, y: bottom - 0.15 },
      { x: right - 0.03 - 0.2, y: top - 0.2 },
    ])
    .setFillStyle(segmentedWhiteDarkerBar)
    .setStrokeStyle(
      new SolidLine({
        thickness: 1,
        fillStyle: segmentedWhiteDarkerBar,
      })
    );

  polygonSeriesSegmetedWhiteLines
    .add([
      { x: left + 0.03 + 0.2, y: top - 0.15 },
      { x: left - 0.03 + 0.2, y: top - 0.14 },
      { x: left - 0.03 + 0.2, y: bottom - 0.14 },
      { x: left + 0.03 + 0.2, y: bottom - 0.15 },
      { x: left + 0.03 + 0.2, y: top - 0.2 },
    ])
    .setFillStyle(segmentedWhiteDarkerBar)
    .setStrokeStyle(
      new SolidLine({
        thickness: 1,
        fillStyle: segmentedWhiteDarkerBar,
      })
    );

  drawText(chart, axisX, axisY, text, center);
};

const drawLeadBody = (
  polygonSeries: PolygonSeries,
  topBody: number,
  bottomBody: number,
  ellipseSeries: EllipseSeries
) => {
  const left = 4.35;
  const right = 5.65;

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


    ellipseSeries
    .add({ x: 5, y: bottomBody, radiusX: 0.65, radiusY: 0.7 })
    // Optional, changing default style
    .setFillStyle(solidFillBody)
    .setStrokeStyle(
      new SolidLine({ thickness: 1, fillStyle: solidFillBody })
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

  const bottomCircle = ellipseSeries
    .add({ x: 5, y: bottom, radiusX: 0.65, radiusY: 0.2 })
    // Optional, changing default style
    .setFillStyle(solidFillContact)
    .setStrokeStyle(
      new SolidLine({ thickness: 1, fillStyle: solidFillContact })
    );

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
  const bottomCircle = ellipseSeries
    .add({ x: midpoint, y: bottom, radiusX: 0.65, radiusY: 0.2 })
    // Optional, changing default style
    .setFillStyle(solidFillContact)
    .setStrokeStyle(
      new SolidLine({ thickness: 1, fillStyle: solidFillContact })
    );
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
  const bottomCircle = ellipseSeries
    .add({ x: midpoint, y: bottom, radiusX: 0.65, radiusY: 0.2 })
    // Optional, changing default style
    .setFillStyle(solidFillContact)
    .setStrokeStyle(
      new SolidLine({ thickness: 1, fillStyle: solidFillContact })
    );
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
      chart
        .setBackgroundFillStyle(BackgroundFill)
        .setSeriesBackgroundFillStyle(BackgroundFill);
      let polygonSeries: PolygonSeries = chart.polygonSeriesLead;
      let polygonSeriesSegmetedWhiteLines: PolygonSeries =
        chart.polygonSeriesLeadSegmetedWhiteLines;
      let ellipseSeries: EllipseSeries = chart.ellipseSeriesLead;

      const electrodeName = "Medtronic 33005";
      if (electrodeName === "Boston Scientific Vercise") {
        // Boston Scientific Vercise Segmented
        // decided to make 5 as the center of the lead.
        const axisX = chart.getDefaultAxisX();
        const axisY = chart.getDefaultAxisY();

        // Initialize polygonSeries if it doesn't exist
        if (
          !polygonSeries &&
          !ellipseSeries &&
          !polygonSeriesSegmetedWhiteLines
        ) {
          polygonSeries = chart.addPolygonSeries({ axisX, axisY });
          polygonSeries.setAutoScrollingEnabled(false);
          console.log({ polygonSeries });
          chart.polygonSeriesLead = polygonSeries;
          polygonSeries.setEffect(false);
          polygonSeries.setAutoScrollingEnabled(false);
          polygonSeries.setHighlightOnHover(false);

          polygonSeriesSegmetedWhiteLines = chart
            .addPolygonSeries({ axisX, axisY })
            .setDrawOrder({ seriesDrawOrderIndex: 10 });
          polygonSeriesSegmetedWhiteLines.setAutoScrollingEnabled(false);
          console.log({ polygonSeriesSegmetedWhiteLines });
          chart.polygonSeriesSegmetedWhiteLines =
            polygonSeriesSegmetedWhiteLines;
          polygonSeriesSegmetedWhiteLines.setEffect(false);
          polygonSeriesSegmetedWhiteLines.setAutoScrollingEnabled(false);
          polygonSeriesSegmetedWhiteLines.setHighlightOnHover(false);

          chart.setAutoCursorMode(AutoCursorModes.disabled);
          ellipseSeries = chart
            .addEllipseSeries()
            .setAutoScrollingEnabled(false)
            .setHighlightOnHover(false)
            .setEffect(false);
          chart.ellipseSeriesLead = ellipseSeries;
        }

        // drawLeadBody(polygonSeries, 10);
        drawContact(9, "4", polygonSeries, chart, axisX, axisY, ellipseSeries);
        drawContact(7, "3A", polygonSeries, chart, axisX, axisY, ellipseSeries);
        drawRightContact(
          7,
          "3B",
          polygonSeries,
          chart,
          axisX,
          axisY,
          ellipseSeries
        );
        drawLeftContact(
          7,
          "3C",
          polygonSeries,
          chart,
          axisX,
          axisY,
          ellipseSeries
        );
        drawContact(5, "2A", polygonSeries, chart, axisX, axisY, ellipseSeries);
        drawRightContact(
          5,
          "2B",
          polygonSeries,
          chart,
          axisX,
          axisY,
          ellipseSeries
        );
        drawLeftContact(
          5,
          "2B",
          polygonSeries,
          chart,
          axisX,
          axisY,
          ellipseSeries
        );
        drawLastContact(
          3,
          "1",
          polygonSeries,
          chart,
          axisX,
          axisY,
          ellipseSeries
        );
      } else if (electrodeName === "Medtronic 33005") {
        // Boston Scientific Vercise Segmented
        // decided to make 5 as the center of the lead.
        const axisX = chart.getDefaultAxisX();
        const axisY = chart.getDefaultAxisY();

        // Initialize polygonSeries if it doesn't exist
        if (!polygonSeries && !ellipseSeries) {
          polygonSeries = chart.addPolygonSeries({ axisX, axisY });
          polygonSeries.setAutoScrollingEnabled(false);
          console.log({ polygonSeries });
          chart.polygonSeriesLead = polygonSeries;
          polygonSeries.setEffect(false);
          polygonSeries.setAutoScrollingEnabled(false);
          polygonSeries.setHighlightOnHover(false);
          chart.setAutoCursorMode(AutoCursorModes.disabled);

          polygonSeriesSegmetedWhiteLines = chart
            .addPolygonSeries({ axisX, axisY })
            .setDrawOrder({ seriesDrawOrderIndex: 10 });
          polygonSeriesSegmetedWhiteLines.setAutoScrollingEnabled(false);
          console.log({ polygonSeriesSegmetedWhiteLines });
          chart.polygonSeriesSegmetedWhiteLines =
            polygonSeriesSegmetedWhiteLines;
          polygonSeriesSegmetedWhiteLines.setEffect(false);
          polygonSeriesSegmetedWhiteLines.setAutoScrollingEnabled(false);
          polygonSeriesSegmetedWhiteLines.setHighlightOnHover(false);

          ellipseSeries = chart
            .addEllipseSeries()
            .setAutoScrollingEnabled(false)
            .setHighlightOnHover(false)
            .setEffect(false);
          chart.ellipseSeriesLead = ellipseSeries;
        }

        drawLeadBody(polygonSeries, 10, 1, ellipseSeries);
        drawContact(9, "3", polygonSeries, chart, axisX, axisY, ellipseSeries);
        drawClosedSegmented(
          7,
          "2",
          polygonSeries,
          chart,
          axisX,
          axisY,
          ellipseSeries,
          polygonSeriesSegmetedWhiteLines
        );

        drawClosedSegmented(
          5,
          "1",
          polygonSeries,
          chart,
          axisX,
          axisY,
          ellipseSeries,
          polygonSeriesSegmetedWhiteLines
        );

        drawContact(3, "0", polygonSeries, chart, axisX, axisY, ellipseSeries);

        // drawContact(7, "3A", polygonSeries, chart, axisX, axisY, ellipseSeries);
        // drawRightContact(
        //   7,
        //   "3B",
        //   polygonSeries,
        //   chart,
        //   axisX,
        //   axisY,
        //   ellipseSeries
        // );
        // drawLeftContact(
        //   7,
        //   "3C",
        //   polygonSeries,
        //   chart,
        //   axisX,
        //   axisY,
        //   ellipseSeries
        // );
        // drawContact(5, "2A", polygonSeries, chart, axisX, axisY, ellipseSeries);
        // drawRightContact(
        //   5,
        //   "2B",
        //   polygonSeries,
        //   chart,
        //   axisX,
        //   axisY,
        //   ellipseSeries
        // );
        // drawLeftContact(
        //   5,
        //   "2B",
        //   polygonSeries,
        //   chart,
        //   axisX,
        //   axisY,
        //   ellipseSeries
        // );
        // drawLastContact(
        //   3,
        //   "1",
        //   polygonSeries,
        //   chart,
        //   axisX,
        //   axisY,
        //   ellipseSeries
        // );
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
      style={{
        width: "500px",
        height: "500px",
        border: "1px black solid",
        backgroundColor: "black",
      }}
    ></div>
  );
};

export default App;
