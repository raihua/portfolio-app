import React, {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router";

export default function Edit() {
    const [form, set_form] = useState({
        
    })

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/project/${id}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            
            if (!record) {
                window.alert(`Record with id ${id} not found.`);
                navigate("/");
                return;
            }

            set_form(record);
        }
        fetchData();
        return;
    }, [params.id, navigate]);

    function updateForm(value) {
        return set_form((prev) => {
            return {...prev, ...value};
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedProject = {
            heading: form.heading,
            body: form.body,
            images: form.images,
        };

        // This sends a post request to update data in DB
        await fetch(`http://localhost:3000/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedProject),
            headers: {
                "Content-Type": "application/json"
            },
        });
        navigate("/");
    }

    // The following section displays form for user to input
    return (
        <div>
            <h3>Update record</h3>
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
                        value="Update Record"
                        classname="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    )
};