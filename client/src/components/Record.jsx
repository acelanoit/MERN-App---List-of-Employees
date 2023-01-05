import { useState } from "react";
import { Link } from "react-router-dom";

export default function Record(props) {

    const editLink = "/edit/" + props.id;
    const [disabled, setDisabled] = useState(false);
    const [hidden, sethidden] = useState(true);

    return (
        <tr>
            <td className="table-cols">{props.name}</td>
            <td className="table-cols">{props.position}</td>
            <td className="table-cols">
                <Link to={editLink} className="btn btn-secondary" >Edit</Link>
            </td>
            <td className="table-cols">
                <button className="btn btn-secondary" onClick={() => { sethidden(false) }}>Delete</button>
            </td>
            <td className="table-cols" hidden={hidden}>Are you sure?</td>
            <td className="table-cols">
                <button className="btn btn-secondary" disabled={disabled} hidden={hidden} onClick={() => {
                    props.deleteRecord(props.id);
                    setDisabled(true);
                }}>Confirm</button>
            </td>
            <td className="table-cols">
                <button className="btn btn-secondary" hidden={hidden} onClick={() => { sethidden(true) }}>Cancel</button>
            </td>
        </tr>
    );
}