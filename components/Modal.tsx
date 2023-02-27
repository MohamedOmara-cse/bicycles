import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import UpdateForm from "./UpdateForm";
import { useEffect } from "react";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 800,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function TransitionsModal(props:any) {
	
	const handleClose = () =>{ props.handleIsOpen()}
  let data=props.data.filter((item:any)=>item.id===props.id)

	return (
		<div>
			
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={props.isOpen}
				onClose={handleClose}
				closeAfterTransition
				slots={{ backdrop: Backdrop }}
				slotProps={{
					backdrop: {
						timeout: 500,
					},
				}}
			>
				<Fade in={props.isOpen}>
					<Box sx={style}>
						<Typography id="transition-modal-title" variant="h6" component="h2">
					  <UpdateForm handleIsOpen={handleClose} type={props.type} id={props.id} data={data[0]}/>
						</Typography>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
