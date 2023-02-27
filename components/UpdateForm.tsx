import { Box, Button, TextField, Input, Paper } from "@mui/material";
import { useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import contextData from "../helper/Auth";
import { create } from "domain";

export default function UpdateForm(props: any) {
	const { create, update } = contextData;
	console.log(props);
	const [logo, setLogo] = useState<any>(() => (props.type == "Update" ? props.data.image : ""));
	const [description, setDescription] = useState<any>(() => (props.type == "Update" ? props.data.description : ""));
	const [name, setName] = useState<any>(() => (props.type == "Update" ? props.data.name : ""));
	const [style, setStyle] = useState<any>(() => (props.type == "Update" ? props.data.style : ""));
	const [price, setPrice] = useState<any>(() => (props.type == "Update" ? props.data.price : ""));
	async function sumbitHandler(e: any) {
		let newPrice = 0;
		e.preventDefault();
		if (name.toLowerCase().includes("cat")) {
			try {
				let up = await fetch("https://catfact.ninja/fact");
				let data = await up.json();

				newPrice = (price * data.length) / 5;
			} catch (error) {
				newPrice = (price * 99) / 5;
				console.log(price);
			}
		}
		let response;
		const body = JSON.stringify({
			image: logo,
			description: description,
			name: name,
			style: style,
			price: newPrice == 0 ? price : newPrice,
		});
		try {
			if (props.type == "Update") {
				response = await update(body, props.id);
				if (response.status === 200) {
					props.handleIsOpen();
				}
			} else {
				response = await create(body);
				if (response.status === 201) {
					props.handleIsOpen();
				}
			}
		} catch (error) {
			window.alert(error);
		}
	}
	return (
		<Paper variant="outlined" square className="flex flex-col  justify-center align-center">
			<h1 className="flex justify-center align-center font-bold mb-[20px]">{props.type}</h1>

			<Box
				component="form"
				sx={{
					display: "flex",
					width: "100%",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					gap: 2,
				}}
			>
				<input
					required
					onChange={(e) => {
						setLogo(e.target.value);
					}}
					type="text"
				/>

				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "column" },
						gap: 3,
						width: "100%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<TextField
						required
						id="image"
						label="Image Link"
						type="text"
						value={logo}
						sx={{ width: { xs: "100%", md: "50%" } }}
						onChange={(e) => {
							setLogo(e.target.value);
						}}
					/>
					<TextField
						required
						id="first_name"
						label="Name"
						type="text"
						value={name}
						sx={{ width: { xs: "100%", md: "50%" } }}
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
					<TextField
						required
						id="last_name"
						value={description}
						label="Description"
						type="text"
						sx={{ width: { xs: "100%", md: "50%" } }}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
					<TextField
						//error={errors?.has("last_name")}
						//	helperText={errors?.has("last_name") ? errors.get("last_name")?.join(",") : ""}
						required
						value={style}
						label="Style"
						type="text"
						sx={{ width: { xs: "100%", md: "50%" } }}
						onChange={(e) => {
							setStyle(e.target.value);
						}}
					/>
					<Input
						required
						id="last_name"
						value={price}
						placeholder="Price"
						slotProps={{
							input: {
								min: 1,
								step: 1,
							},
						}}
						type="number"
						sx={{ width: { xs: "100%", md: "50%" } }}
						onChange={(e) => {
							setPrice(e.target.value);
						}}
					/>
				</Box>
				<Button
					onClick={sumbitHandler}
					sx={{ display: "block", width: { xs: "100%", md: "50%", lg: "25%" } }}
					variant="contained"
					color="primary"
					className="bg-[#1e3a8a]"
				>
					{props.type}
				</Button>
			</Box>
		</Paper>
	);
}
