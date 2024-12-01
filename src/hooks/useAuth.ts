import { useContext } from 'react';

import { AuthContext } from '../providers/AuthProvider';
import { IIsAuth } from '../types/provider.types';

export const useAuth = (): IIsAuth => useContext(AuthContext);
