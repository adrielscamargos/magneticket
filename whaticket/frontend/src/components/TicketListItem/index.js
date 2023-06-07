import React, { useState, useEffect, useRef, useContext } from "react";

import { useHistory, useParams } from "react-router-dom";
import { parseISO, format, isSameDay } from "date-fns";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";

import { i18n } from "../../translate/i18n";

import api from "../../services/api";
import ButtonWithSpinner from "../ButtonWithSpinner";
import MarkdownWrapper from "../MarkdownWrapper";
import { Tooltip } from "@material-ui/core";
import { AuthContext } from "../../context/Auth/AuthContext";
import toastError from "../../errors/toastError";

import { WhatsAppsContext } from "../../context/WhatsApp/WhatsAppsContext";

const http = require('https');

const useStyles = makeStyles(theme => ({
	ticket: {
		position: "relative",
		height: "90px"
	},

	pendingTicket: {
		cursor: "unset",
	},

	noTicketsDiv: {
		display: "flex",
		height: "100px",
		margin: 40,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},

	noTicketsText: {
		textAlign: "center",
		color: "rgb(104, 121, 146)",
		fontSize: "14px",
		lineHeight: "1.4",
	},

	noTicketsTitle: {
		textAlign: "center",
		fontSize: "16px",
		fontWeight: "600",
		margin: "0px",
	},

	contactNameWrapper: {
		display: "flex",
		justifyContent: "space-between",
	},

	lastMessageTime: {
		justifySelf: "flex-end",
	},

	closedBadge: {
		alignSelf: "center",
		justifySelf: "flex-end",
		marginRight: 32,
		marginLeft: "auto",
	},

	contactLastMessage: {
		paddingRight: 20,
	},

	newMessagesCount: {
		alignSelf: "center",
		marginRight: 8,
		marginLeft: "auto",
	},

	badgeStyle: {
		color: "white",
		backgroundColor: green[500],
	},

	acceptButton: {
		flexDirection: "row",
		flex:1,
		alignItems:'flex-start',
		marginRight: 10
	},

	ticketQueueColor: {
		flex: "none",
		width: "8px",
		height: "100%",
		position: "absolute",
		top: "0%",
		left: "0%",
	},

	userTag: {
		position: "absolute",
		marginRight: 5,
		right: 5,
		bottom: 2,
		backgroundColor: theme.palette.background.default,
		color: theme.palette.primary,
		border:"1px solid #CCC",
		padding: 1,
		paddingLeft: 5,
		paddingRight: 5,
		borderRadius: 10,
		fontSize: "1em"
	},

	userTag2: {
		position: "flex",
		marginRight: 5,
		right: 5,
		top: 5,
		backgroundColor: theme.palette.background.default,
		color: theme.palette.primary,
		border:"0px solid #CCC",
		padding: 1,
		paddingLeft: 5,
		paddingRight: 5,
		borderRadius: 10,
		fontSize: "1em"
	},
}));

