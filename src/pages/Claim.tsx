import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiConnexion from '../services/apiConnexion';
import { claim, message } from '../interface';

interface messages {
	messages: Array<message>;
}

function Claim() {
	const { id } = useParams();
	const [claim, setClaim] = useState<claim | null>(null);
	const [messages, setMessages] = useState<messages | null>(null);

	const body: object = { q: { claim_id_eq: id } };
	const getMessage = () =>
		apiConnexion
			.get('/messages', { params: body })
			.then((res) => setMessages(res.data));
	useEffect(() => {
		apiConnexion.get(`/claims/${id}`).then((res) => setClaim(res.data));
		getMessage();
	}, []);

	return (
		<div>
			<h1 className="text-5xl font-semibold text-center">
				Claim {claim?.id} Details
			</h1>
			<article className="flex flex-col items-center gap-4">
				<h1 className="text-center text-4xl">claim info</h1>
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
				</section>
			</article>
		</div>
	);
}

export default Claim;
