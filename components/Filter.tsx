import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { Input } from '@mui/material';
import { useState } from 'react';
import DropMenue from './DropMenue';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props:any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
function handleFilter(filter:any){
  props.filter(filter);
	handleClose()
}
	return (
		<div>
			<Button onClick={handleOpen} className="bg-sky-600 mx-[50px] " variant='contained'>
				Search
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<DropMenue filter={handleFilter} />
				</Box>
			</Modal>
		</div>
	);
}