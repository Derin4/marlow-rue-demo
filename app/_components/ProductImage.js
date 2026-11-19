"use client";

import { useRef, useState } from "react";
import Photo from "./Photo";

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const STEP = 0.4;

export default function ProductImage({ id, name, swatch, size = "large" }) {
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 50, y: 50 }); // percentage-based focal point
  const dragging = useRef(false);
  const frameRef = useRef(null);

  function zoomIn() {
    setZoom((z) => Math.min(MAX_ZOOM, +(z + STEP).toFixed(2)));
  }

  function zoomOut() {
    setZoom((z) => {
      const next = Math.max(MIN_ZOOM, +(z - STEP).toFixed(2));
      if (next === MIN_ZOOM) setPos({ x: 50, y: 50 });
      return next;
    });
  }

  function pointFromEvent(e) {
    const rect = frameRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    return {
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    };
  }

  function handleDown(e) {
    if (zoom === MIN_ZOOM) return;
    dragging.current = true;
    setPos(pointFromEvent(e));
  }
  function handleMove(e) {
    if (!dragging.current) return;
    setPos(pointFromEvent(e));
  }
  function handleUp() {
    dragging.current = false;
  }
  function handleDoubleClick() {
    if (zoom > MIN_ZOOM) {
      setZoom(MIN_ZOOM);
      setPos({ x: 50, y: 50 });
    } else {
      setZoom(1 + STEP * 2);
    }
  }
  function onKey(e) {
    if (e.key === "+" || e.key === "=") zoomIn();
    if (e.key === "-") zoomOut();
  }

  const heightClass = size === "large" ? "aspect-[4/5]" : "aspect-square";

  return (
    <div className='relative'>
      <div
        ref={frameRef}
        tabIndex={0}
        onKeyDown={onKey}
        className={`relative w-full ${heightClass} overflow-hidden rounded-sm select-none ${zoom > MIN_ZOOM ? "cursor-move touch-none" : "cursor-zoom-in"}`}
        onMouseDown={handleDown}
        onMouseMove={handleMove}
        onMouseUp={handleUp}
        onMouseLeave={handleUp}
        onTouchStart={handleDown}
        onTouchMove={handleMove}
        onTouchEnd={handleUp}
        onDoubleClick={handleDoubleClick}
        role='img'
        aria-label={`${name} product photo, zoom ${Math.round(zoom * 100)} percent. Press plus or minus to zoom.`}
      >
        <div
          className='absolute inset-0 transition-transform duration-150 ease-out'
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: `${pos.x}% ${pos.y}%`,
          }}
        >
          <Photo
            id={id}
            label={name}
            swatch={swatch}
            priority
            sizes='(min-width:640px) 50vw, 100vw'
            className='absolute inset-0'
          />
        </div>
      </div>

      <div className='mt-3 flex items-center justify-between'>
        <span className='font-body text-xs text-ink/50'>
          {Math.round(zoom * 100)}%
        </span>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={zoomOut}
            disabled={zoom === MIN_ZOOM}
            className='h-8 w-8 rounded-full border border-ink/20 font-body text-ink transition-colors hover:border-ink/50 disabled:opacity-30'
            aria-label='Zoom out'
          >
            −
          </button>
          <button
            type='button'
            onClick={zoomIn}
            disabled={zoom === MAX_ZOOM}
            className='h-8 w-8 rounded-full border border-ink/20 font-body text-ink transition-colors hover:border-ink/50 disabled:opacity-30'
            aria-label='Zoom in'
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
