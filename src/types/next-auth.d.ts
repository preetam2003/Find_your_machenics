import 'next-auth';
import { Role, ShopStatus } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: Role;
      shopId?: string | null;
      shopStatus?: ShopStatus | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    role: Role;
    shopId?: string | null;
    shopStatus?: ShopStatus | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: Role;
    shopId?: string | null;
    shopStatus?: ShopStatus | null;
  }
}
