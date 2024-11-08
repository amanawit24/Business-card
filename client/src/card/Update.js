import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditAddress = ({ cardId }) => {
    const [address, setAddress] = useState("");

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await axios.get(`/api/business-card/${cardId}`);
                if (response.data && response.data.address) {
                    setAddress(response.data.address);
                } else {
                    console.error("Address data not found.");
                }
            } catch (error) {
                console.error("Error fetching business card:", error);
            }
        };
    
        fetchAddress();
    }, [cardId]);
    

    const handleUpdateAddress = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(/api/business-card/$`cardId`/address, { address });
            alert("Address updated successfully!");
        } catch (error) {
            console.error("Error updating address:", error);
            alert("Failed to update address");
        }
    };

    return (
        <form onSubmit={handleUpdateAddress}>
            <label>
                New Address:
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter new address"
                />
            </label>
            <button type="submit">Update Address</button>
        </form>
    );
};

export default EditAddress;