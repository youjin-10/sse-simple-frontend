import StreamBox from "./stream-box";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-24">
      <p>(/test-sse) page</p>

      <StreamBox />
    </main>
  );
}
