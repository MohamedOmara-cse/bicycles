import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Modal from "../components/Modal";
import { Button } from "@mui/material";
import Router from "next/router";
import Link from "next/link";
import Filter from "../components/Filter";
import NavBar from "../components/NavBar";

const Img = styled("img")({
	margin: "auto",
	display: "block",
	maxWidth: "100%",
	maxHeight: "100%",
});

export default function ComplexGrid(props: any) {
	let [chosenForm, setChosenForm] = useState("");
	let [updateId, setUpdateId] = useState("");
	let [isOpen, setIsOpen] = useState(false);
	let [items, setItems] = useState([]);
	let router = Router;
	let data = {
		id: 1,
		name: "hi all",
		price: 19,
		description: "free code camp 20122",
		style: "Woman atyle",
		img: "https://thumbs.dreamstime.com/z/bicycle-flowers-25541754.jpg",
	};
	function handleChosenForm(type: any, id: any) {
		setChosenForm(type);
		setUpdateId(id);
		setIsOpen(true);
	}
	let [authToken, setAuthToken] = useState("");
	useEffect(() => {
		setAuthToken(localStorage.getItem("authTokens") || "");
	}, []);

	async function getData() {
		try {
			let response = await fetch("https://bicycle-api.herokuapp.com/bicycles/");
			let data = await response.json();
			if (response.status === 200) {
				setItems(data);
			}
		} catch (error) {}
	}
	function handleIsOpen() {
		setIsOpen(false);

		getData();
	}
	function handleFilter(filter: { name: string; price: string; style: string }) {
		if (filter.name == "" && filter.price == "" && filter.style == "") return getData();
		let data = items;
		if (filter.name != "")
			data = items.filter((item: any) => item.name.toLowerCase().includes(filter.name.toLowerCase()));
		if (filter.price != "") data = data.filter((item: any) => item.price == filter.price);
		if (filter.style != "")
			data = data.filter((item: any) => item.style.toLowerCase().includes(filter.style.toLowerCase()));
		setItems(data);
	}
	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<NavBar></NavBar>
			<section className="flex flex-row-reverse justify-center align-center m-[20px]">
				<Filter filter={handleFilter} />
				{authToken.length > 0 && (
					<Button
						onClick={() => handleChosenForm("Create", "")}
						variant="contained"
						color="primary"
						className="bg-sky-600"
					>
						+ ADD
					</Button>
				)}
			</section>
			<div className="grid grid-cols-5 gap-4">
				{items.map((item: any) => (
					<Card update={handleChosenForm} key={item.id} data={item}></Card>
				))}
				<Modal type={chosenForm} id={updateId} isOpen={isOpen} handleIsOpen={handleIsOpen} data={items}></Modal>
			</div>
			{items.length === 0 && (
				<p className="flex justify-center w-full align-center font-bold text-[#610c0c] text-[50px] absolute top-[50%] ">
					{" "}
					No Items Found
				</p>
			)}
		</div>
	);
}
