import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {

    const [form, setForm] = useState({
        name: "",
        position: ""
    });

    // The useNavigate hook returns a function that lets you navigate programmatically:
    const navigate = useNavigate();

    const [disabled, setDisabled] = useState(false);

    function updateForm(value) {
        setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    function handleSubmit(e) {
        setDisabled(true);

        // This method prevents default actions that browsers make when an event is triggered.
        // In this case, it prevents the form component from refreshing the page after submit:
        e.preventDefault();

        fetch("/add", {
            method: "POST",

            // The fetch call needs some headers that tell the server how to interpret the request
            // (it will interpret it as JSON in this case):
            headers: {
                "Content-Type": "application/json",
            },

            // The fetch call also needs a body that supplies the data.
            // The JSON.stringify() method converts a JavaScript value (in this case, the JavaScript object form) to a JSON string:
            body: JSON.stringify(form)
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

                // Redirect the user to the home route after 2 seconds:
                setTimeout(() => {
                    navigate("/");
                    setForm({ name: "", position: "" });
                }, 2000);
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="name" value={form.name} onChange={(e) => { updateForm({ name: e.target.value }) }} placeholder="Name">
                </input>
                <input name="position" value={form.position} onChange={(e) => { updateForm({ position: e.target.value }) }} placeholder="Position">
                </input>
                <button className="btn btn-secondary" disabled={disabled} style={{ marginLeft: "10px" }}>Submit</button>
            </form>
        </div>
    );

}