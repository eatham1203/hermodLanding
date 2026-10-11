import { useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'

/**
 * Full-page player for the product video: native <dialog> (focus trap, Esc,
 * inert page behind), with sound and the browser's own controls, which
 * include true full screen. Starts where the inline preview was.
 */
export function VideoDialog({
  src,
  open,
  startAt,
  playbackRate = 1,
  onClose,
}: {
  src: string
  open: boolean
  startAt: number
  playbackRate?: number
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    const dialog = dialogRef.current
    const video = videoRef.current
    if (!dialog || !video) return
    if (open && !dialog.open) {
      dialog.showModal()
      lenis?.stop()
      video.currentTime = startAt
      video.defaultPlaybackRate = playbackRate
      video.playbackRate = playbackRate
      video.play().catch(() => {})
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open, startAt, playbackRate, lenis])

  const handleClose = () => {
    videoRef.current?.pause()
    lenis?.start()
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Hermod product walkthrough"
      onClose={handleClose}
      onClick={(e) => {
        // Clicks on the dark area around the video (the dialog itself) close it.
        if (e.target === e.currentTarget) dialogRef.current?.close()
      }}
      className="fixed inset-0 m-0 size-full max-h-none max-w-none bg-ink/95 p-0 backdrop:bg-transparent open:grid open:place-items-center"
    >
      <video
        ref={videoRef}
        src={src}
        controls
        playsInline
        preload="none"
        className="max-h-[calc(100dvh-7rem)] w-[min(92vw,1600px)] rounded-md bg-ink"
      />
      <button
        type="button"
        onClick={() => dialogRef.current?.close()}
        className="glass absolute top-4 right-4 inline-flex bg-glass-solid! h-11 items-center gap-2 rounded-full px-4 text-[15px] font-medium text-ink sm:top-6 sm:right-6"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M4 4l8 8M12 4l-8 8" />
        </svg>
        Close
      </button>
    </dialog>
  )
}
