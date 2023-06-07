import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Drawer from "@material-ui/core/Drawer";
import Link from "@material-ui/core/Link";
import InputLabel from "@material-ui/core/InputLabel";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { i18n } from "../../translate/i18n";

import ContactModal from "../ContactModal";
import ContactDrawerSkeleton from "../ContactDrawerSkeleton";
import MarkdownWrapper from "../MarkdownWrapper";

import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from "@material-ui/core/Chip";

import api from "../../services/api";

const http = require('https');

const init = {
	host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
	path: '/zdgSetUserTags',
	method: 'POST',
	headers: {
	  'content-type': 'application/json; charset=utf-8'
	}
  };

const init2 = {
	host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
	path: '/zdgDeleteUserTags',
	method: 'POST',
	headers: {
	  'content-type': 'application/json; charset=utf-8'
	}
  };

const callback = function(response) {
	let result = Buffer.alloc(0);
	response.on('data', function(chunk) {
	  result = Buffer.concat([result, chunk]);
	});
	
	response.on('end', function() {
	  //console.log(result.toString());
	});
  };
  

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

function getStyles(name, tagZDG, theme) {
  return {
    fontWeight:
      tagZDG.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const drawerWidth = 320;

const useStyles = makeStyles(theme => ({
	drawer: {
		width: drawerWidth,
		
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		display: "flex",
		borderTop: "1px solid rgba(0, 0, 0, 0.12)",
		borderRight: "1px solid rgba(0, 0, 0, 0.12)",
		borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
	},
	header: {
		display: "flex",
		borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
		backgroundColor: theme.palette.background.default,
		alignItems: "center",
		padding: theme.spacing(0, 1),
		minHeight: "73px",
		justifyContent: "flex-start",
	},
	content: {
		display: "flex",
		backgroundColor: theme.palette.background.paper,
		flexDirection: "column",
		padding: "8px 0px 8px 8px",
		height: "100%",
		overflowY: "scroll",
		...theme.scrollbarStyles,
	},

	contactAvatar: {
		margin: 15,
		width: 160,
		height: 160,
	},

	button: {
		marginTop: 5,
		display: "flex",
	},

	formControl: {
		margin: 25,
		display: "flex",
	},

	contactHeader: {
		display: "flex",
		padding: 8,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		"& > *": {
			margin: 4,
		},
	},

	contactDetails: {
		marginTop: 8,
		padding: 8,
		display: "flex",
		flexDirection: "column",
	},
	contactExtraInfo: {
		marginTop: 4,
		padding: 6,
	},
}));

const ContactDrawer = ({ open, handleDrawerClose, contact, loading }) => {

	const [names, setNames] = React.useState([]);
	const classes = useStyles();
	const [modalOpen, setModalOpen] = useState(false);
	const theme = useTheme();
	const [tagZDG, setTagZDG] = React.useState([]);
	const [ticket, setTicket] = React.useState([]);
	//const [tags, setTags] = React.useState([]);
	const { ticketId } = useParams();

	async function fetch() {
		try {
		  const { data } = await api.get("/tickets/" + ticketId);
		  setTicket(data.status);
		} catch (err) {
		}
	}

	const ZDGDeteleUser = (() => {
		if (ticket === "closed" || ticket === "pending") return;
		const req = http.request(init2, callback);
		const number = `${contact.number}`;
		const body = '{"msgFrom":"'+ number + '"}';
		req.write(body);
		req.end();
	})

	function delay(t, v) {
		return new Promise(function(resolve) { 
			setTimeout(resolve.bind(null, v), t)
		});
	}

	const ZDGUserTags = (() => {
		const req = http.request(init, callback);
		const number = `${contact.number}`;
		ZDGDeteleUser(number);
		alert(`Redefinindo tags atuais. Clique ok para continuar e aguarde o alerta de confirmação.`);
		delay(1500).then(async function() {
			const body = '{"msgFrom":"'+ number + '","tags":"' + tagZDG + '"}';
			alert(`Tags setadas para o usuário : ${contact.name} - Tags escolhidas: ` + tagZDG);
			req.write(body);
			req.end();
		});
		//window.location.reload(true)
	})

	const getZDGTags = (async () => {
		await fetch();
		if (ticket === "closed" || ticket === "pending") return;
		const init = {
		  host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
		  path: '/getZDGTags/',
		  method: 'GET',
		};
		const callback = function(response) {
		  let result = Buffer.alloc(0);
		  response.on('data', function(chunk) {
			result = Buffer.concat([result, chunk]);
		  });
		  response.on('end', function() {
			let myArray = JSON.parse(result);
			const arrayName = myArray.map(item => item);
			setNames(arrayName)
		  });
		};
		const req = http.request(init, callback);
		req.end();    
	})
  
	const handleChange = (event) => {
	  const { target: { value } } = event;
	  setTagZDG ( typeof value === 'string' ? value.split(',') : value );
	};

	useEffect(() => {
		getZDGTags();
		// eslint-disable-next-line
	}, []);

	return (
		<Drawer
			className={classes.drawer}
			variant="persistent"
			anchor="right"
			open={open}
			onLoad={() => {setTagZDG([]); fetch()}}
			PaperProps={{ style: { position: "absolute" } }}
			BackdropProps={{ style: { position: "absolute" } }}
			ModalProps={{
				container: document.getElementById("drawer-container"),
				style: { position: "absolute" },
			}}
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div className={classes.header}>
				<IconButton onClick={handleDrawerClose}>
					<CloseIcon />
				</IconButton>
				<Typography style={{ justifySelf: "center" }}>
					{i18n.t("contactDrawer.header")}
				</Typography>
			</div>
			{loading ? (
				<ContactDrawerSkeleton classes={classes} />
			) : (
				<div className={classes.content}>
					<Paper square variant="outlined" className={classes.contactHeader}>
						<Avatar
							alt={contact.name}
							src={contact.profilePicUrl}
							className={classes.contactAvatar}
						></Avatar>

						<Typography>{contact.name}</Typography>
						<Typography>
							<Link href={`tel:${contact.number}`}>{contact.number}</Link>
						</Typography>
						<Button
							variant="outlined"
							color="primary"
							onClick={() => setModalOpen(true)}
						>
							{i18n.t("contactDrawer.buttons.edit")}
						</Button>
					</Paper>
					<Paper square variant="outlined" className={classes.contactDetails}>
						<ContactModal
							open={modalOpen}
							onClose={() => setModalOpen(false)}
							contactId={contact.id}
						></ContactModal>
						<Typography variant="subtitle1">
							{i18n.t("contactDrawer.extraInfo")}
						</Typography>
						{contact?.extraInfo?.map(info => (
							<Paper
								key={info.id}
								square
								variant="outlined"
								className={classes.contactExtraInfo}
							>
								<InputLabel>{info.name}</InputLabel>
								<Typography component="div" noWrap style={{ paddingTop: 2 }}>
									<MarkdownWrapper>{info.value}</MarkdownWrapper>
								</Typography>
							</Paper>
						))}
					</Paper>
					<div>
						{ticket === "open" && (
						<Paper square variant="outlined" className={classes.contactDetails}>
						Redefinir Tags
						<FormControl className={classes.formControl} sx={{ m: 1, width: 300 }}>
							<InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
							<Select
								labelId="demo-multiple-chip-label"
								id="demo-multiple-chip"
								multiple
								value={tagZDG}
								onChange={handleChange}
								input={<OutlinedInput id="select-multiple-chip" label="Tags"/>}
								renderValue={(selected) => (
									<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
										{selected.map((value) => (
											<Chip key={value} label={value} 
											style={{ margin:2, backgroundColor: names.filter(name => name.tag === value).map( name => (name.color))}}
										/>
										))}
									</Box>
								)}
								MenuProps={MenuProps}
								>
								{names.map((name) => (
								<MenuItem
									key={name.tag}
									value={name.tag}
									style={getStyles(name, tagZDG, theme)}
									>
									{name.tag}
								</MenuItem>
								))}
							</Select>
						<Button variant="contained" color="primary" className={classes.button} onClick={ZDGUserTags}>
						Salvar
						</Button>
						</FormControl>
						</Paper>
						)}
					</div>
					<div>
						{ticket === "pending" && (
						<Paper square variant="outlined" className={classes.contactDetails}>
						Redefinir Tags
						<FormControl className={classes.formControl} sx={{ m: 1, width: 300 }}>
							<InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
							<Select
								labelId="demo-multiple-chip-label"
								id="demo-multiple-chip"
								multiple
								value={tagZDG}
								onChange={handleChange}
								input={<OutlinedInput id="select-multiple-chip" label="Tags"/>}
								renderValue={(selected) => (
									<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
										{selected.map((value) => (
											<Chip key={value} label={value} 
											style={{ margin:2, backgroundColor: names.filter(name => name.tag === value).map( name => (name.color))}}
										/>
										))}
									</Box>
								)}
								MenuProps={MenuProps}
								>
								{names.map((name) => (
								<MenuItem
									key={name.tag}
									value={name.tag}
									style={getStyles(name, tagZDG, theme)}
									>
									{name.tag}
								</MenuItem>
								))}
							</Select>
						<Button variant="contained" color="primary" className={classes.button} onClick={ZDGUserTags}>
						Salvar
						</Button>
						</FormControl>
						</Paper>
						)}
					</div>
				</div>
			)}
		</Drawer>
	);
};

export default ContactDrawer;

