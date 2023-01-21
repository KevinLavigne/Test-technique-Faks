import React, { useContext } from 'react';
import ExportContext, { context } from '../contexts/UserContext';

function Page2() {
	const context = useContext(ExportContext.Profil) as context;
	return (
		<div className="h-[95vh]">
			<h1 className="text-5xl font-semibold text-center">user information</h1>
			<section className="flex justify-evenly h-[90%] items-center">
				<article className="flex flex-col bg-slate-200 bg-opacity-80 p-4 rounded-2xl">
					<h2>User:</h2>
					<p>Firstname : {context.user?.first_name}</p>
					<p>Lastname : {context.user?.last_name}</p>
					<p>Email : {context.user?.email}</p>
					<p>
						Work on : {context.user?.kind}{' '}
						{context.user?.kind === 'pharmacy'
							? context.user?.pharmacy_id
							: context.user?.pharmacy_id}
					</p>
					<p>
						Created at : {new Date(context.user?.created_at).toLocaleString()}
					</p>
					<p>
						Last update : {new Date(context.user?.updated_at).toLocaleString()}
					</p>
				</article>
				<article className="flex flex-col bg-slate-200 bg-opacity-80 p-4 rounded-2xl">
					<h2>Pharmacy : </h2>
					<h2>Name :{context.pharmacy?.name}</h2>
					<h2>Country : {context.pharmacy?.address_country}</h2>
					<h2>Address : {context.pharmacy?.address_line_1}</h2>
					<h2>Zip code : {context.pharmacy?.address_zip_code}</h2>
					<h2>Cip : {context.pharmacy?.cip}</h2>
				</article>
			</section>
		</div>
	);
}

export default Page2;
