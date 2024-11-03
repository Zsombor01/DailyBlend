import React from 'react';

const Unauthorized = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col">
            <h1 className="text-3xl text-red-600">401 Unauthorized</h1>
            <p>You do not have permission to view this page. Please log in.</p>
        </div>
    </div>
);

export default Unauthorized;