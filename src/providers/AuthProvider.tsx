import Cookies from 'js-cookie';
import { FC, PropsWithChildren, createContext, useState } from 'react';

import { TOKEN } from '../app.constants';
import { IIsAuth } from '../types/provider.types';

export const AuthContext = createContext<IIsAuth>({} as IIsAuth);

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [isAuth, setIsAuth] = useState(!!Cookies.get(TOKEN));

	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
