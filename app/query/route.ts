import postgres from 'postgres';

const sql = postgres(process.env.SUPABASE_URL_POSTGRES_URL!, { 
  ssl: 'require',
  connect_timeout: 10,
  idle_timeout: 20
});

async function listInvoices() {
	const data = await sql`
    SELECT invoices.*, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC
    LIMIT 10;
  `;

	return data;
}

export async function GET() {
   try {
   	return Response.json(await listInvoices());
   } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
