import { Link, useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';

export async function loader() {
  return json({ message: 'Hello from the "server" (Azure Function)!' });
}

export default function Page2Route() {
  const { message } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Page 2</h1>
      <p>{message}</p>
      <Link to="/">Go back to home</Link>
    </div>
  );
}
