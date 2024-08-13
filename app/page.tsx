import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      index (/) page
      <Link
        className="hover:underline hover:underline-offset-2 px-4 py-2 bg-green-200 rounded-md"
        href="/test-sse">
        /test-sse로 이동
      </Link>
    </main>
  );
}
