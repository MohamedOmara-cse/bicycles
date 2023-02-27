import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useEffect } from "react";


export default function ButtonAppBar() {
  let [authToken,setAuthToken]=React.useState('');
  function logOutHandler() {
    localStorage.removeItem("authTokens");
    window.location.href = "/";
  }
  useEffect(() => {setAuthToken(localStorage.getItem("authTokens") || ""),[]});
	return (
		<Box sx={{ flexGrow: 1,display:'fixed',top:'0' }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link href="/" className="font-bold">
						Biycles
						</Link>
					</Typography>
					{authToken == '' ?(
						<Button color="inherit" className="font-bold">
							<Link href="/login" className="font-bold">
								Login
							</Link>
						</Button>
					):(
            <Button onClick={logOutHandler} color="inherit" className="font-bold">Log out</Button>
          ) }
				</Toolbar>
			</AppBar>
		</Box>
	);
}
