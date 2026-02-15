"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";

const ROC = [
  { day:1, date:"Feb 18", wd:"Wed", su:"5:45 AM", if:"5:46 PM", fj:"5:45 AM", dh:"12:25 PM", as:"3:19 PM", mg:"5:46 PM", is:"7:05 PM" },
  { day:2, date:"Feb 19", wd:"Thu", su:"5:43 AM", if:"5:47 PM", fj:"5:43 AM", dh:"12:25 PM", as:"3:20 PM", mg:"5:47 PM", is:"7:06 PM" },
  { day:3, date:"Feb 20", wd:"Fri", su:"5:42 AM", if:"5:49 PM", fj:"5:42 AM", dh:"12:25 PM", as:"3:21 PM", mg:"5:49 PM", is:"7:08 PM" },
  { day:4, date:"Feb 21", wd:"Sat", su:"5:40 AM", if:"5:50 PM", fj:"5:40 AM", dh:"12:25 PM", as:"3:22 PM", mg:"5:50 PM", is:"7:09 PM" },
  { day:5, date:"Feb 22", wd:"Sun", su:"5:39 AM", if:"5:51 PM", fj:"5:39 AM", dh:"12:24 PM", as:"3:23 PM", mg:"5:51 PM", is:"7:10 PM" },
  { day:6, date:"Feb 23", wd:"Mon", su:"5:37 AM", if:"5:53 PM", fj:"5:37 AM", dh:"12:24 PM", as:"3:24 PM", mg:"5:53 PM", is:"7:11 PM" },
  { day:7, date:"Feb 24", wd:"Tue", su:"5:36 AM", if:"5:54 PM", fj:"5:36 AM", dh:"12:24 PM", as:"3:25 PM", mg:"5:54 PM", is:"7:12 PM" },
  { day:8, date:"Feb 25", wd:"Wed", su:"5:34 AM", if:"5:55 PM", fj:"5:34 AM", dh:"12:24 PM", as:"3:26 PM", mg:"5:55 PM", is:"7:14 PM" },
  { day:9, date:"Feb 26", wd:"Thu", su:"5:33 AM", if:"5:56 PM", fj:"5:33 AM", dh:"12:24 PM", as:"3:27 PM", mg:"5:56 PM", is:"7:15 PM" },
  { day:10, date:"Feb 27", wd:"Fri", su:"5:31 AM", if:"5:58 PM", fj:"5:31 AM", dh:"12:24 PM", as:"3:27 PM", mg:"5:58 PM", is:"7:16 PM" },
  { day:11, date:"Feb 28", wd:"Sat", su:"5:30 AM", if:"5:59 PM", fj:"5:30 AM", dh:"12:23 PM", as:"3:28 PM", mg:"5:59 PM", is:"7:17 PM" },
  { day:12, date:"Mar 1", wd:"Sun", su:"5:28 AM", if:"6:00 PM", fj:"5:28 AM", dh:"12:23 PM", as:"3:29 PM", mg:"6:00 PM", is:"7:19 PM" },
  { day:13, date:"Mar 2", wd:"Mon", su:"5:26 AM", if:"6:02 PM", fj:"5:26 AM", dh:"12:23 PM", as:"3:30 PM", mg:"6:02 PM", is:"7:20 PM" },
  { day:14, date:"Mar 3", wd:"Tue", su:"5:25 AM", if:"6:03 PM", fj:"5:25 AM", dh:"12:23 PM", as:"3:31 PM", mg:"6:03 PM", is:"7:21 PM" },
  { day:15, date:"Mar 4", wd:"Wed", su:"5:23 AM", if:"6:04 PM", fj:"5:23 AM", dh:"12:23 PM", as:"3:32 PM", mg:"6:04 PM", is:"7:22 PM" },
  { day:16, date:"Mar 5", wd:"Thu", su:"5:21 AM", if:"6:05 PM", fj:"5:21 AM", dh:"12:22 PM", as:"3:32 PM", mg:"6:05 PM", is:"7:24 PM" },
  { day:17, date:"Mar 6", wd:"Fri", su:"5:20 AM", if:"6:06 PM", fj:"5:20 AM", dh:"12:22 PM", as:"3:33 PM", mg:"6:06 PM", is:"7:25 PM" },
  { day:18, date:"Mar 7", wd:"Sat", su:"5:18 AM", if:"6:08 PM", fj:"5:18 AM", dh:"12:22 PM", as:"3:34 PM", mg:"6:08 PM", is:"7:26 PM" },
  { day:19, date:"Mar 8", wd:"Sun", su:"6:18 AM", if:"7:08 PM", fj:"6:18 AM", dh:"1:22 PM", as:"4:34 PM", mg:"7:08 PM", is:"8:26 PM", note:"DST" },
  { day:20, date:"Mar 9", wd:"Mon", su:"6:16 AM", if:"7:09 PM", fj:"6:16 AM", dh:"1:22 PM", as:"4:35 PM", mg:"7:09 PM", is:"8:27 PM" },
  { day:21, date:"Mar 10", wd:"Tue", su:"6:14 AM", if:"7:10 PM", fj:"6:14 AM", dh:"1:21 PM", as:"4:35 PM", mg:"7:10 PM", is:"8:28 PM" },
  { day:22, date:"Mar 11", wd:"Wed", su:"6:13 AM", if:"7:11 PM", fj:"6:13 AM", dh:"1:21 PM", as:"4:36 PM", mg:"7:11 PM", is:"8:30 PM" },
  { day:23, date:"Mar 12", wd:"Thu", su:"6:11 AM", if:"7:13 PM", fj:"6:11 AM", dh:"1:21 PM", as:"4:37 PM", mg:"7:13 PM", is:"8:31 PM" },
  { day:24, date:"Mar 13", wd:"Fri", su:"6:09 AM", if:"7:14 PM", fj:"6:09 AM", dh:"1:21 PM", as:"4:38 PM", mg:"7:14 PM", is:"8:32 PM" },
  { day:25, date:"Mar 14", wd:"Sat", su:"6:07 AM", if:"7:15 PM", fj:"6:07 AM", dh:"1:20 PM", as:"4:38 PM", mg:"7:15 PM", is:"8:33 PM" },
  { day:26, date:"Mar 15", wd:"Sun", su:"6:05 AM", if:"7:16 PM", fj:"6:05 AM", dh:"1:20 PM", as:"4:39 PM", mg:"7:16 PM", is:"8:35 PM" },
  { day:27, date:"Mar 16", wd:"Mon", su:"6:04 AM", if:"7:17 PM", fj:"6:04 AM", dh:"1:20 PM", as:"4:40 PM", mg:"7:17 PM", is:"8:36 PM" },
  { day:28, date:"Mar 17", wd:"Tue", su:"6:02 AM", if:"7:19 PM", fj:"6:02 AM", dh:"1:20 PM", as:"4:40 PM", mg:"7:19 PM", is:"8:37 PM" },
  { day:29, date:"Mar 18", wd:"Wed", su:"6:00 AM", if:"7:20 PM", fj:"6:00 AM", dh:"1:19 PM", as:"4:41 PM", mg:"7:20 PM", is:"8:39 PM" },
  { day:30, date:"Mar 19", wd:"Thu", su:"5:58 AM", if:"7:21 PM", fj:"5:58 AM", dh:"1:19 PM", as:"4:42 PM", mg:"7:21 PM", is:"8:40 PM" },
];

