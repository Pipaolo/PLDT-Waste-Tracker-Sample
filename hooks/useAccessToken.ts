import { IncomingMessage } from 'http';
import { getCookieParser } from 'next/dist/next-server/server/api-utils';

export const useAccessToken = (req: IncomingMessage): string | undefined => {
  const getCookies = getCookieParser(req);
  const cookies = getCookies();
  if (process.env.NODE_ENV === 'production') {
    return cookies['__Secure-next-auth.session-token'];
  }
  return cookies['next-auth.session-token'];
};
