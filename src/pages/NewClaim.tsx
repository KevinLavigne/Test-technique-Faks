import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Toaster from '../components/Toaster';
import ExportContext, { context } from '../contexts/UserContext';
import { labs } from '../interface';
import apiConnexion from '../services/apiConnexion';

function NewClaim() {
	const context = useContext(ExportContext.Profil) as context;

	const [labs, setLabs] = useState<labs | null>(null);
	const [labId, setLabId] = useState<number>(1);
	const [message, setMessage] = useState<string>('');

	const navigate = useNavigate();

	useEffect(() => {
		apiConnexion
			.get('/labs')
			.then((res) => setLabs(res.data))
			.catch((err) => console.warn(err));
	}, []);

	const body = () => {
		return {
			claim: {
				pharmacy_id: context.pharmacy?.id,
				lab_id: labId,
				messages_attributes: [
					{
						user_id: context.user?.id,
						content: message,
						file: null,
					},
				],
			},
		};
	};

	const sendNewClaim = (e: React.SyntheticEvent) => {
		e.preventDefault();
		apiConnexion
			.post('/claims', body())
			.then((res) => navigate(`/claim/${res.data.id}`))
			.catch((err) => {
				console.log(err);
				toast.error('error during claim request creation.');
			});
	};

	return (
		<div className="flex h-[90vh] flex-col justify-center items-center gap-4 ">
			<Toaster />
			<h1 className="text-4xl">Create claim</h1>
			<form
				className=" flex flex-col gap-2 w-3/4 md:w-2/5 bg-slate-300 p-4 rounded-2xl"
				onSubmit={(e) => sendNewClaim(e)}
			>
				<label className="flex flex-col items-center">
					laboratory :
					<select
						className=" md:w-1/4 text-center"
						onChange={(e) => setLabId(parseInt(e.target.value, 10))}
						value={labId}
					>
						{labs?.labs.map((lab) => (
							<option key={lab.id} value={lab.id}>
								{lab.name}
							</option>
						))}
					</select>
				</label>
				<label className="flex flex-col items-center">
					message :
					<input
						type="text"
						className="w-full"
						pattern="^.{10,}"
						required
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
				</label>
				<button
					type="submit"
					className="bg-slate-200 self-center py-1 px-2 rounded-2xl"
				>
					send claim
				</button>
			</form>
		</div>
	);
}
export default NewClaim;
