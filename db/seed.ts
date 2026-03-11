import sampleData from './sample-data';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/lib/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: sampleData.products });

  console.log('Database seeded successfully');
}

main().catch(async e => {
  console.error(e);
  await prisma.$disconnect();
  await pool.end();
  process.exit(1);
});
