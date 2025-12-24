import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class InsertResorts1766600963442 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create resorts table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "resorts" (
        "id" SERIAL NOT NULL,
        "no" integer,
        "name" character varying NOT NULL,
        "place" character varying,
        "room" character varying,
        "bed" character varying,
        "condition" character varying,
        "price" character varying,
        "travelSustainableLevel" character varying,
        "rating" decimal(3,1),
        "totalReviews" character varying,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        CONSTRAINT "PK_resorts_id" PRIMARY KEY ("id")
      )
    `);

    // Read and parse CSV file
    const csvFilePath = path.join(
      __dirname,
      '../../../../resorts_in_thailand.csv',
    );

    const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
    const lines = csvContent.split('\n').filter((line) => line.trim());

    // Skip header row
    const dataLines = lines.slice(1);

    // Parse CSV manually (handles commas within quotes)
    const parseCSVLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    // Insert data in batches
    const batchSize = 100;
    for (let i = 0; i < dataLines.length; i += batchSize) {
      const batch = dataLines.slice(i, i + batchSize);
      const values: string[] = [];

      for (const line of batch) {
        const columns = parseCSVLine(line);
        if (columns.length >= 10) {
          const [
            no,
            name,
            place,
            room,
            bed,
            condition,
            price,
            travelLevel,
            rating,
            reviews,
          ] = columns;

          // Escape single quotes for SQL
          const escape = (str: string) => (str ? str.replace(/'/g, "''") : '');

          // Parse rating (handle empty values)
          const ratingValue =
            rating && rating.trim() !== '' ? parseFloat(rating) : null;

          values.push(`(
            ${no || 'NULL'},
            '${escape(name)}',
            '${escape(place)}',
            '${escape(room)}',
            '${escape(bed)}',
            '${escape(condition)}',
            '${escape(price)}',
            '${escape(travelLevel)}',
            ${ratingValue !== null ? ratingValue : 'NULL'},
            '${escape(reviews)}'
          )`);
        }
      }

      if (values.length > 0) {
        await queryRunner.query(`
          INSERT INTO "resorts" (
            "no", "name", "place", "room", "bed", "condition", 
            "price", "travelSustainableLevel", "rating", "totalReviews"
          )
          VALUES ${values.join(',\n')}
        `);
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "resorts"`);
  }
}