const KOS = [
  { day:1, date:"Feb 19", wd:"Thu", su:"4:49 AM", if:"5:21 PM", fj:"4:49 AM", dh:"11:54 AM", as:"3:32 PM", mg:"5:21 PM", is:"6:52 PM" },
  { day:2, date:"Feb 20", wd:"Fri", su:"4:48 AM", if:"5:22 PM", fj:"4:48 AM", dh:"11:54 AM", as:"3:33 PM", mg:"5:22 PM", is:"6:53 PM" },
  { day:3, date:"Feb 21", wd:"Sat", su:"4:46 AM", if:"5:23 PM", fj:"4:46 AM", dh:"11:54 AM", as:"3:34 PM", mg:"5:23 PM", is:"6:54 PM" },
  { day:4, date:"Feb 22", wd:"Sun", su:"4:44 AM", if:"5:25 PM", fj:"4:44 AM", dh:"11:54 AM", as:"3:35 PM", mg:"5:25 PM", is:"6:56 PM" },
  { day:5, date:"Feb 23", wd:"Mon", su:"4:43 AM", if:"5:26 PM", fj:"4:43 AM", dh:"11:54 AM", as:"3:36 PM", mg:"5:26 PM", is:"6:57 PM" },
  { day:6, date:"Feb 24", wd:"Tue", su:"4:41 AM", if:"5:27 PM", fj:"4:41 AM", dh:"11:53 AM", as:"3:37 PM", mg:"5:27 PM", is:"6:58 PM" },
  { day:7, date:"Feb 25", wd:"Wed", su:"4:40 AM", if:"5:28 PM", fj:"4:40 AM", dh:"11:53 AM", as:"3:38 PM", mg:"5:28 PM", is:"6:58 PM" },
  { day:8, date:"Feb 26", wd:"Thu", su:"4:39 AM", if:"5:29 PM", fj:"4:39 AM", dh:"11:52 AM", as:"3:40 PM", mg:"5:29 PM", is:"6:59 PM" },
  { day:9, date:"Feb 27", wd:"Fri", su:"4:37 AM", if:"5:30 PM", fj:"4:37 AM", dh:"11:51 AM", as:"3:41 PM", mg:"5:30 PM", is:"7:00 PM" },
  { day:10, date:"Feb 28", wd:"Sat", su:"4:36 AM", if:"5:31 PM", fj:"4:36 AM", dh:"11:51 AM", as:"3:42 PM", mg:"5:31 PM", is:"7:01 PM" },
  { day:11, date:"Mar 1", wd:"Sun", su:"4:34 AM", if:"5:33 PM", fj:"4:34 AM", dh:"11:51 AM", as:"3:43 PM", mg:"5:33 PM", is:"7:03 PM" },
  { day:12, date:"Mar 2", wd:"Mon", su:"4:33 AM", if:"5:34 PM", fj:"4:33 AM", dh:"11:50 AM", as:"3:44 PM", mg:"5:34 PM", is:"7:05 PM" },
  { day:13, date:"Mar 3", wd:"Tue", su:"4:31 AM", if:"5:36 PM", fj:"4:31 AM", dh:"11:50 AM", as:"3:45 PM", mg:"5:36 PM", is:"7:07 PM" },
  { day:14, date:"Mar 4", wd:"Wed", su:"4:29 AM", if:"5:37 PM", fj:"4:29 AM", dh:"11:50 AM", as:"3:46 PM", mg:"5:37 PM", is:"7:08 PM" },
  { day:15, date:"Mar 5", wd:"Thu", su:"4:27 AM", if:"5:38 PM", fj:"4:27 AM", dh:"11:50 AM", as:"3:47 PM", mg:"5:38 PM", is:"7:09 PM" },
  { day:16, date:"Mar 6", wd:"Fri", su:"4:25 AM", if:"5:39 PM", fj:"4:25 AM", dh:"11:50 AM", as:"3:48 PM", mg:"5:39 PM", is:"7:10 PM" },
  { day:17, date:"Mar 7", wd:"Sat", su:"4:23 AM", if:"5:40 PM", fj:"4:23 AM", dh:"11:50 AM", as:"3:49 PM", mg:"5:40 PM", is:"7:11 PM" },
  { day:18, date:"Mar 8", wd:"Sun", su:"4:21 AM", if:"5:42 PM", fj:"4:21 AM", dh:"11:50 AM", as:"3:50 PM", mg:"5:42 PM", is:"7:13 PM" },
  { day:19, date:"Mar 9", wd:"Mon", su:"4:20 AM", if:"5:43 PM", fj:"4:20 AM", dh:"11:50 AM", as:"3:51 PM", mg:"5:43 PM", is:"7:14 PM" },
  { day:20, date:"Mar 10", wd:"Tue", su:"4:18 AM", if:"5:44 PM", fj:"4:18 AM", dh:"11:50 AM", as:"3:52 PM", mg:"5:44 PM", is:"7:15 PM" },
  { day:21, date:"Mar 11", wd:"Wed", su:"4:16 AM", if:"5:45 PM", fj:"4:16 AM", dh:"11:50 AM", as:"3:53 PM", mg:"5:45 PM", is:"7:16 PM" },
  { day:22, date:"Mar 12", wd:"Thu", su:"4:15 AM", if:"5:47 PM", fj:"4:15 AM", dh:"11:49 AM", as:"3:54 PM", mg:"5:47 PM", is:"7:18 PM" },
  { day:23, date:"Mar 13", wd:"Fri", su:"4:14 AM", if:"5:48 PM", fj:"4:14 AM", dh:"11:49 AM", as:"3:55 PM", mg:"5:48 PM", is:"7:19 PM" },
  { day:24, date:"Mar 14", wd:"Sat", su:"4:13 AM", if:"5:49 PM", fj:"4:13 AM", dh:"11:49 AM", as:"3:56 PM", mg:"5:49 PM", is:"7:20 PM" },
  { day:25, date:"Mar 15", wd:"Sun", su:"4:11 AM", if:"5:50 PM", fj:"4:11 AM", dh:"11:49 AM", as:"3:57 PM", mg:"5:50 PM", is:"7:21 PM" },
  { day:26, date:"Mar 16", wd:"Mon", su:"4:09 AM", if:"5:51 PM", fj:"4:09 AM", dh:"11:49 AM", as:"3:58 PM", mg:"5:51 PM", is:"7:22 PM" },
  { day:27, date:"Mar 17", wd:"Tue", su:"4:08 AM", if:"5:52 PM", fj:"4:08 AM", dh:"11:48 AM", as:"3:59 PM", mg:"5:52 PM", is:"7:23 PM" },
  { day:28, date:"Mar 18", wd:"Wed", su:"4:06 AM", if:"5:53 PM", fj:"4:06 AM", dh:"11:48 AM", as:"4:00 PM", mg:"5:53 PM", is:"7:25 PM" },
  { day:29, date:"Mar 19", wd:"Thu", su:"4:04 AM", if:"5:55 PM", fj:"4:04 AM", dh:"11:48 AM", as:"4:00 PM", mg:"5:55 PM", is:"7:26 PM" },
];

