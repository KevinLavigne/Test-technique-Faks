import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import apiConnexion from '../services/apiConnexion';
import { claim, message } from '../interface';
import ExportContext, { context } from '../contexts/UserContext';
import { toast } from 'react-toastify';

interface messages {
	messages: Array<message>;
}

function Claim() {
	const { id } = useParams();
	const [claim, setClaim] = useState<claim | null>(null);
	const [messages, setMessages] = useState<messages | null>(null);
	const [message, setMessage] = useState<string>('');

	const context = useContext(ExportContext.Profil) as context;

	const body: object = { q: { claim_id_eq: id } };
	const getMessage = () =>
		apiConnexion
			.get('/messages', { params: body })
			.then((res) => setMessages(res.data))
			.catch((err) => console.warn(err));
	useEffect(() => {
		apiConnexion
			.get(`/claims/${id}`)
			.then((res) => setClaim(res.data))
			.catch((err) => console.warn(err));
		getMessage();
	}, []);

	const sendMessage = (e: React.SyntheticEvent) => {
		e.preventDefault();
		apiConnexion
			.post('/messages', {
				content: message,
				user_id: context.user.id,
				claim_id: id,
				file: null,
			})
			.then(() => getMessage())
			.catch((err) => {
				console.warn(err);
				toast.error(
					'Something bad hapens durring sending message, try again later.'
				);
			});
	};

	return (
		<div>
			<h1 className="text-5xl font-semibold text-center">
				Claim {claim?.id} Details
			</h1>
			<article className="flex flex-col items-center gap-4">
				<h1 className="text-center text-4xl">claims info</h1>
				<section className="flex justify-evenly w-full ">
					<div className="flex flex-col items-center bg-slate-200 p-4 rounded-2xl">
						<h2> pharmacy : {claim?.pharmacy.id}</h2>
						<p>{claim?.pharmacy.name}</p>
						<p>{claim?.pharmacy.address_country}</p>
						<p>{claim?.pharmacy.address_line_1}</p>
						<p>{claim?.pharmacy.address_zip_code}</p>
						<p>{claim?.pharmacy.cip}</p>
					</div>
					<div className="flex flex-col items-center bg-slate-200 p-4 rounded-2xl">
						<h2> pharmacy : {claim?.lab.id}</h2>
						<p>{claim?.lab.name}</p>
						<img src={claim?.lab.logo_url} className="w-[5rem] aspect-square" />
					</div>
				</section>
				<section className="flex flex-col justify-center items-center bg-slate-300 w-2/5 p-4 rounded-2xl gap-2">
					<h1 className="text-center text-4xl"> messages :</h1>
					{messages &&
						messages.messages.map((message) => (
							<div key={message.id} className="bg-slate-200 p-2 rounded-2xl">
								<p>{message.id}</p>
								<p>problem : {message.content}</p>
								<p>
									by : {message.user.first_name} {message.user.last_name}
								</p>
							</div>
						))}
					<div className="w-full ">
						<p className="text-center">Send a new message :</p>
						<form
							className="w-full flex flex-col items-center gap-2"
							onSubmit={(e) => sendMessage(e)}
						>
							<input
								type="text"
								id="message"
								name="content"
								pattern="^.{10,}"
								className="w-2/3 "
								value={message}
								required
								onChange={(e) => setMessage(e.target.value)}
							></input>
							<button type="submit" className="bg-slate-400 p-2 rounded-2xl">
								send message
							</button>
						</form>
					</div>
				</section>
			</article>
		</div>
	);
}

export default Claim;
