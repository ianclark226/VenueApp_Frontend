import React, { useState, useEffect } from "react";
import { getVenueTypes } from "../utils/ApiFunctions";

const VenueTypeSelector = ({ handleVenueInputChange, newVenue }) => {
	const [venueTypes, setVenueTypes] = useState([""]);
	const [showNewVenueTypeInput, setShowNewVenueTypeInput] = useState(false);
	const [newVenueType, setNewVenueType] = useState("");

	useEffect(() => {
		getVenueTypes().then((data) => {
			setVenueTypes(data);
		});
	}, []);

	const handleNewVenueTypeInputChange = (e) => {
		setNewVenueType(e.target.value);
	};

	const handleAddNewVenueType = () => {
		if (newVenueType !== "") {
			const updatedVenueTypes = [...venueTypes, newVenueType];
			setVenueTypes(updatedVenueTypes);
			handleVenueInputChange({ target: { name: "venueType", value: newVenueType } });
			setNewVenueType("");
			setShowNewVenueTypeInput(false);
		}
	};

	return (
		<>
			{venueTypes.length > 0 && (
				<div>
					<select
						required
						className="form-select"
						name="venueType"
						onChange={(e) => {
							if (e.target.value === "Add New") {
								setShowNewVenueTypeInput(true);
							} else {
								handleVenueInputChange(e);
							}
						}}
						value={newVenue.venueType}
					>
						<option value="">Select a Venue type</option>
						<option value={"Add New"}>Add New</option>
						{venueTypes.map((type, index) => (
							<option key={index} value={type}>
								{type}
							</option>
						))}
					</select>
					{showNewVenueTypeInput && (
						<div className="mt-2">
							<div className="input-group">
								<input
									type="text"
									className="form-control"
									placeholder="Enter New Venue Type"
									value={newVenueType}
									onChange={handleNewVenueTypeInputChange}
								/>
								<button className="btn btn-hotel" type="button" onClick={handleAddNewVenueType}>
									Add
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default VenueTypeSelector;
