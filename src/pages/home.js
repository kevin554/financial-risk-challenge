import { useState } from "react";
import { riskFormulas } from "../services/risk-service";
import RiskTable from '../components/risk-table';
import RiskChart from "../components/risk-chart";
import { useHistory } from "react-router-dom";

export default function Home() {
    const history = useHistory();
    const [selectedRisk, setSelectedRisk] = useState(null);
  
    function riskClicked(event) {
        let index = event.target.dataset["index"];
        setSelectedRisk(index ? parseInt(index) + 1 : null);
    }

    function showCalculator() {
        history.push(`/calculator`, { risk: selectedRisk });
    }
    
    return <>
        <div className="container bg-light">
            <div className="row mt-5 text-center">
                <div>
                    <h2 className="mb-0"><b>Please select a risk level for your investment portfolio</b></h2>
                    <p>(1 being very risk averse, and 10 being insensitive to risk)</p>
                    <div>
                        {
                        riskFormulas.map(function(each, i) {
                            let buttonClass = "";

                            if ((i + 1) == selectedRisk) {
                                buttonClass += "bg-warning text-dark";
                            }

                            return <OutlinedButton key={i} 
                                text={i + 1} 
                                clickFn={riskClicked} 
                                index={i} 
                                classToAdd={buttonClass} />
                        })
                        }
                        <OutlinedButton text="Continue" disabled={!selectedRisk} clickFn={showCalculator}/>
                    </div>
                </div>
            </div>
            <div className="row mt-4 justify-content-center">
                <div className="col-sm-8">
                    <div className="">
                        <RiskTable risks={riskFormulas} selectedRisk={selectedRisk} highlight />
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card" >
                        <div className="card-body">
                            <RiskChart risk={selectedRisk}></RiskChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

function OutlinedButton({classToAdd = "", text, clickFn, disabled = false, index}) {
    const buttonClass = "btn btn-sm btn-outline-secondary ms-3";

    function btnClicked(event) {
        if (clickFn) {
            clickFn(event);
        }
    }

    return <button type="button" 
            disabled={disabled} 
            data-index={index}
            className={`${buttonClass} ${classToAdd}`}
            onClick={btnClicked}>
        {text}
    </button>
}