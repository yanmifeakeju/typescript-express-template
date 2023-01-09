import { fetchWithAuthenticationCreds } from '../../core/users/lib/fetch';
import { handleError } from '../helpers/errors';

export const loginUser = async ({ email, password }: { email: string; password: string }) => {
  try {
    const user = await fetchWithAuthenticationCreds(email, password);
    return { error: null, data: { userId: user.id } };
  } catch (error) {
    return handleError(error as Error);
  }
};
