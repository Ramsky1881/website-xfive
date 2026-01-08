import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.argv[2]; // 'dev' or 'prod'

if (!env || (env !== 'dev' && env !== 'prod')) {
  console.error('Usage: node setup-db.js <dev|prod>');
  process.exit(1);
}

const schemaMap = {
  dev: 'schema.sqlite.prisma',
  prod: 'schema.postgres.prisma',
};

const source = path.join(__dirname, '..', 'prisma', schemaMap[env]);
const dest = path.join(__dirname, '..', 'prisma', 'schema.prisma');

try {
  fs.copyFileSync(source, dest);
  console.log(`✅ Copied ${schemaMap[env]} to schema.prisma for ${env} environment.`);
} catch (error) {
  console.error('❌ Error copying schema file:', error);
  process.exit(1);
}
