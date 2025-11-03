import { NextResponse } from 'next/server';
import eventEmitter from '@/lib/events';

export async function GET(request) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'Connection': 'keep-alive',
  };

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    start(controller) {
      const onComment = (comment) => {
        console.log('SSE: Enqueuing comment:', comment); // Add this log
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(comment)}

`));
      };

      const onStreamEnd = () => {
        controller.enqueue(encoder.encode(`event: stream-end\ndata: {}\n\n`));
        controller.close();
      };

      eventEmitter.on('tiktok-comment', onComment);
      eventEmitter.on('tiktok-stream-end', onStreamEnd);

      // Clean up on disconnect
      request.signal.onabort = () => {
        eventEmitter.off('tiktok-comment', onComment);
        eventEmitter.off('tiktok-stream-end', onStreamEnd);
      };
    },
  });

  return new NextResponse(readable, { headers });
}
