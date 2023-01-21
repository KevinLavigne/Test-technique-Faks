import React, { createContext, useEffect, useState } from 'react';
import apiConnexion from '../services/apiConnexion';
import { pharmacy, user } from '../interface';

export interface context {
	user: user;
	pharmacy: pharmacy;
}

interface children {
	children: JSX.Element;
}

const Profil = createContext({});
function Provider({ children }: children) {
	const [user, setUser] = useState<user | null>(null);

	const [pharmacy, setPharmacy] = useState<pharmacy | null>(null);

	useEffect(() => {
		apiConnexion.get('/pharmacies/1').then((res) => {
			const newData = { ...res.data };
			delete newData.user;
			setUser(res.data.user);
			setPharmacy(newData);
		});
	}, []);

	return (
		<Profil.Provider value={{ user, pharmacy }}>{children}</Profil.Provider>
	);
}
const ExportContext = {
	Profil,
	Provider,
};

export default ExportContext;