const TAS = [
  { day:1, date:"Feb 19", wd:"Thu", su:"5:41 AM", if:"6:01 PM", fj:"5:41 AM", dh:"12:21 PM", as:"3:30 PM", mg:"6:01 PM", is:"7:20 PM" },
  { day:2, date:"Feb 20", wd:"Fri", su:"5:39 AM", if:"6:03 PM", fj:"5:39 AM", dh:"12:21 PM", as:"3:31 PM", mg:"6:03 PM", is:"7:21 PM" },
  { day:3, date:"Feb 21", wd:"Sat", su:"5:38 AM", if:"6:04 PM", fj:"5:38 AM", dh:"12:21 PM", as:"3:32 PM", mg:"6:04 PM", is:"7:22 PM" },
  { day:4, date:"Feb 22", wd:"Sun", su:"5:37 AM", if:"6:05 PM", fj:"5:37 AM", dh:"12:21 PM", as:"3:33 PM", mg:"6:05 PM", is:"7:23 PM" },
  { day:5, date:"Feb 23", wd:"Mon", su:"5:35 AM", if:"6:06 PM", fj:"5:35 AM", dh:"12:21 PM", as:"3:34 PM", mg:"6:06 PM", is:"7:24 PM" },
  { day:6, date:"Feb 24", wd:"Tue", su:"5:34 AM", if:"6:07 PM", fj:"5:34 AM", dh:"12:21 PM", as:"3:35 PM", mg:"6:07 PM", is:"7:25 PM" },
  { day:7, date:"Feb 25", wd:"Wed", su:"5:32 AM", if:"6:09 PM", fj:"5:32 AM", dh:"12:20 PM", as:"3:36 PM", mg:"6:09 PM", is:"7:26 PM" },
  { day:8, date:"Feb 26", wd:"Thu", su:"5:31 AM", if:"6:10 PM", fj:"5:31 AM", dh:"12:20 PM", as:"3:37 PM", mg:"6:10 PM", is:"7:27 PM" },
  { day:9, date:"Feb 27", wd:"Fri", su:"5:29 AM", if:"6:11 PM", fj:"5:29 AM", dh:"12:20 PM", as:"3:38 PM", mg:"6:11 PM", is:"7:28 PM" },
  { day:10, date:"Feb 28", wd:"Sat", su:"5:28 AM", if:"6:12 PM", fj:"5:28 AM", dh:"12:20 PM", as:"3:38 PM", mg:"6:12 PM", is:"7:29 PM" },
  { day:11, date:"Mar 1", wd:"Sun", su:"5:26 AM", if:"6:13 PM", fj:"5:26 AM", dh:"12:20 PM", as:"3:39 PM", mg:"6:13 PM", is:"7:30 PM" },
  { day:12, date:"Mar 2", wd:"Mon", su:"5:25 AM", if:"6:15 PM", fj:"5:25 AM", dh:"12:19 PM", as:"3:40 PM", mg:"6:15 PM", is:"7:31 PM" },
  { day:13, date:"Mar 3", wd:"Tue", su:"5:23 AM", if:"6:16 PM", fj:"5:23 AM", dh:"12:19 PM", as:"3:41 PM", mg:"6:16 PM", is:"7:32 PM" },
  { day:14, date:"Mar 4", wd:"Wed", su:"5:22 AM", if:"6:17 PM", fj:"5:22 AM", dh:"12:19 PM", as:"3:42 PM", mg:"6:17 PM", is:"7:33 PM" },
  { day:15, date:"Mar 5", wd:"Thu", su:"5:20 AM", if:"6:18 PM", fj:"5:20 AM", dh:"12:19 PM", as:"3:42 PM", mg:"6:18 PM", is:"7:34 PM" },
  { day:16, date:"Mar 6", wd:"Fri", su:"5:19 AM", if:"6:19 PM", fj:"5:19 AM", dh:"12:18 PM", as:"3:43 PM", mg:"6:19 PM", is:"7:35 PM" },
  { day:17, date:"Mar 7", wd:"Sat", su:"5:17 AM", if:"6:20 PM", fj:"5:17 AM", dh:"12:18 PM", as:"3:44 PM", mg:"6:20 PM", is:"7:36 PM" },
  { day:18, date:"Mar 8", wd:"Sun", su:"5:15 AM", if:"6:21 PM", fj:"5:15 AM", dh:"12:18 PM", as:"3:45 PM", mg:"6:21 PM", is:"7:37 PM" },
  { day:19, date:"Mar 9", wd:"Mon", su:"5:14 AM", if:"6:23 PM", fj:"5:14 AM", dh:"12:18 PM", as:"3:45 PM", mg:"6:23 PM", is:"7:38 PM" },
  { day:20, date:"Mar 10", wd:"Tue", su:"5:12 AM", if:"6:24 PM", fj:"5:12 AM", dh:"12:17 PM", as:"3:46 PM", mg:"6:24 PM", is:"7:39 PM" },
  { day:21, date:"Mar 11", wd:"Wed", su:"5:10 AM", if:"6:25 PM", fj:"5:10 AM", dh:"12:17 PM", as:"3:47 PM", mg:"6:25 PM", is:"7:40 PM" },
  { day:22, date:"Mar 12", wd:"Thu", su:"5:09 AM", if:"6:26 PM", fj:"5:09 AM", dh:"12:17 PM", as:"3:47 PM", mg:"6:26 PM", is:"7:41 PM" },
  { day:23, date:"Mar 13", wd:"Fri", su:"5:07 AM", if:"6:27 PM", fj:"5:07 AM", dh:"12:17 PM", as:"3:48 PM", mg:"6:27 PM", is:"7:42 PM" },
  { day:24, date:"Mar 14", wd:"Sat", su:"5:05 AM", if:"6:28 PM", fj:"5:05 AM", dh:"12:16 PM", as:"3:49 PM", mg:"6:28 PM", is:"7:43 PM" },
  { day:25, date:"Mar 15", wd:"Sun", su:"5:03 AM", if:"6:29 PM", fj:"5:03 AM", dh:"12:16 PM", as:"3:49 PM", mg:"6:29 PM", is:"7:44 PM" },
  { day:26, date:"Mar 16", wd:"Mon", su:"5:02 AM", if:"6:30 PM", fj:"5:02 AM", dh:"12:16 PM", as:"3:50 PM", mg:"6:30 PM", is:"7:45 PM" },
  { day:27, date:"Mar 17", wd:"Tue", su:"5:00 AM", if:"6:31 PM", fj:"5:00 AM", dh:"12:15 PM", as:"3:50 PM", mg:"6:31 PM", is:"7:46 PM" },
  { day:28, date:"Mar 18", wd:"Wed", su:"4:58 AM", if:"6:33 PM", fj:"4:58 AM", dh:"12:15 PM", as:"3:51 PM", mg:"6:33 PM", is:"7:47 PM" },
  { day:29, date:"Mar 19", wd:"Thu", su:"4:56 AM", if:"6:34 PM", fj:"4:56 AM", dh:"12:15 PM", as:"3:52 PM", mg:"6:34 PM", is:"7:48 PM" },
];

