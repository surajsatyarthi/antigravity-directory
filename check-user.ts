import { db } from './src/lib/db';
import { users } from './src/drizzle/schema';
import { eq } from 'drizzle-orm';

async function checkUser() {
  try {
    const user = await db.select().from(users).where(eq(users.email, 'csuitebrandagency@gmail.com')).limit(1);
    if (user.length > 0) {
      console.log('User exists:', user[0]);
    } else {
      console.log('User not found - you need to sign in at http://localhost:3000 first');
    }
  } catch (error: any) {
    console.error('Error:', error.message);
  }
  process.exit(0);
}
checkUser();
