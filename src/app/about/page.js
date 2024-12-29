import { incrementCounter } from '../about/team/serverActions';

import Link from 'next/link';


export const metadata = {
  title: "Team Page",
  description: "Meet our dynamic team. Learn about their roles and expertise.",
  keywords: ["team", "company team", "about us", "team members", "company staff", "experts"],
};


export default function About() {
    
  return (
    <div>
      <h1>About Page</h1>
      <form action={incrementCounter}>
        <select name="country" id="">
          <option >india</option>
          <option >uk</option>
        </select>
        <button type="submit">sbmit</button>
      </form>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
