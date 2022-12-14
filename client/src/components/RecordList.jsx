import React, { useEffect, useState } from "react";
import Record from "./Record";

export default function RecordList() {

    const [records, setRecords] = useState([]);

    // This method fetches the records from the database:
    useEffect(() => {
        fetch("https://mern-list-of-employees-api.vercel.app/home")
            .then((res) => res.json())
            .then((data) => setRecords(data));
    }, []);

    // This method will delete a record:
    function deleteRecord(id) {
        fetch("https://mern-list-of-employees-api.vercel.app/delete/" + id, {
            method: "DELETE"
        })

            .catch(error => {
                window.alert(error);
                return;
            })

            // Since the fetch() function returns a Response object,
            // we can retrieve the response as JSON using the json() function of the Response object.
            // The json() method returns a promise which resolves with the result of parsing the body text as JSON.
            // Note that despite the method being named json(), the result is not JSON
            // but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.
            // This allows us to handle the data being sent down to the client-side like a JavaScript object:
            .then((res) => res.json())

            // Once we have the data returned to us, we get the message property and then put it in a variable called data.
            // This will allow us to display that message in an alert:
            .then((data) => {
                alert(data.message);
                const newRecords = records.filter((record) => record._id !== id);

                // Update the table after 2 seconds:
                setTimeout(() => { setRecords(newRecords) }, 2000);
            });
    }

    // This method creates a Record component for each item inside the records collection:
    function listRecord(record) {
        return <Record name={record.name} position={record.position} deleteRecord={deleteRecord} id={record._id} key={record._id} />
    }

    // This section displays the table with the records of individuals:
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th className="table-cols">Name</th>
                        <th className="table-cols">Position</th>
                    </tr>
                    {records.map(listRecord)}
                </tbody>
            </table>
        </div>
    );
}