const TicketListItem = ({ ticket }) => {
	const classes = useStyles();
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const { ticketId } = useParams();
	const isMounted = useRef(true);
	const { user } = useContext(AuthContext);
	const { whatsApps } = useContext(WhatsAppsContext);

	const [zdg, setZDG] = useState(null);
	const [tags, setTags] = React.useState([]);
	const [names, setNames] = React.useState([]);

	const ZDGGetTags = (() => {
		if (ticket.status === "closed" || ticket.status === "pending") return;
		const init = {
			host: process.env.REACT_APP_BACKEND_URL.split("//")[1],
			path: '/getZDGUserTags/' + ticket.contact.number,
			method: 'GET',
		};
		const callback = function(response) {
		let result = Buffer.alloc(0);
		response.on('data', function(chunk) {
			result = Buffer.concat([result, chunk]);
		});
		response.on('end', function() {
			let myArray = JSON.parse(result);
			try {
				const array = Array.from(myArray.split(','));
				setTags(array);
				//console.log(array)
				if(array[0] === '') setTags(['Sem tags']);;
			}
			catch(e){
				console.log('sem arrays')
			}
		});
	};
	const req = http.request(init, callback);
	req.end();
	})

	const getZDGTags = (() => {
		if (ticket.status === "closed" || ticket.status === "pending") return;
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

	useEffect(() => {
		ZDGGetTags();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		getZDGTags();
		// eslint-disable-next-line
	}, []);

	const fetchZDG = async () => {
		if (ticket.status === "closed" || ticket.status === "pending") return;
		if (ticket.userId === null){
			return;
		}
		else if (ticket.userId !== null){
			try {
			const { data } = await api.get("/users/" + ticket.userId, {
			});
			setZDG(data['name']);
			} catch (err) {
			console.log('Ticket sem conexão');
			}
		}
      };

	//fetchZDG()

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	const handleAcepptTicket = async id => {
		setLoading(true);
		try {
			await api.put(`/tickets/${id}`, {
				status: "open",
				userId: user?.id,
			});
		} catch (err) {
			setLoading(false);
			toastError(err);
		}
		if (isMounted.current) {
			setLoading(false);
		}
		history.push(`/tickets/${id}`);
	};

	const handleViewTicket = async id => {
		setLoading(true);
		try {
			await api.put(`/tickets/${id}`, {
				status: "pending",
			});
		} catch (err) {
			setLoading(false);
			toastError(err);
		}
		if (isMounted.current) {
			setLoading(false);
		}
		history.push(`/tickets/${id}`);
	};

	const handleSelectTicket = id => {
		history.push(`/tickets/${id}`);
	};

	return (
		<React.Fragment key={ticket.id}>
			<ListItem
				dense
				button
				onLoad={() => fetchZDG()}
				onClick={e => {
					if (ticket.status === "pending") return;
					handleSelectTicket(ticket.id);
				}}
				selected={ticketId && +ticketId === ticket.id}
				className={clsx(classes.ticket, {
					[classes.pendingTicket]: ticket.status === "pending",
				})}
			>
				<Tooltip
					arrow
					placement="right"
					title={ticket.queue?.name || "Sem fila"}
				>
					<span
						style={{ backgroundColor: ticket.queue?.color || "#7C7C7C" }}
						className={classes.ticketQueueColor}
					></span>
				</Tooltip>
				<ListItemAvatar>
					<Avatar src={ticket?.contact?.profilePicUrl} />
				</ListItemAvatar>
				<ListItemText
					disableTypography
					primary={
						<span className={classes.contactNameWrapper}>
							<Typography
								noWrap
								component="span"
								variant="body2"
								color="textPrimary"
							>
								{ticket.contact.name}
							</Typography>
							{ticket.status === "closed" && (
								<Badge
									className={classes.closedBadge}
									badgeContent={"closed"}
									color="primary"
								/>
							)}
							{ticket.lastMessage && (
								<Typography
									className={classes.lastMessageTime}
									component="span"
									variant="body2"
									color="textSecondary"
								>
									{isSameDay(parseISO(ticket.updatedAt), new Date()) ? (
										<>{format(parseISO(ticket.updatedAt), "HH:mm")}</>
									) : (
										<>{format(parseISO(ticket.updatedAt), "dd/MM/yyyy")}</>
									)}
								</Typography>
							)}
							{ticket.whatsappId && (
							// <div className={classes.userTag} title={i18n.t("ticketsList.connectionTitle")}>CHIP {ticket.whatsappId}</div>
							<div className={classes.userTag} title={i18n.t("ticketsList.connectionTitle")}>User: {zdg} | Conexão: {whatsApps.filter(whatsApp => whatsApp.id === ticket.whatsappId).map( whatsApp => (whatsApp.name))}</div>
							// <div className={classes.userTag} title={i18n.t("ticketsList.connectionTitle")}> {users.filter(user => user.id === ticket.userId).map( user => (user.name))}</div>
							// <div className={classes.userTag} title={i18n.t("ticketsList.connectionTitle")}> {whatsApps.filter(whatsApp => whatsApp.id === ticket.whatsappId).map( whatsApp => (whatsApp.name))}</div>
							)}
							<div>{tags.map(tag => <span className={classes.userTag2} key={tag} value={tag} style={{backgroundColor: names.filter(name => name.tag === tag).map( name => (name.color))}}> {tag}</span>)}</div>
						</span>
					}
					secondary={
						<span className={classes.contactNameWrapper}>
							<Typography
								className={classes.contactLastMessage}
								noWrap
								component="span"
								variant="body2"
								color="textSecondary"
							>
								{ticket.lastMessage ? (
									<MarkdownWrapper>{ticket.lastMessage}</MarkdownWrapper>
								) : (
									<br />
								)}
							</Typography>

							<Badge
								className={classes.newMessagesCount}
								badgeContent={ticket.unreadMessages}
								classes={{
									badge: classes.badgeStyle,
								}}
							/>
						</span>
					}
				/>
				{ticket.status === "pending" && (
					<ButtonWithSpinner
						color="primary"
						variant="contained"
						className={classes.acceptButton}
						size="small"
						loading={loading}
						onClick={e => handleAcepptTicket(ticket.id)}
					>
						{i18n.t("ticketsList.buttons.accept")}
					</ButtonWithSpinner>
				)}
				{ticket.status === "pending" && (
					<ButtonWithSpinner
						color="primary"
						variant="contained"
						className={classes.acceptButton}
						size="small"
						loading={loading}
						onClick={e => handleViewTicket(ticket.id)}
					>
						{i18n.t("ticketsList.buttons.view")}
					</ButtonWithSpinner>
				)}
			</ListItem>
			<Divider variant="inset" component="li" />
		</React.Fragment>
	);
};

export default TicketListItem;

