import { useState } from "react";
import { Link } from "react-router-dom";

export default function Record(props) {
    const editLink = "/edit/" + props.id;
    const [disabled, setDisabled] = useState(false);
    const [hidden, setHidden] = useState(true);
    const isMobile = window.outerWidth < 768;

    if (isMobile) {
        return (
            <>
                <tr>
                    <td className="table-cols">{props.name}</td>
                    <td className="table-cols">{props.position}</td>
                    <td className="table-cols">
                        <Link to={editLink} className="btn btn-secondary">
                            Edit
                        </Link>
                    </td>
                    <td className="table-cols">
                        <button
                            className="btn btn-secondary"
                            onClick={() => setHidden(false)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
                {!hidden && (
                    <tr>
                        <td className="table-cols">Are you sure?</td>
                        <td className="table-cols"></td>
                        <td className="table-cols">
                            <button
                                className="btn btn-secondary"
                                disabled={disabled}
                                onClick={() => {
                                    props.deleteRecord(props.id);
                                    setDisabled(true);
                                }}
                            >
                                Yes!
                            </button>
                        </td>
                        <td className="table-cols">
                            <button
                                className="btn btn-secondary"
                                onClick={() => setHidden(true)}
                            >
                                Cancel
                            </button>
                        </td>
                    </tr>
                )}
            </>
        );
    } else {
        return (
            <tr>
                <td className="table-cols">{props.name}</td>
                <td className="table-cols">{props.position}</td>
                <td className="table-cols">
                    <Link to={editLink} className="btn btn-secondary">
                        Edit
                    </Link>
                </td>
                <td className="table-cols">
                    <button
                        className="btn btn-secondary"
                        onClick={() => setHidden(false)}
                    >
                        Delete
                    </button>
                </td>
                <td className="table-cols" hidden={hidden}>
                    Are you sure?
                </td>
                <td className="table-cols">
                    <button
                        className="btn btn-secondary"
                        disabled={disabled}
                        hidden={hidden}
                        onClick={() => {
                            props.deleteRecord(props.id);
                            setDisabled(true);
                        }}
                    >
                        Confirm
                    </button>
                </td>
                <td className="table-cols">
                    <button
                        className="btn btn-secondary"
                        hidden={hidden}
                        onClick={() => setHidden(true)}
                    >
                        Cancel
                    </button>
                </td>
            </tr>
        );
    }
}
