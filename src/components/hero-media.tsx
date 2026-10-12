import { VideoFrame } from "./video-frame";

/** Video del taller en su formato original (16:9), sin recorte ni transformaciones. */
export function HeroMedia() {
  return (
    <div className="frame-in relative aspect-video w-full overflow-clip rounded-frame bg-clay">
      <VideoFrame />
    </div>
  );
}
