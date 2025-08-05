import { NextResponse } from 'next/server';
import { verifyToken } from './auth';

export function requireAuth(handler, allowedRoles = []) {
  return async (req) => {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      const user = await verifyToken(token);
      if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      req.user = user;
      return handler(req);
    } catch (err) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
    }
  };
}

export function adminMiddleware(handler) {
  return requireAuth(handler, ['admin']);
}
