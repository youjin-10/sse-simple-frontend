"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export default function StreamBox() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  //   let eventSource: EventSource;

  //   useEffect(() => {
  //     eventSource = new EventSource("http://localhost:8000/stream");
  //     return () => {
  //         eventSource.close();
  //     };
  //   }, []);

  const startStreaming = useCallback(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchEventSource("http://localhost:8000/stream", {
      signal,
      onmessage(ev) {
        console.log(`Received event: ${ev.data}`);
        setMessages((prev) => [...prev, ev.data]);
      },
      onerror(err) {
        console.error("EventSource failed:", err);
        setIsStreaming(false);
      },
      onclose() {
        console.log("Connection closed");
        setIsStreaming(false);
      },
    }).catch((error) => {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
      } else {
        console.error("Error in fetchEventSource:", error);
      }
      setIsStreaming(false);
    });

    return () => {
      controller.abort();
    };
  }, []);

  const stopStreaming = useCallback(() => {
    setIsStreaming(false);
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-3">
        <button
          className="px-4 py-2 bg-red-200 rounded-md"
          onClick={startStreaming}
          disabled={isStreaming}>
          계정 생성 요청 (?)
        </button>
      </div>

      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
  );
}
