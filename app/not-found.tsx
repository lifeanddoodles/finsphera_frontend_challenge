import Heading from "@/components/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-6 py-8 flex flex-col items-start justify-center">
      <Heading level={1} role="status" className="mb-6">
        Not found
      </Heading>
      <div>
        <Link
          className="text-primary hover:text-primary-dark hover:underline"
          href="/"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