function fastMins(su, ift) {
  const p = (t) => { const [x, per] = t.split(" "); let [h, m] = x.split(":").map(Number); if (per === "PM" && h !== 12) h += 12; if (per === "AM" && h === 12) h = 0; return h * 60 + m; };
  return p(ift) - p(su);
}
function fastStr(m) { return `${Math.floor(m/60)}h ${m%60}m`; }

/* Animated wave aura SVG rings — core balo visual */
function WaveAura({ size = 60, color = "#B88ADE", animate = true, rings = 3 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
      {Array.from({ length: rings }).map((_, i) => {
        const r = 32 + i * 9;
        const dur = 3 + i * 1.2;
        const op = 0.35 - i * 0.08;
        return (
          <circle key={i} cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth={1.2 - i * 0.2}
            opacity={op} strokeDasharray={`${4 + i * 2} ${6 + i * 3}`}>
            {animate && <animateTransform attributeName="transform" type="rotate"
              from={`0 50 50`} to={`${i % 2 === 0 ? 360 : -360} 50 50`} dur={`${dur}s`} repeatCount="indefinite" />}
          </circle>
        );
      })}
    </svg>
  );
}

/* Connection lines between crescent dots */
function ConnectionLines({ points, dims }) {
  if (points.length < 2) return null;
  return (
    <svg width={dims.w} height={dims.h} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
      {points.slice(0, -1).map((p, i) => {
        const next = points[i + 1];
        return (
          <line key={i} x1={p.x} y1={p.y} x2={next.x} y2={next.y}
            stroke="rgba(184,138,222,0.12)" strokeWidth="1" />
        );
      })}
    </svg>
  );
}

