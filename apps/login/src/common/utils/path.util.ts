import { Request } from 'express';

export function fullUrl(req: Request) {
  return (
    req.protocol + '://' + req.get('host') + req.originalUrl.split('?').shift()
  );
}
