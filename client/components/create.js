import React, {useState} from "react";
import {useNavigate} from "react-router";

export default function Create() {
    const [form, setForm] = useState({
        heading: "",
        body: "",
        images: "",
    });

    const navigate = useNavigate();

    // These methods will update the state properties
    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        });
    };

    async function onSubmit(e) {
        e.preventDefault();
        // When post is sent to crate URL, we will add new project to DB.
        const new_project = {...form};
        
        await fetch("http://localhost:3000/project/add", {
            method: "POST",
            headers: {
                "Content-Type": "applcation/json",
            },
            body: JSON.stringify(new_project),
        })
        .catch(error => {
            window.alert(error);
            return;
        });
        setForm({heading: "", body: "", images: ""});
        navigate("/");
    };

    // The following section will display the form that takes
    // the input from user.
    return (
        <div>
            <h3>Create New Project Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="heading">Heading</label>
                    <input
                        type="text"
                        className="form-control"
                        id="heading"
                        value={form.heading}
                        onChange={(e) => updateForm({heading: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Body paragraph</label>
                    <input
                        type="text"
                        className="form-control"
                        id="body"
                        value={form.body}
                        onChange={(e) => updateForm({body: e.target.value})}
                    />
                </div>
                <div classname="form-group">
                    <label htmlFor="images">Images URLS (comma-separated)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="images"
                        value={form.images}
                        onChange={(e) => updateForm({images: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Add project"
                        classname="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
};
