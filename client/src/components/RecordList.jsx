import React, { useEffect, useState } from "react";
import Record from "./Record";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function RecordList() {

  const MySwal = withReactContent(Swal);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = window.outerWidth < 768;

  // Fetch records function:
  const fetchRecords = () => {
    fetch("https://mern-list-of-employees-api.vercel.app/home")
      .then((res) => res.json())
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching records:", error);
        setLoading(false);
      });
  };

  // Fetch records on component mount:
  useEffect(() => {
    fetchRecords();
  }, []);

  // This method will delete a record:
  function deleteRecord(id) {
    fetch("https://mern-list-of-employees-api.vercel.app/delete/" + id, {
      method: "DELETE"
    })

      .catch(error => {
        MySwal.fire({
          icon: "error",
          title: error
        });
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
        MySwal.fire({
          icon: "success",
          title: data.message
        });
        const newRecords = records.filter((record) => record._id !== id);

        // Update the table after 2 seconds:
        setTimeout(() => { setRecords(newRecords) }, 2000);
      });
  }

  // This method will delete all records:
  function deleteAllRecords() {
    fetch("https://mern-list-of-employees-api.vercel.app/home", {
      method: "DELETE"
    })

      .catch(error => {
        MySwal.fire({
          icon: "error",
          title: error
        });
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
        MySwal.fire({
          icon: "success",
          title: data.message
        });
        const newRecords = [];

        // Update the table after 2 seconds:
        setTimeout(() => { setRecords(newRecords) }, 2000);
      });
  }

  // This method will restore the default records:
  function restoreRecords() {
    const defaultRecords = [{
      name: "Antonio Celano",
      position: "Coffee Manager"
    },
    {
      name: "Natalia Jozwiak",
      position: "Almost CEO, but not quite"
    },
    {
      name: "Manuela Celano",
      position: "Chairwoman of the Board of Directors"
    },
    {
      name: "Dwight Schrute",
      position: "Assistant (To The) Regional Manager"
    },
    {
      name: "Perry Cox",
      position: "J.D.'s (Reluctant) Mentor"
    },
    {
      name: "Rachel Green",
      position: "We were not on a break"
    }
    ];

    fetch("https://mern-list-of-employees-api.vercel.app/home", {
      method: "POST",

      // The fetch call needs some headers that tell the server how to interpret the request
      // (it will interpret it as JSON in this case):
      headers: {
        "Content-Type": "application/json",
      },

      // The fetch call also needs a body that supplies the data.
      // The JSON.stringify() method converts a JavaScript value (in this case, the JavaScript object form) to a JSON string:
      body: JSON.stringify(defaultRecords)
    })
      .catch(error => {
        MySwal.fire({
          icon: "error",
          title: error
        });
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
        MySwal.fire({
          icon: "success",
          title: data.message
        });
        // Fetch and update records after restoring defaults:
        fetchRecords();
      });
  }

  // This method creates a Record component for each item inside the records collection:
  function listRecord(record) {
    return <Record name={record.name} position={record.position} deleteRecord={deleteRecord} id={record._id} key={record._id} />
  }

  // This section displays the table with the records of individuals:
  return (
    <div>
      <table className={isMobile ? "mx-auto my-4" : "mx-4 my-4"}>
        <tbody>
          <tr>
            <th className="table-cols">Name</th>
            <th className="table-cols">Position</th>
          </tr>
          {loading
            ? (
              <tr>
                <td className="table-cols">Loading...</td>
              </tr>
            )
            : records.map(listRecord)
          }
        </tbody>
      </table>
      <div className={isMobile ? "mx-auto my-5" : "mx-4 my-5"}>
        <input type="button" value="Delete All Records" className={isMobile ? "btn btn-secondary d-block" : "btn btn-secondary"} onClick={deleteAllRecords} />
        <input type="button" value="Restore Default Records" className={isMobile ? "btn btn-secondary mt-3" : "btn btn-secondary ms-5"} onClick={restoreRecords} />
      </div>
    </div>
  );
}
