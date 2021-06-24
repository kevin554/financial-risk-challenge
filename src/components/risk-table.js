import { HEADER } from "../services/risk-service";

export default function RiskTable({risks, selectedRisk, highlight = false}) {
    return <>
        <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center text-nowrap" scope="col">Risk</th>
                        {
                        HEADER.map(function(obj) {
                            return <th key={obj.key} className="text-center text-nowrap" scope="col">{obj.value}</th>
                        })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        risks?.map(function(obj, i) {
                        const cellClass = "text-end";
            
                        return <tr key={i} className={(i+1) == selectedRisk && highlight ? "bg-warning " : ""}>
                            <th className={cellClass} scope="row">{i+1}</th>
                            <td className={cellClass}>{obj.bond}</td>
                            <td className={cellClass}>{obj.large}</td>
                            <td className={cellClass}>{obj.mid}</td>
                            <td className={cellClass}>{obj.foreign}</td>
                            <td className={cellClass}>{obj.small}</td>
                        </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
}