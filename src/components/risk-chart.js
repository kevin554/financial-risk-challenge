import { useLayoutEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { HEADER, riskFormulas } from "../services/risk-service";

am4core.useTheme(am4themes_animated);

export default function RiskChart({risk}) {
    const chart = useRef(null);

    useLayoutEffect(function() {
        initChart(chart);
    }, []);

    if (risk) {
        let newData = [];
        let riskTaken = riskFormulas[risk - 1];

        HEADER.forEach(function(obj) {
            if (riskTaken[obj.key]) {
                newData.push({ "label": obj.key, "data": riskTaken[obj.key], });
            }
        });

        if (chart) {
            chart.current.data = newData;
        }
    }

    return <>
        <div id="chartdiv"></div>
    </>
}

function initChart(chart) {
    am4core.ready(function() {
        var x = am4core.create("chartdiv", am4charts.PieChart);

        // Add and configure Series
        var pieSeries = x.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.category = "label";
        pieSeries.dataFields.value = "data";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeOpacity = 1;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;
        pieSeries.slices.template.showTooltipOn = "always";

        x.hiddenState.properties.radius = am4core.percent(0);
        
        chart.current = x;
        
        return function() {
            x.dispose();
        };
    });
}
