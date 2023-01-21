import React from 'react';
import { useEffect, useState } from 'react';
import apiConnexion from '../services/apiConnexion';
import { labs, claim, meta } from '../interface';
import { Link } from 'react-router-dom';

interface claims {
	claims: Array<claim>;
	meta: meta;
}

function Home() {
	const [claims, setClaims] = useState<claims | null>(null);
	const [page, setPage] = useState<number>(1);
	const [labs, setLabs] = useState<labs | null>(null);
	const [labId, setLabId] = useState<number | null>(null);

	const body = () => {
		if (labId !== null) return { q: { lab_id_eq: labId, pharmacy_id_eq: 1 } };
		return { q: { pharmacy_id_eq: 1 } };
	};

	useEffect(() => {
		apiConnexion
			.get(`/claims?page=${page}`, { params: body() })
			.then((res) => setClaims(res.data));
	}, [page, labId]);

	useEffect(() => {
		apiConnexion.get('/labs').then((res) => setLabs(res.data));
	}, []);

	return (
		<div className="flex flex-col items-center justify-center gap-2 ">
			<h1 className="text-5xl font-semibold text-center">welcome on home</h1>
			<div className="flex gap-2 items-center">
				<select
					onChange={(e) => setLabId(parseInt(e.target.value, 10) || null)}
				>
					<option>select a lab for filter</option>
					{labs?.labs.map((lab) => (
						<option key={lab.id} value={lab.id}>
							{lab.name}
						</option>
					))}
				</select>
			</div>
			<section className="w-5/6 flex flex-wrap justify-evenly bg-slate-300 bg-opacity-40 p-8 rounded-2xl mb-10">
				{claims &&
					claims?.claims.map((claim) => (
						<article
							key={claim.id}
							className="w-1/5 flex flex-col gap-2 items-center m-2 p-2 bg-slate-400 rounded-2xl"
						>
							<h1>claim id: {claim.id} </h1>
							<section>
								<h2>pharmacy: {claim.pharmacy.name}</h2>
							</section>
							<section className="">
								<h2>lab: {claim.lab.name}</h2>
								<img
									src={claim.lab.logo_url}
									className="w-[5rem] aspect-square self-center"
								/>
							</section>
							<Link
								to={`claim/${claim.id}`}
								className="bg-slate-200 p-1 w-1/4 self-center text-center rounded-2xl"
							>
								Details
							</Link>
						</article>
					))}
				<div className="w-full flex justify-center gap-4">
					{new Array(claims?.meta.total_pages).fill('').map((_, index) => (
						<button
							key={`pagination ${index}`}
							type="button"
							className={`${
								page === index + 1 && 'bg-slate-400 px-3 rounded-full'
							} p-1`}
							onClick={() => setPage(index + 1)}
						>
							{index + 1}
						</button>
					))}
				</div>
			</section>
		</div>
	);
}

export default Home;
