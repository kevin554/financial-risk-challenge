import { useState } from "react";
import RiskTable from "../components/risk-table";
import { HEADER, riskFormulas } from "../services/risk-service"
import React from "react";
import { useHistory } from "react-router-dom";

export default function Calculator() {
    const history = useHistory();
    const [riskData, setRiskData] = useState({});

    if (!history.location.state) {
        history.replace(`/`);
        return <></>
    }
    
    const selectedRiskNumber = history.location.state.risk;

    function canProcessData() {
        for (let obj of HEADER) {
            if (riskData[obj.key] == undefined || riskData[obj.key] == null) {
                return false;
            }
        }
        
        return true;
    }

    function calculateFormula(key) {
        // The key could be 'bond', 'large', 'mid', 'foreign', 'small'
        // and will be used to extract the amount that the user entered in each input

        if (!canProcessData()) {
            return "";
        }

        // THE ROW OF THE RISKS TABLE
        let riskTaken = riskFormulas[selectedRiskNumber - 1];

        // THE TOTAL OF ALL THE FIELDS THE CUSTOMER FILLED
        const total = riskData["bond"] + riskData["large"] + riskData["mid"] + riskData["foreign"] + riskData["small"];
        let money = riskData[key];

        if (money == 0) {
            return 0;
        }

        let shoudBe = riskTaken[key]; // in percentage, ie: the amount the user entered SHOULD BE 70% of the total
        let is = money * 100 / total; // what really is (in percentage). Here, rule of three is applied to know that percentage
        let relocation = shoudBe * money / is; // if exceeds, the money needs to be recalculated to be the percentage its needs to be
        let difference = relocation - money;

        /*
        IE: 
        The risk taken is level 2: bond 70, large cap 15, mid cap 15...
        User inputs the following: 7500, 1500, 1500...
        
        shouldBe = 70 (percent)
        is = 71,43 (percent)
        relocation = 7350 
        difference = 150
        */

        return difference;
    }

    function handleChange(event) {
        let key = event.target.dataset["key"];
        setRiskData({...riskData, [key]: parseInt(event.target.value)});
    }

    let selectedRiskAsList = riskFormulas.filter((obj, i) => { 
        return i == selectedRiskNumber - 1; 
    });
    
    return <>
        <div className="container bg-white">
            <h3 className="mt-5">Risk level {selectedRiskNumber}</h3>
            <div className="row justify-content-center">
                <div className="col-6">
                    <RiskTable risks={selectedRiskAsList} selectedRisk={selectedRiskNumber} />
                </div>
            </div>
            <div className="overflow-auto mt-4">
                <h3 className="float-start">Please enter your current portfolio</h3>
            </div>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        {
                        ["Current amount", "Difference", "New amount", "Recommended transfers", ].map(function(each, i) {
                            return <th key={i} className="text-center" scope="col">{each}</th>
                        })
                        }
                    </tr>
                </thead>
                <tbody>
                    {HEADER.map(function(obj, i) {
                        let result = calculateFormula(obj.key);
                        console.log(result + " for " + obj.key);

                        return <tr key={obj.key}>
                            <td className="input-group">
                                <label htmlFor={obj.key} className="col-sm col-form-label">
                                        {obj.value}:
                                    </label>
                                    <div className="col-sm">
                                        <input type="number" 
                                            className="d-inline form-control form-control-sm" 
                                            id={obj.key} 
                                            data-key={obj.key} 
                                            onChange={handleChange} />
                                    </div>
                            </td>
                            <td>{result}</td>
                            <td>{ result && riskData[obj.key] + result }</td>
                            { i == 0 && 
                                <td rowSpan="5">
                                    {HEADER.map(function(obj, i) {
                                        let difference = calculateFormula(obj["key"]);

                                        if (difference > 0) {
                                            return <p key={obj["key"]}>
                                                - Transfer ${difference} from Bonds to {obj["value"]} cap.
                                            </p>
                                        }

                                        return <></>
                                    })}
                                </td>
                            }
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </>
}