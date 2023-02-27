import * as React from "react";
import { styled } from "@mui/material/styles";
import { useEffect ,useState} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import contextData from "../helper/Auth";

import { Button, Modal } from "@mui/material";
const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});
let {Delete}=contextData;
export default function Card(props:any) {
	let [authToken,setAuthToken]=useState('')

 useEffect(() => {
	setAuthToken(localStorage.getItem("authTokens") || "")
 
},[]);

async function removeHandler(){
let response=await Delete(props.data.id);
if(response.status){
	window.location.reload();	
} 	
}
	return (
		<Paper
			className="hover:scale-[1.3] hover:z-10  h-[400px] transition duration-700 ease-in-out"
			sx={{
				p: 2,
				margin: "auto",
        boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
				flexGrow: 1,
				backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A2027" : "#fff"),
			}}
		>
			<Grid container className="flex flex-col " spacing={2}>
				<Grid item>
					<ButtonBase>
						<Img alt="complex" className="h-[150px] w-[250px] " src={props.data.image} />
					</ButtonBase>
				</Grid>
				<Grid item xs={12} sm container>
					<Grid item xs container direction="column" spacing={2}>
						<Grid item xs>
							<Typography gutterBottom variant="subtitle1" component="div">
								<span className="font-bold">{props.data.name}</span>
							</Typography>
							<Typography variant="body2" gutterBottom>
								<span className="font-bold">Description:</span> {props.data.description}
							</Typography>
							<Typography variant="body2">
								<span className="font-bold"> Style : </span>
								{props.data.style}
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="subtitle1" component="div">
								<span className="font-bold"> Price:</span>
								{props.data.price}$
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			{authToken.length > 0 && (
				<Grid container spacing={2} className="justify-end">
					<Grid item>
						<Button onClick={removeHandler} sx={{ cursor: "pointer" }} color="error">
							Remove
						</Button>
					</Grid>
					<Grid item>
						<Button
							onClick={() => {
								props.update("Update", props.data.id);
							}}
							sx={{ cursor: "pointer" }}
							color="primary"
						>
							Edit
						</Button>
					</Grid>
				</Grid>
			)}
		</Paper>
	);
}
