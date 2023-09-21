import React from "react";

import {Route, Routes} from "react-router-dom";

import PostList from "./components/postList";

const App = () => {
    return (
        <div>
            <Routes>
                <Route exact path="/" element={<PostList />} />
            </Routes>
        </div>
    )
}

export default App;