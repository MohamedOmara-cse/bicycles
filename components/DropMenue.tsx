import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

import { useState } from "react";

import { Box, Button, TextField, Input, Paper } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const names = [
	"Name",'Price',"Style"
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
	};
}

export default function MultipleSelectChip(props:any) {

	const [description, setDescription] = useState<any>('');
	const [name, setName] = useState<any>('');
	const [style, setStyle] = useState<any>('');
	const [price, setPrice] = useState<any>('');
 
	function handleFilter(){
		props.filter({name:name,style:style,price:price})
	}

	return (
		<div className="flex flex-col">
			<Box
				sx={{
					display: "flex",
					flexDirection:  "column",
					gap: 3,
					width: "100%",
					justifyContent: "center",
          alignItems: "center",
				}}
			>
				
				<TextField
					required
					id="first_name"
					label="Name"
					type="text"
					value={name}
					
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
			
				<TextField
					//error={errors?.has("last_name")}
					//	helperText={errors?.has("last_name") ? errors.get("last_name")?.join(",") : ""}
					required
					value={style}
					label="Style"
					type="text"
				
					onChange={(e) => {
						setStyle(e.target.value);
					}}
				/>
				<Input
					required
					value={price}
					placeholder="Price"
					slotProps={{
						input: {
							min: 1,
							step: 1,
						},
					}}
					type="number"
		
					onChange={(e:any) => {
						setPrice(e.target.value);
					}}
				/>
			</Box>
			<Button onClick={handleFilter} variant="contained" className="mt-[15px] bg-sky-800">Filter</Button>
		</div>
	);
}
