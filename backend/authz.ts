import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { apiConfig } from './api-config';

export const handleAuthorization = (req: Request, resp: Response) => {
  const token = extractToken(req);

  if (!token) {
    resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"');
    resp.status(401).json({ message: 'You need to login.' });
  } else {
    jwt.verify(token, apiConfig.secret, (error, decoded) => {
      if (!decoded) {
        resp.status(403).json({ message: 'Not authorized.' });
      }
    });
  }
};

function extractToken(req: Request): string {
  let token = undefined;
  if (req.header && req.headers.authorization) {
    // Autorization: Bearer zzz.zzz.zzz
    const parts: string[] = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
    return token;
  }
}