function CrescentArc({ data, selected, onSelect }) {
  const ref = useRef(null);
  const [dims, setDims] = useState({ w: 600, h: 340 });

  useEffect(() => {
    const m = () => { if (ref.current) { const r = ref.current.getBoundingClientRect(); setDims({ w: r.width, h: Math.min(380, r.width * 0.58) }); } };
    m(); window.addEventListener("resize", m); return () => window.removeEventListener("resize", m);
  }, []);

  const total = data.length;
  const cx = dims.w / 2;
  const cy = dims.h * 0.08;
  const rx = dims.w * 0.45;
  const ry = dims.h * 0.78;
  const sA = Math.PI * 0.1;
  const eA = Math.PI * 0.9;
  const isOdd = (d) => [21,23,25,27,29].includes(d);
  const isL10 = (d) => d >= 21;

  const pts = data.map((_, i) => {
    const t = i / (total - 1);
    const a = sA + t * (eA - sA);
    return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
  });

  return (
    <div ref={ref} style={{ width: "100%", position: "relative", height: dims.h, marginBottom: 4 }}>
      <ConnectionLines points={pts} dims={dims} />
      
      {/* Dashed arc path */}
      <svg width={dims.w} height={dims.h} style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
        <defs>
          <linearGradient id="arcG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(184,138,222,0)" />
            <stop offset="50%" stopColor="rgba(184,138,222,0.2)" />
            <stop offset="100%" stopColor="rgba(184,138,222,0)" />
          </linearGradient>
        </defs>
        <path d={`M ${pts[0].x} ${pts[0].y} ${pts.map(p => `L ${p.x} ${p.y}`).join(' ')}`}
          fill="none" stroke="url(#arcG)" strokeWidth="1" strokeDasharray="3 8" />
      </svg>

      {data.map((d, i) => {
        const { x, y } = pts[i];
        const isSel = selected === i;
        const odd = isOdd(d.day);
        const l10 = isL10(d.day);
        const sz = isSel ? 44 : odd ? 30 : 24;
        const auraColor = odd ? "#E8C170" : l10 ? "#E07070" : "#B88ADE";

        return (
          <div key={i} onClick={() => onSelect(isSel ? null : i)}
            style={{
              position: "absolute", left: x - sz/2, top: y - sz/2, width: sz, height: sz,
              borderRadius: "50%", cursor: "pointer", transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              zIndex: isSel ? 20 : 2,
            }}>
            {/* Wave aura */}
            {(isSel || odd) && (
              <WaveAura size={isSel ? sz * 2.2 : sz * 1.8} color={auraColor} rings={isSel ? 4 : 2} />
            )}
            {/* Dot */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: isSel
                ? "linear-gradient(135deg, #B88ADE, #8B5FBF)"
                : l10
                  ? "rgba(184,138,222,0.25)"
                  : "rgba(255,255,255,0.12)",
              border: isSel
                ? "2px solid rgba(255,255,255,0.5)"
                : odd
                  ? "1.5px solid rgba(228,193,112,0.5)"
                  : "1px solid rgba(255,255,255,0.15)",
              boxShadow: isSel
                ? "0 0 24px rgba(184,138,222,0.5), 0 0 48px rgba(184,138,222,0.2)"
                : "0 2px 8px rgba(0,0,0,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(8px)",
            }}>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: isSel ? 16 : odd ? 11 : 9,
                fontWeight: isSel ? 600 : 500,
                color: isSel ? "#fff" : l10 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)",
              }}>{d.day}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FastingBar({ su, ift }) {
  const p = (t) => { const [x, per] = t.split(" "); let [h, m] = x.split(":").map(Number); if (per === "PM" && h !== 12) h += 12; if (per === "AM" && h === 12) h = 0; return h * 60 + m; };
  const total = 24 * 60;
  const s = p(su) / total * 100;
  const e = p(ift) / total * 100;
  return (
    <div style={{ width: "100%", height: 4, borderRadius: 2, background: "rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", left: `${s}%`, width: `${e-s}%`, height: "100%",
        background: "linear-gradient(90deg, #5BA0D9, #B88ADE, #E8C170)",
        borderRadius: 2, boxShadow: "0 0 12px rgba(184,138,222,0.3)",
      }} />
    </div>
  );
}

export default function BaloRamadan() {
  const [city, setCity] = useState("roc");
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState("crescent");

  const data = city === "roc" ? ROC : city === "kos" ? KOS : TAS;
  const d = data[selected] || data[0];
  const mins = fastMins(d.su, d.if);

  useEffect(() => { if (selected >= data.length) setSelected(data.length - 1); }, [city, data.length, selected]);

  const ru = city === "tas";

  const L = {
    mubarak: ru ? "РАМАДАН МУБАРАК" : "RAMADAN MUBARAK",
    suhoor: ru ? "Сухур" : "Suhoor",
    iftar: ru ? "Ифтар" : "Iftar",
    fasting: ru ? "пост" : "fasting",
    dawn: ru ? "Рассвет" : "Dawn",
    sunset: ru ? "Закат" : "Sunset",
    fajr: ru ? "Фаджр" : "Fajr",
    dhuhr: ru ? "Зухр" : "Dhuhr",
    asr: ru ? "Аср" : "Asr",
    maghrib: ru ? "Магриб" : "Maghrib",
    isha: ru ? "Иша" : "Isha",
    lq: ru ? "✦ Ляйлятуль-Кадр ✦" : "✦ Laylatul Qadr ✦",
    seekLq: ru ? "Ищите Ляйлятуль-Кадр" : "Seek Laylatul Qadr",
    tapHint: ru ? "Нажмите на день · Последние 10 ночей выделены" : "Tap a day · Last 10 nights & odd nights highlighted",
    crescent: ru ? "Полумесяц" : "Crescent",
    list: ru ? "Список" : "List",
    compare: ru ? "Сравнить" : "Compare",
    date: ru ? "Дата" : "Date",
    fast: ru ? "Пост" : "Fast",
    day: ru ? "День" : "Day",
    overview: ru ? "ОБЗОР СЕЗОНА" : "Season Overview",
  };

  const nav = (dir) => setSelected(s => { const n = s + dir; if (n < 0) return data.length - 1; if (n >= data.length) return 0; return n; });

  return (
    <div className="page" style={{ minHeight: "100vh", background: "linear-gradient(165deg, #1A0E2E 0%, #2D1B4E 25%, #3D2460 45%, #2D1B4E 70%, #1A0E2E 100%)", fontFamily: "'Outfit', sans-serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Amiri:wght@400;700&family=Dancing+Script:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; height: 100%; }
        body { background: #1A0E2E; overflow-x: hidden; }
        @keyframes floatUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeScale { from { opacity: 0; transform: scale(0.985); } to { opacity: 1; transform: scale(1); } }
        @keyframes softPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 0.7; } }

        
        .page { width: 100vw; display: flex; justify-content: center; overflow-x: hidden; }

        .balo-bg-orbs {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background:
            radial-gradient(600px circle at 20% 30%, rgba(184,138,222,0.08), transparent),
            radial-gradient(500px circle at 80% 60%, rgba(224,112,112,0.05), transparent),
            radial-gradient(400px circle at 50% 80%, rgba(91,160,217,0.06), transparent);
        }

        .wrap { position: relative; z-index: 1; width: 100%; max-width: 720px; margin: 0 auto; padding: 28px 16px 48px; }

        .glass-card {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          box-shadow:
            0 4px 16px rgba(0,0,0,0.2),
            0 16px 48px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,0.06);
          animation: floatUp 0.8s ease-out;
        }

        .detail-animate { animation: fadeScale 0.6s ease-out; will-change: opacity, transform; }
        .view-fade { animation: fadeScale 0.7s ease-out; will-change: opacity, transform; }
        .page-fade > * { animation: floatUp 0.9s ease-out; animation-fill-mode: both; }
        .page-fade > *:nth-child(1) { animation-delay: 0.00s; }
        .page-fade > *:nth-child(2) { animation-delay: 0.05s; }
        .page-fade > *:nth-child(3) { animation-delay: 0.10s; }
        .page-fade > *:nth-child(4) { animation-delay: 0.15s; }

        .pill-wrap {
          display: inline-flex; border-radius: 100px; padding: 3px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(8px);
        }

        .pill-btn {
          padding: 7px 14px; border: none; border-radius: 100px;
          font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 500;
          letter-spacing: 0.5px; cursor: pointer; transition: all 0.3s;
          background: transparent; color: rgba(255,255,255,0.4);
        }

        .pill-btn.on {
          background: linear-gradient(135deg, #B88ADE, #8B5FBF);
          color: #fff; box-shadow: 0 2px 12px rgba(184,138,222,0.4);
        }

        .vpill {
          padding: 5px 14px; border: none; border-radius: 100px;
          font-family: 'Outfit', sans-serif; font-size: 10px; font-weight: 500;
          letter-spacing: 1px; text-transform: uppercase; cursor: pointer;
          transition: all 0.3s; background: transparent; color: rgba(255,255,255,0.3);
        }

        .vpill.on {
          background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.85);
          box-shadow: 0 1px 8px rgba(184,138,222,0.15);
        }

        .nav-btn {
          width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05); backdrop-filter: blur(8px); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; color: rgba(255,255,255,0.6); transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .nav-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

        .prayer-chip {
          text-align: center; padding: 10px 4px; border-radius: 14px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.2s;
        }
        .prayer-chip:hover { background: rgba(255,255,255,0.07); }

        .time-hero {
          flex: 1; padding: 18px 10px; border-radius: 18px; text-align: center;
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(8px); position: relative; overflow: hidden;
        }

        .cmp-card {
          padding: 18px; border-radius: 20px;
          background: rgba(255,255,255,0.04); backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .cmp-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        .list-item {
          display: grid; grid-template-columns: 36px 1fr 78px 78px 56px;
          align-items: center; padding: 10px 12px; cursor: pointer;
          border-radius: 14px; transition: all 0.2s; gap: 4px;
        }
        .list-item:hover { background: rgba(184,138,222,0.08); }
        .list-item.sel { background: rgba(184,138,222,0.15); box-shadow: inset 3px 0 0 #B88ADE; }
        .list-item.odd { background: rgba(184,138,222,0.05); }

        @media (max-width: 600px) {
          .wrap { padding: 16px 10px 40px; }
          .glass-card { border-radius: 20px; }
          .list-item { grid-template-columns: 30px 1fr 62px 62px 48px; padding: 8px 8px; }
        }
        @media (min-width: 900px) {
          .wrap { width: min(100%, 900px); padding: 36px 24px 72px; }
          .glass-card { border-radius: 28px; }
          .list-item { grid-template-columns: 44px 1fr 96px 96px 64px; }
          .time-hero { padding: 22px 14px; }
          .prayer-chip { padding: 12px 6px; }
        }

      `}</style>

      <div className="balo-bg-orbs" />

      <div className="wrap page-fade">
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 24, animation: "floatUp 0.6s ease-out" }}>
          {/* balo wordmark */}
          <div style={{
            fontFamily: "'Dancing Script', cursive", fontSize: 36, fontWeight: 700,
            color: "#fff", marginBottom: 14, letterSpacing: 1,
            textShadow: "0 2px 20px rgba(184,138,222,0.3)",
          }}>
            balo
          </div>
          <div style={{
            fontFamily: "'Amiri', serif", fontSize: 44, color: "rgba(255,255,255,0.9)",
            lineHeight: 1, marginBottom: 12,
            textShadow: "0 2px 30px rgba(184,138,222,0.2)",
          }}>
            رمضان كريم
          </div>
          <div style={{
            fontFamily: "'Outfit'", fontSize: 13, fontWeight: 300,
            color: "rgba(255,255,255,0.45)", letterSpacing: 4, marginBottom: 6,
          }}>
            {L.mubarak}
          </div>
          <div style={{
            fontFamily: "'Outfit'", fontSize: 10, fontWeight: 300,
            letterSpacing: 3, color: "rgba(184,138,222,0.5)",
          }}>
            1447 AH · 2026
          </div>
        </div>

        {/* CONTROLS */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
          <div className="pill-wrap">
            <button className={`pill-btn ${city==="roc"?"on":""}`} onClick={() => setCity("roc")}>🇺🇸 Rochester</button>
            <button className={`pill-btn ${city==="kos"?"on":""}`} onClick={() => setCity("kos")}>🇽🇰 Pristina</button>
            <button className={`pill-btn ${city==="tas"?"on":""}`} onClick={() => setCity("tas")}>🇺🇿 Ташкент</button>
          </div>
          <div className="pill-wrap">
            <button className={`vpill ${view==="crescent"?"on":""}`} onClick={() => setView("crescent")}>{L.crescent}</button>
            <button className={`vpill ${view==="list"?"on":""}`} onClick={() => setView("list")}>{L.list}</button>
            <button className={`vpill ${view==="compare"?"on":""}`} onClick={() => setView("compare")}>{L.compare}</button>
          </div>
        </div>

        {/* ═══ CRESCENT VIEW ═══ */}
        {view === "crescent" && (
          <div>
            <div className="glass-card" style={{ padding: "16px 10px 8px", marginBottom: 14 }}>
              <div style={{ textAlign: "center", marginBottom: 2 }}>
                <span style={{ fontFamily: "'Outfit'", fontSize: 9, fontWeight: 500, letterSpacing: 2, color: "rgba(184,138,222,0.6)", textTransform: "uppercase" }}>
                  {city === "roc" ? "Rochester, NY · ISNA 15°/15°" : city === "kos" ? "Pristina, Kosovo · BIK Official" : "Ташкент, Узбекистан · Духовное управление"}
                </span>
              </div>
              <CrescentArc data={data} selected={selected} onSelect={(i) => setSelected(i ?? 0)} />
              <div style={{ textAlign: "center", paddingBottom: 4 }}>
                <span style={{ fontFamily: "'Outfit'", fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: 1.5, textTransform: "uppercase" }}>
                  {L.tapHint}
                </span>
              </div>
            </div>

            {/* DETAIL */}
            <div className="glass-card detail-animate" key={`${city}-${selected}`} style={{ padding: "24px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
                <button className="nav-btn" onClick={() => nav(-1)}>‹</button>
                <div style={{ textAlign: "center", position: "relative" }}>
                  {/* Wave aura around day number */}
                  <div style={{ position: "relative", display: "inline-block", width: 80, height: 80, marginBottom: 4 }}>
                    <WaveAura size={120} color={[21,23,25,27,29].includes(d.day) ? "#E8C170" : "#B88ADE"} rings={3} />
                    <div style={{
                      position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{
                        fontFamily: "'Outfit'", fontSize: 40, fontWeight: 200, color: "#fff",
                      }}>{d.day}</span>
                    </div>
                  </div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>
                    {d.date} · {d.wd}
                  </div>
                  {[21,23,25,27,29].includes(d.day) && (
                    <div style={{ fontFamily: "'Outfit'", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "#E8C170", marginTop: 4, textTransform: "uppercase" }}>
                      {d.day === 27 ? L.lq : L.seekLq}
                    </div>
                  )}
                  {d.note && (
                    <div style={{ display: "inline-block", marginTop: 6, padding: "3px 12px", borderRadius: 20, background: "rgba(224,112,112,0.12)", border: "1px solid rgba(224,112,112,0.2)", fontFamily: "'Outfit'", fontSize: 9, fontWeight: 600, color: "#E07070" }}>
                      ⚠ {d.note} — Clocks forward 1hr
                    </div>
                  )}
                </div>
                <button className="nav-btn" onClick={() => nav(1)}>›</button>
              </div>

              {/* Suhoor / Iftar */}
              <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                <div className="time-hero" style={{ background: "rgba(91,160,217,0.06)" }}>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "#5BA0D9", marginBottom: 6, textTransform: "uppercase" }}>{L.suhoor}</div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 28, fontWeight: 200, color: "#5BA0D9" }}>{d.su}</div>
                </div>
                <div className="time-hero" style={{ background: "rgba(184,138,222,0.08)" }}>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "#B88ADE", marginBottom: 6, textTransform: "uppercase" }}>{L.iftar}</div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 28, fontWeight: 200, color: "#E8C170" }}>{d.if}</div>
                </div>
              </div>

              {/* Fasting bar */}
              <FastingBar su={d.su} ift={d.if} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, marginBottom: 16 }}>
                <span style={{ fontFamily: "'Outfit'", fontSize: 9, color: "#5BA0D9", fontWeight: 500 }}>{L.dawn}</span>
                <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 300, fontStyle: "italic" }}>{fastStr(mins)} {L.fasting}</span>
                <span style={{ fontFamily: "'Outfit'", fontSize: 9, color: "#E8C170", fontWeight: 500 }}>{L.sunset}</span>
              </div>

              {/* Prayers */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
                {[
                  { l: L.fajr, t: d.fj, c: "#5BA0D9" },
                  { l: L.dhuhr, t: d.dh, c: "rgba(255,255,255,0.6)" },
                  { l: L.asr, t: d.as, c: "rgba(255,255,255,0.6)" },
                  { l: L.maghrib, t: d.mg, c: "#E8C170" },
                  { l: L.isha, t: d.is, c: "#B88ADE" },
                ].map((p, i) => (
                  <div className="prayer-chip" key={i}>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 8, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>{p.l}</div>
                    <div style={{ fontFamily: "'Outfit'", fontSize: 13, fontWeight: 300, color: p.c }}>{p.t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ LIST VIEW ═══ */}
        {view === "list" && (
          <div className="glass-card view-fade" style={{ padding: "14px 6px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "36px 1fr 78px 78px 56px", padding: "0 12px 8px", gap: 4 }}>
              {["", L.date, L.suhoor, L.iftar, L.fast].map((h, i) => (
                <span key={i} style={{ fontFamily: "'Outfit'", fontSize: 9, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", color: i===2 ? "#5BA0D9" : i===3 ? "#E8C170" : "rgba(255,255,255,0.25)" }}>{h}</span>
              ))}
            </div>
            <div style={{ maxHeight: 500, overflowY: "auto" }}>
              {data.map((item, i) => (
                <div key={i}
                  className={`list-item ${selected===i?"sel":[21,23,25,27,29].includes(item.day)?"odd":""}`}
                  onClick={() => { setSelected(i); setView("crescent"); }}>
                  <span style={{ fontFamily: "'Outfit'", fontSize: 15, color: "#B88ADE", textAlign: "center", fontWeight: 300 }}>{item.day}</span>
                  <div>
                    <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{item.date}</span>
                    <span style={{ fontFamily: "'Outfit'", fontSize: 10, color: "rgba(255,255,255,0.3)", marginLeft: 6 }}>{item.wd}</span>
                    {item.day===27 && <span style={{ fontSize: 8, color: "#E8C170", fontWeight: 700, marginLeft: 6, letterSpacing: 0.5 }}>LQ</span>}
                    {item.note && <span style={{ fontSize: 8, color: "#E07070", fontWeight: 700, marginLeft: 6 }}>{item.note}</span>}
                  </div>
                  <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: "#5BA0D9", fontWeight: 400 }}>{item.su}</span>
                  <span style={{ fontFamily: "'Outfit'", fontSize: 12, color: "#E8C170", fontWeight: 500 }}>{item.if}</span>
                  <span style={{ fontFamily: "'Outfit'", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{fastStr(fastMins(item.su, item.if))}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ COMPARE VIEW ═══ */}
        {view === "compare" && (
          <div className="view-fade">
            <div className="glass-card" style={{ padding: 16, marginBottom: 12, textAlign: "center" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
                <button className="nav-btn" onClick={() => nav(-1)}>‹</button>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <WaveAura size={90} color="#B88ADE" rings={2} />
                  <div style={{ fontFamily: "'Outfit'", fontSize: 32, fontWeight: 200, color: "#fff" }}>{L.day} {selected+1}</div>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{ROC[selected]?.date} · {ROC[selected]?.wd}</div>
                </div>
                <button className="nav-btn" onClick={() => nav(1)}>›</button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              {[
                { flag: "🇺🇸", name: "Rochester", d: ROC[selected] },
                { flag: "🇽🇰", name: "Pristina", d: KOS[selected] },
                { flag: "🇺🇿", name: "Tashkent", d: TAS[selected] },
              ].map((c, ci) => (
                <div className="cmp-card" key={ci}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                    <span style={{ fontSize: 16 }}>{c.flag}</span>
                    <span style={{ fontFamily: "'Outfit'", fontSize: 12, fontWeight: 500, color: "#fff" }}>{c.name}</span>
                  </div>
                  {c.d ? [
                    ["Suhoor", c.d.su, "#5BA0D9"],
                    ["Iftar", c.d.if, "#E8C170"],
                    ["Fasting", fastStr(fastMins(c.d.su, c.d.if)), "#B88ADE"],
                  ].map(([l,v,col], i) => (
                    <div className="cmp-row" key={i}>
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{l}</span>
                      <span style={{ fontFamily: "'Outfit'", fontSize: 13, fontWeight: 400, color: col }}>{v}</span>
                    </div>
                  )) : (
                    <div style={{ padding: 16, textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 11 }}>— No data —</div>
                  )}
                  {c.d && <div style={{ marginTop: 6 }}><FastingBar su={c.d.su} ift={c.d.if} /></div>}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="glass-card" style={{ padding: 16, marginTop: 10 }}>
              <div style={{ textAlign: "center", marginBottom: 10 }}>
                <span style={{ fontFamily: "'Outfit'", fontSize: 9, fontWeight: 600, letterSpacing: 2, color: "rgba(184,138,222,0.5)", textTransform: "uppercase" }}>{L.overview}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", alignItems: "start" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>🇺🇸 Rochester</div>
                  {[["Days","30"],["Shortest","12h 1m"],["Longest","13h 23m"],["Method","ISNA"],["Lat","43.16°N"],["DST","Mar 8"]].map(([l,v],i)=>(
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"3px 8px", fontSize:10 }}>
                      <span style={{ color:"rgba(255,255,255,0.25)" }}>{l}</span>
                      <span style={{ color:"rgba(255,255,255,0.6)", fontWeight:500 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ width: 1, background: "linear-gradient(rgba(184,138,222,0), rgba(184,138,222,0.2), rgba(184,138,222,0))", alignSelf: "stretch", margin: "0 4px" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>🇽🇰 Pristina</div>
                  {[["Days","29"],["Shortest","12h 32m"],["Longest","13h 51m"],["Method","BIK"],["Lat","42.67°N"],["DST","None"]].map(([l,v],i)=>(
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"3px 8px", fontSize:10 }}>
                      <span style={{ color:"rgba(255,255,255,0.25)" }}>{l}</span>
                      <span style={{ color:"rgba(255,255,255,0.6)", fontWeight:500 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ width: 1, background: "linear-gradient(rgba(184,138,222,0), rgba(184,138,222,0.2), rgba(184,138,222,0))", alignSelf: "stretch", margin: "0 4px" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Outfit'", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>🇺🇿 Tashkent</div>
                  {[["Days","29"],["Shortest","12h 20m"],["Longest","13h 38m"],["Method","Muslim Board"],["Lat","41.31°N"],["DST","None"]].map(([l,v],i)=>(
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"3px 8px", fontSize:10 }}>
                      <span style={{ color:"rgba(255,255,255,0.25)" }}>{l}</span>
                      <span style={{ color:"rgba(255,255,255,0.6)", fontWeight:500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: 22, color: "rgba(255,255,255,0.3)", marginBottom: 10 }}>balo</div>
          <div style={{ fontFamily: "'Outfit'", fontSize: 11, fontWeight: 300, color: "rgba(255,255,255,0.25)", letterSpacing: 2, lineHeight: 1.6, maxWidth: 340, margin: "0 auto" }}>
            Reimagining digital experience through design.
          </div>
          <div style={{ marginTop: 12, fontFamily: "'Outfit'", fontSize: 9, fontWeight: 500, letterSpacing: 3, color: "rgba(184,138,222,0.35)", textTransform: "uppercase" }}>
            Made with ♡ by GIOIA
          </div>
        </div>
      </div>
    </div>
  );
}
