import Team from './team';
import { incrementCounter } from './serverActions';

export const metadata = {
    title: "Team Page",
    description: "This is the Team page with a counter example.",
  };
  
export default function Page() {
  return <Team increment={incrementCounter} />;
}
