"use client";

import React, { useState, useMemo, useRef, useCallback } from "react";
import {
  Box,
  RotateCcw,
  Move,
  Compass,
  Plus,
  Trash2,
  Scissors,
} from "lucide-react";

export type SolidShapeType =
  | "PYRAMID_QUAD"
  | "PYRAMID_TRI"
  | "CUBOID"
  | "PRISM_TRI"
  | "SPHERE"
  | "CONE"
  | "CYLINDER";

export interface CustomLine3D {
  id: string;
  name: string;
  p1: { x: number; y: number; z: number; label?: string };
  p2: { x: number; y: number; z: number; label?: string };
  color: string;
  isDashed: boolean;
  length: number;
}

export default function SpatialGeometry3DLab() {
  // Tabs: "solids" (Khối đa diện & Tròn xoay 3D) vs "analytic" (Phương trình mặt phẳng & Khoảng cách)
  const [activeTab, setActiveTab] = useState<"solids" | "analytic">("solids");

  // --- TAB 1: 3D SOLID SHAPES STATE ---
  const [shapeType, setShapeType] = useState<SolidShapeType>("SPHERE");
  const [baseA, setBaseA] = useState<number>(4);
  const [heightH, setHeightH] = useState<number>(5);

  // 3D View Angles
  const [yaw, setYaw] = useState<number>(40);
  const [pitch, setPitch] = useState<number>(20);
  const [zoom, setZoom] = useState<number>(28);
  const [showHiddenEdges, setShowHiddenEdges] = useState<boolean>(true);
  const [showHeightLine, setShowHeightLine] = useState<boolean>(true);

  // --- FEATURE: VẼ THÊM ĐƯỜNG VÀ HÌNH KHÁC ---
  const [customLines, setCustomLines] = useState<CustomLine3D[]>([]);
  const [showAddLinePanel, setShowAddLinePanel] = useState<boolean>(false);
  const [lineSourceP1, setLineSourceP1] = useState<string>("A");
  const [lineSourceP2, setLineSourceP2] = useState<string>("C");
  const [customCoordP1, setCustomCoordP1] = useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });
  const [customCoordP2, setCustomCoordP2] = useState<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });
  const [useCustomCoordP1, setUseCustomCoordP1] = useState<boolean>(false);
  const [useCustomCoordP2, setUseCustomCoordP2] = useState<boolean>(false);
  const [newLineColor, setNewLineColor] = useState<string>("#f59e0b");
  const [newLineDashed, setNewLineDashed] = useState<boolean>(true);

  // Additional Co-existing Shapes / Overlays
  const [showCircumscribedSphere, setShowCircumscribedSphere] = useState<boolean>(false);
  const [showSlicingPlane, setShowSlicingPlane] = useState<boolean>(false);
  const [slicingZ, setSlicingZ] = useState<number>(2.5);
  const [showCoordinateAxes, setShowCoordinateAxes] = useState<boolean>(false);

  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // --- TAB 2: ANALYTIC OXYZ PLANES & DISTANCE STATE ---
  const [planeA, setPlaneA] = useState<number>(2);
  const [planeB, setPlaneB] = useState<number>(-1);
  const [planeC, setPlaneC] = useState<number>(2);
  const [planeD, setPlaneD] = useState<number>(-6);

  const [pointM, setPointM] = useState<{ x: number; y: number; z: number }>({ x: 1, y: 2, z: 3 });

  const [planeQ, setPlaneQ] = useState<{ a: number; b: number; c: number; d: number }>({
    a: 1,
    b: 2,
    c: -2,
    d: 3,
  });

  // Solid Geometry Calculations
  const solidMetrics = useMemo(() => {
    const a = baseA;
    const h = heightH;

    let baseArea = 0;
    let volume = 0;
    let lateralArea = 0;
    let totalArea = 0;
    let name = "";
    let formulaNote = "";

    if (shapeType === "SPHERE") {
      // Sphere of radius R = a
      const R = a;
      name = `Hình Cầu & Mặt Cầu Bán Kính R = ${R}`;
      baseArea = Math.PI * Math.pow(R, 2); // Great circle area
      lateralArea = 4 * Math.PI * Math.pow(R, 2); // Sphere surface area S = 4pi R^2
      totalArea = lateralArea;
      volume = (4 / 3) * Math.PI * Math.pow(R, 3); // V = 4/3 pi R^3
      formulaNote = `Mặt cầu: S = 4πR² = ${(4 * Math.pow(R, 2)).toFixed(1)}π • Thể tích: V = ⁴⁄₃πR³ = ${((4 / 3) * Math.pow(R, 3)).toFixed(1)}π`;
    } else if (shapeType === "PYRAMID_TRI") {
      name = "Hình chóp tam giác đều S.ABC";
      baseArea = (Math.sqrt(3) / 4) * Math.pow(a, 2);
      volume = (1 / 3) * baseArea * h;
      const rIn = (a * Math.sqrt(3)) / 6;
      const slantHeight = Math.sqrt(h * h + rIn * rIn);
      lateralArea = 3 * (0.5 * a * slantHeight);
      totalArea = lateralArea + baseArea;
      formulaNote = "V = ⅓ • S_đáy • h • Đáy là tam giác đều cạnh a";
    } else if (shapeType === "PYRAMID_QUAD") {
      name = "Hình chóp tứ giác đều S.ABCD";
      baseArea = Math.pow(a, 2);
      volume = (1 / 3) * baseArea * h;
      const slantHeight = Math.sqrt(h * h + Math.pow(a / 2, 2));
      lateralArea = 4 * (0.5 * a * slantHeight);
      totalArea = lateralArea + baseArea;
      formulaNote = "V = ⅓ • a² • h • Đáy là hình vuông tâm O cạnh a";
    } else if (shapeType === "PRISM_TRI") {
      name = "Hình lăng trụ tam giác đều ABC.A'B'C'";
      baseArea = (Math.sqrt(3) / 4) * Math.pow(a, 2);
      volume = baseArea * h;
      lateralArea = 3 * (a * h);
      totalArea = lateralArea + 2 * baseArea;
      formulaNote = "V = S_đáy • h • Các mặt bên là hình chữ nhật a x h";
    } else if (shapeType === "CUBOID") {
      name = a === h ? "Hình lập phương ABCD.A'B'C'D'" : "Hình hộp chữ nhật ABCD.A'B'C'D'";
      baseArea = Math.pow(a, 2);
      volume = baseArea * h;
      lateralArea = 4 * (a * h);
      totalArea = lateralArea + 2 * baseArea;
      formulaNote = a === h ? "V = a³ • S_tp = 6a²" : "V = a • b • h";
    } else if (shapeType === "CONE") {
      const r = a / 2;
      const slantHeight = Math.sqrt(r * r + h * h);
      name = `Hình nón tròn xoay (r = ${r}, h = ${h}, l = ${slantHeight.toFixed(2)})`;
      baseArea = Math.PI * Math.pow(r, 2);
      lateralArea = Math.PI * r * slantHeight;
      totalArea = lateralArea + baseArea;
      volume = (1 / 3) * baseArea * h;
      formulaNote = "V = ⅓πr²h • S_xq = πrl • S_tp = πrl + πr²";
    } else if (shapeType === "CYLINDER") {
      const r = a / 2;
      name = `Hình trụ tròn xoay (r = ${r}, h = ${h})`;
      baseArea = Math.PI * Math.pow(r, 2);
      lateralArea = 2 * Math.PI * r * h;
      totalArea = lateralArea + 2 * baseArea;
      volume = baseArea * h;
      formulaNote = "V = πr²h • S_xq = 2πrh • S_tp = 2πrh + 2πr²";
    }

    return {
      name,
      baseArea,
      volume,
      lateralArea,
      totalArea,
      formulaNote,
    };
  }, [shapeType, baseA, heightH]);

  // Analytic Calculations
  const analyticMetrics = useMemo(() => {
    const normP = Math.sqrt(planeA * planeA + planeB * planeB + planeC * planeC);
    let distM = 0;
    if (normP > 1e-9) {
      distM = Math.abs(planeA * pointM.x + planeB * pointM.y + planeC * pointM.z + planeD) / normP;
    }

    const normQ = Math.sqrt(planeQ.a * planeQ.a + planeQ.b * planeQ.b + planeQ.c * planeQ.c);
    let cosAlpha = 0;
    let angleDeg = 0;
    if (normP > 1e-9 && normQ > 1e-9) {
      const dotPQ = Math.abs(planeA * planeQ.a + planeB * planeQ.b + planeC * planeQ.c);
      cosAlpha = Math.min(1, dotPQ / (normP * normQ));
      angleDeg = (Math.acos(cosAlpha) * 180) / Math.PI;
    }

    return {
      distM,
      normP,
      cosAlpha,
      angleDeg,
    };
  }, [planeA, planeB, planeC, planeD, pointM, planeQ]);

  // Canvas Settings
  const SVG_W = 540;
  const SVG_H = 340;
  const centerX = SVG_W / 2;
  const centerY = SVG_H / 2;

  // 3D Projection Algorithm
  const project3D = useCallback(
    (x: number, y: number, z: number) => {
      const radYaw = (yaw * Math.PI) / 180;
      const radPitch = (pitch * Math.PI) / 180;

      // Rotate around Z axis (yaw)
      const x1 = x * Math.cos(radYaw) - y * Math.sin(radYaw);
      const y1 = x * Math.sin(radYaw) + y * Math.cos(radYaw);
      const z1 = z;

      // Rotate around X axis (pitch)
      const y2 = y1 * Math.cos(radPitch) - z1 * Math.sin(radPitch);
      const z2 = y1 * Math.sin(radPitch) + z1 * Math.cos(radPitch);

      // Screen projection
      const screenX = centerX + x1 * zoom;
      const screenY = centerY - z2 * zoom; // Invert Y for SVG coordinates

      return { x: screenX, y: screenY, depth: y2 };
    },
    [yaw, pitch, zoom, centerX, centerY]
  );

  // Mouse drag handlers for 360 rotation
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;

    setYaw((prev) => (prev + dx * 0.7) % 360);
    setPitch((prev) => Math.max(-85, Math.min(85, prev + dy * 0.7)));

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Touch drag handlers for 360 rotation on mobile
  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 0) return;
    isDragging.current = true;
    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (!isDragging.current || e.touches.length === 0) return;
    const dx = e.touches[0].clientX - lastMousePos.current.x;
    const dy = e.touches[0].clientY - lastMousePos.current.y;

    setYaw((prev) => (prev + dx * 0.7) % 360);
    setPitch((prev) => Math.max(-85, Math.min(85, prev + dy * 0.7)));

    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  // Generate Vertices & Edges for each Solid
  const solid3DData = useMemo(() => {
    const a = baseA;
    const h = heightH;
    const r = a / 2;

    interface V3 {
      name: string;
      x: number;
      y: number;
      z: number;
    }
    interface Edge3 {
      u: string;
      v: string;
      isHidden?: boolean;
    }

    let vertices: V3[] = [];
    let edges: Edge3[] = [];
    let apex: V3 | null = null;
    let centerO: V3 | null = null;

    if (shapeType === "SPHERE") {
      // Sphere: Center I(0, 0, 0), North Pole N(0, 0, a), South Pole S(0, 0, -a)
      // Equator point M(a, 0, 0)
      vertices = [
        { name: "I", x: 0, y: 0, z: 0 },
        { name: "N", x: 0, y: 0, z: a },
        { name: "S", x: 0, y: 0, z: -a },
        { name: "M", x: a, y: 0, z: 0 },
      ];
      edges = [
        { u: "I", v: "M" }, // Radius line IM
        { u: "S", v: "N", isHidden: true }, // Polar Axis NS
      ];
      centerO = vertices[0];
    } else if (shapeType === "PYRAMID_QUAD") {
      vertices = [
        { name: "A", x: -r, y: -r, z: 0 },
        { name: "B", x: r, y: -r, z: 0 },
        { name: "C", x: r, y: r, z: 0 },
        { name: "D", x: -r, y: r, z: 0 },
        { name: "S", x: 0, y: 0, z: h },
      ];
      edges = [
        { u: "A", v: "B" },
        { u: "B", v: "C" },
        { u: "C", v: "D", isHidden: true },
        { u: "D", v: "A", isHidden: true },
        { u: "S", v: "A" },
        { u: "S", v: "B" },
        { u: "S", v: "C" },
        { u: "S", v: "D", isHidden: true },
      ];
      apex = vertices[4];
      centerO = { name: "O", x: 0, y: 0, z: 0 };
    } else if (shapeType === "PYRAMID_TRI") {
      const rCirc = (a * Math.sqrt(3)) / 3;
      const rIn = (a * Math.sqrt(3)) / 6;

      vertices = [
        { name: "A", x: -a / 2, y: -rIn, z: 0 },
        { name: "B", x: a / 2, y: -rIn, z: 0 },
        { name: "C", x: 0, y: rCirc, z: 0 },
        { name: "S", x: 0, y: 0, z: h },
      ];
      edges = [
        { u: "A", v: "B" },
        { u: "B", v: "C" },
        { u: "C", v: "A", isHidden: true },
        { u: "S", v: "A" },
        { u: "S", v: "B" },
        { u: "S", v: "C" },
      ];
      apex = vertices[3];
      centerO = { name: "O", x: 0, y: 0, z: 0 };
    } else if (shapeType === "CUBOID") {
      vertices = [
        { name: "A", x: -r, y: -r, z: 0 },
        { name: "B", x: r, y: -r, z: 0 },
        { name: "C", x: r, y: r, z: 0 },
        { name: "D", x: -r, y: r, z: 0 },
        { name: "A'", x: -r, y: -r, z: h },
        { name: "B'", x: r, y: -r, z: h },
        { name: "C'", x: r, y: r, z: h },
        { name: "D'", x: -r, y: r, z: h },
      ];
      edges = [
        { u: "A", v: "B" },
        { u: "B", v: "C" },
        { u: "C", v: "D", isHidden: true },
        { u: "D", v: "A", isHidden: true },
        { u: "A'", v: "B'" },
        { u: "B'", v: "C'" },
        { u: "C'", v: "D'" },
        { u: "D'", v: "A'" },
        { u: "A", v: "A'" },
        { u: "B", v: "B'" },
        { u: "C", v: "C'" },
        { u: "D", v: "D'", isHidden: true },
      ];
      centerO = { name: "O", x: 0, y: 0, z: 0 };
    } else if (shapeType === "PRISM_TRI") {
      const rCirc = (a * Math.sqrt(3)) / 3;
      const rIn = (a * Math.sqrt(3)) / 6;

      vertices = [
        { name: "A", x: -a / 2, y: -rIn, z: 0 },
        { name: "B", x: a / 2, y: -rIn, z: 0 },
        { name: "C", x: 0, y: rCirc, z: 0 },
        { name: "A'", x: -a / 2, y: -rIn, z: h },
        { name: "B'", x: a / 2, y: -rIn, z: h },
        { name: "C'", x: 0, y: rCirc, z: h },
      ];
      edges = [
        { u: "A", v: "B" },
        { u: "B", v: "C" },
        { u: "C", v: "A", isHidden: true },
        { u: "A'", v: "B'" },
        { u: "B'", v: "C'" },
        { u: "C'", v: "A'" },
        { u: "A", v: "A'" },
        { u: "B", v: "B'" },
        { u: "C", v: "C'" },
      ];
      centerO = { name: "O", x: 0, y: 0, z: 0 };
    } else if (shapeType === "CONE") {
      vertices = [
        { name: "O", x: 0, y: 0, z: 0 },
        { name: "S", x: 0, y: 0, z: h },
        { name: "A", x: -r, y: 0, z: 0 },
        { name: "B", x: r, y: 0, z: 0 },
      ];
      edges = [
        { u: "S", v: "A" },
        { u: "S", v: "B" },
        { u: "O", v: "B", isHidden: true },
      ];
      apex = vertices[1];
      centerO = vertices[0];
    } else if (shapeType === "CYLINDER") {
      vertices = [
        { name: "O₁", x: 0, y: 0, z: 0 },
        { name: "O₂", x: 0, y: 0, z: h },
        { name: "A", x: -r, y: 0, z: 0 },
        { name: "B", x: r, y: 0, z: 0 },
        { name: "A'", x: -r, y: 0, z: h },
        { name: "B'", x: r, y: 0, z: h },
      ];
      edges = [
        { u: "A", v: "A'" },
        { u: "B", v: "B'" },
        { u: "O₁", v: "O₂", isHidden: true },
        { u: "O₁", v: "B", isHidden: true },
        { u: "O₂", v: "B'" },
      ];
      centerO = vertices[0];
    }

    return { vertices, edges, apex, centerO };
  }, [shapeType, baseA, heightH]);

  // Helper to resolve coordinates from vertex name or custom input
  const getPointCoords = useCallback(
    (choice: string, customCoord: { x: number; y: number; z: number }, isCustom: boolean) => {
      if (isCustom) return customCoord;
      const v = solid3DData.vertices.find((item) => item.name === choice);
      if (v) return { x: v.x, y: v.y, z: v.z };
      if (solid3DData.centerO && solid3DData.centerO.name === choice) {
        return { x: solid3DData.centerO.x, y: solid3DData.centerO.y, z: solid3DData.centerO.z };
      }
      return { x: 0, y: 0, z: 0 };
    },
    [solid3DData]
  );

  // Add custom line handler
  const handleAddCustomLine = () => {
    const p1Coords = getPointCoords(lineSourceP1, customCoordP1, useCustomCoordP1);
    const p2Coords = getPointCoords(lineSourceP2, customCoordP2, useCustomCoordP2);

    const length = Math.sqrt(
      Math.pow(p2Coords.x - p1Coords.x, 2) +
      Math.pow(p2Coords.y - p1Coords.y, 2) +
      Math.pow(p2Coords.z - p1Coords.z, 2)
    );

    const label1 = useCustomCoordP1 ? `(${p1Coords.x},${p1Coords.y},${p1Coords.z})` : lineSourceP1;
    const label2 = useCustomCoordP2 ? `(${p2Coords.x},${p2Coords.y},${p2Coords.z})` : lineSourceP2;

    const newLine: CustomLine3D = {
      id: "line_" + Date.now(),
      name: `Đoạn ${label1}-${label2}`,
      p1: { ...p1Coords, label: label1 },
      p2: { ...p2Coords, label: label2 },
      color: newLineColor,
      isDashed: newLineDashed,
      length,
    };

    setCustomLines((prev) => [...prev, newLine]);
    setShowAddLinePanel(false);
  };

  // Quick preset additions
  const handleQuickAddDiagonal = (type: "baseAC" | "baseBD" | "bodyDiag" | "sideHeight" | "sphereDiam") => {
    if (type === "baseAC") {
      const vA = solid3DData.vertices.find((v) => v.name === "A");
      const vC = solid3DData.vertices.find((v) => v.name === "C");
      if (vA && vC) {
        const length = Math.sqrt(Math.pow(vC.x - vA.x, 2) + Math.pow(vC.y - vA.y, 2) + Math.pow(vC.z - vA.z, 2));
        setCustomLines((prev) => [
          ...prev,
          {
            id: "diag_AC_" + Date.now(),
            name: "Đường chéo đáy AC",
            p1: { x: vA.x, y: vA.y, z: vA.z, label: "A" },
            p2: { x: vC.x, y: vC.y, z: vC.z, label: "C" },
            color: "#f59e0b",
            isDashed: true,
            length,
          },
        ]);
      }
    } else if (type === "baseBD") {
      const vB = solid3DData.vertices.find((v) => v.name === "B");
      const vD = solid3DData.vertices.find((v) => v.name === "D");
      if (vB && vD) {
        const length = Math.sqrt(Math.pow(vD.x - vB.x, 2) + Math.pow(vD.y - vB.y, 2) + Math.pow(vD.z - vB.z, 2));
        setCustomLines((prev) => [
          ...prev,
          {
            id: "diag_BD_" + Date.now(),
            name: "Đường chéo đáy BD",
            p1: { x: vB.x, y: vB.y, z: vB.z, label: "B" },
            p2: { x: vD.x, y: vD.y, z: vD.z, label: "D" },
            color: "#ec4899",
            isDashed: true,
            length,
          },
        ]);
      }
    } else if (type === "bodyDiag") {
      const vA = solid3DData.vertices.find((v) => v.name === "A'");
      const vC = solid3DData.vertices.find((v) => v.name === "C");
      if (vA && vC) {
        const length = Math.sqrt(Math.pow(vC.x - vA.x, 2) + Math.pow(vC.y - vA.y, 2) + Math.pow(vC.z - vA.z, 2));
        setCustomLines((prev) => [
          ...prev,
          {
            id: "diag_body_" + Date.now(),
            name: "Đường chéo không gian A'C",
            p1: { x: vA.x, y: vA.y, z: vA.z, label: "A'" },
            p2: { x: vC.x, y: vC.y, z: vC.z, label: "C" },
            color: "#a855f7",
            isDashed: true,
            length,
          },
        ]);
      }
    } else if (type === "sphereDiam") {
      const R = baseA;
      setCustomLines((prev) => [
        ...prev,
        {
          id: "sphere_diam_" + Date.now(),
          name: "Đường kính xích đạo W-E",
          p1: { x: -R, y: 0, z: 0, label: "W" },
          p2: { x: R, y: 0, z: 0, label: "E" },
          color: "#10b981",
          isDashed: true,
          length: 2 * R,
        },
      ]);
    }
  };

  const removeCustomLine = (id: string) => {
    setCustomLines((prev) => prev.filter((l) => l.id !== id));
  };

  // Circumscribed sphere metrics
  const circumscribedSphere = useMemo(() => {
    if (shapeType === "CUBOID") {
      const a = baseA;
      const h = heightH;
      const R = Math.sqrt(2 * a * a + h * h) / 2;
      return { R, center: { x: 0, y: 0, z: h / 2 } };
    } else if (shapeType === "PYRAMID_QUAD") {
      const a = baseA;
      const h = heightH;
      const rb = a / Math.sqrt(2);
      const SA = Math.sqrt(h * h + rb * rb);
      const R = (SA * SA) / (2 * h);
      return { R, center: { x: 0, y: 0, z: h - R } };
    }
    return null;
  }, [shapeType, baseA, heightH]);

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-2xl space-y-5">
      {/* 1. Header with Mode Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <Box className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-white">
              Phòng Dựng Hình Học Không Gian 3D, Hình Cầu & Tọa Độ Oxyz
            </h3>
            <p className="text-xs text-slate-400">
              Mô hình xoay 360° (Hình Cầu, Chóp, Lăng Trụ, Nón, Trụ) • Vẽ thêm đường/hình • Tính Toán Giải Tích
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("solids")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "solids"
                ? "bg-cyan-600 text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Mô Hình Không Gian 3D & Khối Cầu</span>
          </button>
          <button
            onClick={() => setActiveTab("analytic")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "analytic"
                ? "bg-cyan-600 text-white shadow-xs"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Mặt Phẳng & Khoảng Cách Oxyz</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: 3D SOLID SHAPES STUDIO & SPHERE */}
      {/* ========================================================================= */}
      {activeTab === "solids" && (
        <div className="space-y-4">
          {/* Shape Selector Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full text-xs py-1">
            <span className="text-slate-400 text-[11px] mr-1 shrink-0">Khối hình mẫu:</span>
            <button
              onClick={() => setShapeType("SPHERE")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                shapeType === "SPHERE"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <span>⚽ Hình Cầu (Sphere)</span>
            </button>
            <button
              onClick={() => setShapeType("PYRAMID_QUAD")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                shapeType === "PYRAMID_QUAD"
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Chóp tứ giác (S.ABCD)
            </button>
            <button
              onClick={() => setShapeType("PYRAMID_TRI")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                shapeType === "PYRAMID_TRI"
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Chóp tam giác (S.ABC)
            </button>
            <button
              onClick={() => setShapeType("CUBOID")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                shapeType === "CUBOID"
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Lập phương / Hộp
            </button>
            <button
              onClick={() => setShapeType("PRISM_TRI")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                shapeType === "PRISM_TRI"
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Lăng trụ tam giác
            </button>
            <button
              onClick={() => setShapeType("CONE")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                shapeType === "CONE"
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Hình nón (Cone)
            </button>
            <button
              onClick={() => setShapeType("CYLINDER")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                shapeType === "CYLINDER"
                  ? "bg-cyan-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Hình trụ (Cylinder)
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* 3D SVG Viewport (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-3 relative shadow-2xl overflow-hidden select-none">
              {/* Overlay Top: Instructions & View Angles */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-800 text-[11px] text-cyan-300 font-mono">
                  <Move className="w-3 h-3" />
                  <span>Kéo chuột xoay 360°</span>
                </div>
                <div className="bg-slate-900/90 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-800 text-[10px] text-slate-400 font-mono hidden sm:block">
                  Yaw: {Math.round(yaw)}° | Pitch: {Math.round(pitch)}°
                </div>
              </div>

              {/* Reset View Button */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                <button
                  onClick={() => setShowCoordinateAxes(!showCoordinateAxes)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                    showCoordinateAxes
                      ? "bg-rose-600/30 text-rose-300 border-rose-500/40"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  }`}
                  title="Hiện/Ẩn trục tọa độ Oxyz"
                >
                  Trục Oxyz
                </button>
                <button
                  onClick={() => {
                    setYaw(40);
                    setPitch(20);
                    setZoom(28);
                  }}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
                  title="Đặt lại góc nhìn"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Toggles Bottom Left */}
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 flex-wrap text-[10px]">
                <button
                  onClick={() => setShowHiddenEdges(!showHiddenEdges)}
                  className={`px-2 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                    showHiddenEdges
                      ? "bg-cyan-600/20 text-cyan-300 border-cyan-500/30"
                      : "bg-slate-900 text-slate-500 border-slate-800"
                  }`}
                >
                  Nét đứt cạnh khuất
                </button>
                {solid3DData.apex && (
                  <button
                    onClick={() => setShowHeightLine(!showHeightLine)}
                    className={`px-2 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                      showHeightLine
                        ? "bg-amber-600/20 text-amber-300 border-amber-500/30"
                        : "bg-slate-900 text-slate-500 border-slate-800"
                    }`}
                  >
                    Đường cao SO
                  </button>
                )}
                {circumscribedSphere && (
                  <button
                    onClick={() => setShowCircumscribedSphere(!showCircumscribedSphere)}
                    className={`px-2 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                      showCircumscribedSphere
                        ? "bg-purple-600/30 text-purple-200 border-purple-500/50"
                        : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    ⚽ Mặt Cầu Ngoại Tiếp
                  </button>
                )}
                <button
                  onClick={() => setShowSlicingPlane(!showSlicingPlane)}
                  className={`px-2 py-1 rounded-lg font-bold border transition-colors cursor-pointer ${
                    showSlicingPlane
                      ? "bg-emerald-600/30 text-emerald-200 border-emerald-500/50"
                      : "bg-slate-900 text-slate-400 border-slate-800"
                  }`}
                >
                  ✂️ Mặt phẳng cắt (Thiết diện)
                </button>
              </div>

              {/* 3D SVG Canvas */}
              <svg
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                className="w-full h-auto max-h-[380px] cursor-grab active:cursor-grabbing block touch-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <defs>
                  {/* Sphere 3D Realistic Gradient */}
                  <radialGradient id="sphereRealisticGrad" cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.85" />
                    <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.45" />
                    <stop offset="75%" stopColor="#0284c7" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#082f49" stopOpacity="0.75" />
                  </radialGradient>
                  {/* Circumscribed Sphere Gradient */}
                  <radialGradient id="circumSphereGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.35" />
                    <stop offset="80%" stopColor="#9333ea" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#581c87" stopOpacity="0.4" />
                  </radialGradient>
                </defs>

                {/* 1. Coordinate Axes Oxyz if toggled */}
                {showCoordinateAxes && (
                  <g strokeWidth="1.5">
                    {/* Origin O */}
                    {(() => {
                      const pO = project3D(0, 0, 0);
                      const pX = project3D(6, 0, 0);
                      const pY = project3D(0, 6, 0);
                      const pZ = project3D(0, 0, 6);
                      return (
                        <>
                          <line x1={pO.x} y1={pO.y} x2={pX.x} y2={pX.y} stroke="#ef4444" strokeDasharray="3 2" />
                          <text x={pX.x + 4} y={pX.y} fill="#ef4444" fontSize="10" fontWeight="bold">x</text>
                          <line x1={pO.x} y1={pO.y} x2={pY.x} y2={pY.y} stroke="#10b981" strokeDasharray="3 2" />
                          <text x={pY.x + 4} y={pY.y} fill="#10b981" fontSize="10" fontWeight="bold">y</text>
                          <line x1={pO.x} y1={pO.y} x2={pZ.x} y2={pZ.y} stroke="#3b82f6" strokeDasharray="3 2" />
                          <text x={pZ.x} y={pZ.y - 4} fill="#3b82f6" fontSize="10" fontWeight="bold">z</text>
                        </>
                      );
                    })()}
                  </g>
                )}

                {/* 2. SPHERE 3D RENDERING */}
                {shapeType === "SPHERE" && (
                  <g>
                    {(() => {
                      const R = baseA;
                      const pI = project3D(0, 0, 0);
                      const rPixel = R * zoom;

                      // Equator ring: 36 points on horizontal circle z = 0
                      const numPts = 36;
                      const eqPts = [];
                      for (let k = 0; k <= numPts; k++) {
                        const theta = (2 * Math.PI * k) / numPts;
                        const px = R * Math.cos(theta);
                        const py = R * Math.sin(theta);
                        eqPts.push(project3D(px, py, 0));
                      }

                      // Split equator into front (solid) and back (dashed)
                      const frontPts = [];
                      const backPts = [];
                      for (let k = 0; k < numPts; k++) {
                        const theta = (2 * Math.PI * k) / numPts;
                        const p = project3D(R * Math.cos(theta), R * Math.sin(theta), 0);
                        // Depth test
                        if (p.depth > pI.depth) {
                          backPts.push(p);
                        } else {
                          frontPts.push(p);
                        }
                      }

                      // Meridian ring: 36 points on vertical circle y = 0
                      const merPts = [];
                      for (let k = 0; k <= numPts; k++) {
                        const phi = (2 * Math.PI * k) / numPts;
                        const px = R * Math.cos(phi);
                        const pz = R * Math.sin(phi);
                        merPts.push(project3D(px, 0, pz));
                      }

                      const pN = project3D(0, 0, R);
                      const pS = project3D(0, 0, -R);
                      const pM = project3D(R, 0, 0);

                      return (
                        <>
                          {/* Sphere Body Silhouette & Shading */}
                          <circle
                            cx={pI.x}
                            cy={pI.y}
                            r={rPixel}
                            fill="url(#sphereRealisticGrad)"
                            stroke="#38bdf8"
                            strokeWidth="2.5"
                          />

                          {/* Polar Axis Line NS */}
                          <line
                            x1={pS.x}
                            y1={pS.y}
                            x2={pN.x}
                            y2={pN.y}
                            stroke="#94a3b8"
                            strokeWidth="1.2"
                            strokeDasharray="4 3"
                          />

                          {/* Equator Ellipse Path */}
                          <path
                            d={eqPts.reduce((acc, p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), "") + " Z"}
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                          />

                          {/* Meridian Ellipse Path */}
                          <path
                            d={merPts.reduce((acc, p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), "") + " Z"}
                            fill="none"
                            stroke="#0284c7"
                            strokeWidth="1.2"
                            strokeDasharray="3 3"
                          />

                          {/* Radius Line IM */}
                          <line
                            x1={pI.x}
                            y1={pI.y}
                            x2={pM.x}
                            y2={pM.y}
                            stroke="#f59e0b"
                            strokeWidth="2"
                          />
                          <text
                            x={(pI.x + pM.x) / 2}
                            y={(pI.y + pM.y) / 2 - 5}
                            fill="#f59e0b"
                            fontSize="11"
                            fontWeight="bold"
                          >
                            R={R}
                          </text>

                          {/* Center point I */}
                          <circle cx={pI.x} cy={pI.y} r="3.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
                          <text x={pI.x - 14} y={pI.y + 4} fill="#fbbf24" fontSize="12" fontWeight="bold">
                            I(0,0,0)
                          </text>

                          {/* North & South Poles */}
                          <circle cx={pN.x} cy={pN.y} r="3.5" fill="#38bdf8" />
                          <text x={pN.x + 6} y={pN.y} fill="#bae6fd" fontSize="11" fontWeight="bold">N</text>
                          <circle cx={pS.x} cy={pS.y} r="3" fill="#64748b" />
                          <text x={pS.x + 6} y={pS.y} fill="#94a3b8" fontSize="11" fontWeight="bold">S</text>
                        </>
                      );
                    })()}
                  </g>
                )}

                {/* 3. Circular Base for Cone or Cylinder */}
                {(shapeType === "CONE" || shapeType === "CYLINDER") && (
                  <g>
                    {(() => {
                      const r = baseA / 2;
                      const numPts = 32;

                      // Bottom base circle at z = 0
                      const basePts = [];
                      for (let k = 0; k <= numPts; k++) {
                        const theta = (2 * Math.PI * k) / numPts;
                        basePts.push(project3D(r * Math.cos(theta), r * Math.sin(theta), 0));
                      }
                      const basePath = basePts.reduce((acc, p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), "") + " Z";

                      // Cylinder top base circle at z = h
                      let topPath = "";
                      if (shapeType === "CYLINDER") {
                        const topPts = [];
                        for (let k = 0; k <= numPts; k++) {
                          const theta = (2 * Math.PI * k) / numPts;
                          topPts.push(project3D(r * Math.cos(theta), r * Math.sin(theta), heightH));
                        }
                        topPath = topPts.reduce((acc, p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), "") + " Z";
                      }

                      return (
                        <>
                          <path d={basePath} fill="none" stroke="#38bdf8" strokeWidth="1.6" strokeDasharray="4 2" />
                          {topPath && <path d={topPath} fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2" />}
                        </>
                      );
                    })()}
                  </g>
                )}

                {/* 4. Slicing Plane Overlay if active */}
                {showSlicingPlane && (
                  <g>
                    {(() => {
                      const size = baseA * 1.2;
                      const p1 = project3D(-size, -size, slicingZ);
                      const p2 = project3D(size, -size, slicingZ);
                      const p3 = project3D(size, size, slicingZ);
                      const p4 = project3D(-size, size, slicingZ);
                      return (
                        <g>
                          <polygon
                            points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`}
                            fill="#10b981"
                            fillOpacity="0.25"
                            stroke="#34d399"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                          />
                          <text x={p3.x + 6} y={p3.y} fill="#6ee7b7" fontSize="10" fontWeight="bold">
                            Mặt phẳng cắt (z = {slicingZ.toFixed(1)})
                          </text>
                        </g>
                      );
                    })()}
                  </g>
                )}

                {/* 5. Circumscribed Sphere Overlay if active */}
                {showCircumscribedSphere && circumscribedSphere && (
                  <g>
                    {(() => {
                      const pCenter = project3D(
                        circumscribedSphere.center.x,
                        circumscribedSphere.center.y,
                        circumscribedSphere.center.z
                      );
                      const rPixel = circumscribedSphere.R * zoom;
                      return (
                        <>
                          <circle
                            cx={pCenter.x}
                            cy={pCenter.y}
                            r={rPixel}
                            fill="url(#circumSphereGrad)"
                            stroke="#c084fc"
                            strokeWidth="1.5"
                            strokeDasharray="5 3"
                          />
                          <circle cx={pCenter.x} cy={pCenter.y} r="3" fill="#c084fc" />
                          <text x={pCenter.x + 6} y={pCenter.y - 4} fill="#e9d5ff" fontSize="10" fontWeight="bold">
                            Tâm I (R={circumscribedSphere.R.toFixed(2)})
                          </text>
                        </>
                      );
                    })()}
                  </g>
                )}

                {/* 6. Standard Edges of the solid */}
                {shapeType !== "SPHERE" &&
                  solid3DData.edges.map((e, idx) => {
                    const v1 = solid3DData.vertices.find((v) => v.name === e.u);
                    const v2 = solid3DData.vertices.find((v) => v.name === e.v);
                    if (!v1 || !v2) return null;

                    const p1 = project3D(v1.x, v1.y, v1.z);
                    const p2 = project3D(v2.x, v2.y, v2.z);
                    const isDashed = e.isHidden && showHiddenEdges;

                    return (
                      <line
                        key={`edge-${idx}`}
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke={e.isHidden ? "#64748b" : "#38bdf8"}
                        strokeWidth={e.isHidden ? 1.2 : 2}
                        strokeDasharray={isDashed ? "5 3" : undefined}
                      />
                    );
                  })}

                {/* 7. Height Line SO if applicable */}
                {showHeightLine && solid3DData.apex && solid3DData.centerO && shapeType !== "SPHERE" && (
                  <>
                    {(() => {
                      const pS = project3D(solid3DData.apex.x, solid3DData.apex.y, solid3DData.apex.z);
                      const pO = project3D(solid3DData.centerO.x, solid3DData.centerO.y, solid3DData.centerO.z);
                      return (
                        <g>
                          <line
                            x1={pS.x}
                            y1={pS.y}
                            x2={pO.x}
                            y2={pO.y}
                            stroke="#f59e0b"
                            strokeWidth="1.8"
                            strokeDasharray="4 2"
                          />
                          <circle cx={pO.x} cy={pO.y} r="3" fill="#f59e0b" />
                          <text x={pO.x + 6} y={pO.y + 4} fill="#fbbf24" fontSize="11" fontWeight="bold">
                            O
                          </text>
                        </g>
                      );
                    })()}
                  </>
                )}

                {/* 8. CUSTOM USER-DRAWN LINES (VẼ THÊM ĐƯỜNG) */}
                {customLines.map((line) => {
                  const p1 = project3D(line.p1.x, line.p1.y, line.p1.z);
                  const p2 = project3D(line.p2.x, line.p2.y, line.p2.z);
                  const midX = (p1.x + p2.x) / 2;
                  const midY = (p1.y + p2.y) / 2;

                  return (
                    <g key={line.id}>
                      <line
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke={line.color}
                        strokeWidth="2.2"
                        strokeDasharray={line.isDashed ? "5 3" : undefined}
                      />
                      {/* Endpoints */}
                      <circle cx={p1.x} cy={p1.y} r="3" fill={line.color} />
                      <circle cx={p2.x} cy={p2.y} r="3" fill={line.color} />
                      {/* Line Label & Length */}
                      <rect
                        x={midX - 24}
                        y={midY - 14}
                        width="48"
                        height="16"
                        rx="4"
                        fill="#020617"
                        fillOpacity="0.85"
                        stroke={line.color}
                        strokeWidth="0.8"
                      />
                      <text
                        x={midX}
                        y={midY - 3}
                        fill={line.color}
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        d={line.length.toFixed(2)}
                      </text>
                    </g>
                  );
                })}

                {/* 9. Vertices & Labels */}
                {solid3DData.vertices.map((v) => {
                  const p = project3D(v.x, v.y, v.z);
                  const isApex = v.name === "S";

                  return (
                    <g key={v.name}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isApex ? 5 : 4}
                        fill={isApex ? "#f97316" : "#38bdf8"}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <text
                        x={p.x + 8}
                        y={p.y - 4}
                        fill={isApex ? "#fdba74" : "#bae6fd"}
                        fontSize="12"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {v.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Slider Controls & Metrics (5 Cols) */}
            <div className="lg:col-span-5 space-y-4 text-xs">
              {/* Sliders Card */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 shadow-md">
                <span className="font-bold text-slate-300 block uppercase tracking-wider text-[11px]">
                  Kích Thước Hình Học:
                </span>

                {/* Primary Dimension (Radius R or Base Edge a) */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-slate-400">
                      {shapeType === "SPHERE" ? "Bán kính mặt cầu R:" : "Cạnh đáy a:"}
                    </span>
                    <span className="font-mono text-cyan-400 font-bold">{baseA}</span>
                  </div>
                  <input
                    type="range"
                    min="1.5"
                    max="6.5"
                    step="0.5"
                    value={baseA}
                    onChange={(e) => setBaseA(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                  />
                </div>

                {/* Height h (only for shapes with height) */}
                {shapeType !== "SPHERE" && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-400">Chiều cao h:</span>
                      <span className="font-mono text-orange-400 font-bold">{heightH}</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="8"
                      step="0.5"
                      value={heightH}
                      onChange={(e) => setHeightH(Number(e.target.value))}
                      className="w-full accent-orange-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                    />
                  </div>
                )}

                {/* Slicing Height if cutting plane is active */}
                {showSlicingPlane && (
                  <div className="pt-2 border-t border-slate-800">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-emerald-400 font-bold">Vị trí lát cắt z:</span>
                      <span className="font-mono text-emerald-300 font-bold">{slicingZ.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min={shapeType === "SPHERE" ? -baseA : 0}
                      max={shapeType === "SPHERE" ? baseA : heightH}
                      step="0.2"
                      value={slicingZ}
                      onChange={(e) => setSlicingZ(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                    />
                  </div>
                )}
              </div>

              {/* Geometric Calculations */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5 font-mono shadow-md">
                <span className="font-bold text-slate-300 block uppercase tracking-wider text-[11px] font-sans">
                  Công Thức & Thể Tích Tính Toán:
                </span>

                <div className="space-y-1.5 text-slate-300">
                  <div className="flex justify-between p-2 bg-slate-900 rounded-xl">
                    <span className="font-sans">
                      {shapeType === "SPHERE" ? "Diện tích hình tròn lớn:" : "Diện tích đáy S_đáy:"}
                    </span>
                    <strong className="text-cyan-400">{solidMetrics.baseArea.toFixed(2)}</strong>
                  </div>

                  <div className="flex justify-between p-2 bg-slate-900 rounded-xl">
                    <span className="font-sans">
                      {shapeType === "SPHERE" ? "Diện tích mặt cầu S_mc:" : "Diện tích xung quanh S_xq:"}
                    </span>
                    <strong className="text-blue-400">{solidMetrics.lateralArea.toFixed(2)}</strong>
                  </div>

                  <div className="flex justify-between p-2.5 bg-cyan-950/40 border border-cyan-800/50 rounded-xl">
                    <span className="font-sans text-cyan-300 font-bold">Thể tích khối V:</span>
                    <strong className="text-cyan-200 text-sm">{solidMetrics.volume.toFixed(2)}</strong>
                  </div>

                  <div className="p-2 bg-slate-900/80 rounded-xl border border-slate-800 text-[10px] text-slate-400 font-sans">
                    {solidMetrics.formulaNote}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* FEATURE: VẼ THÊM ĐƯỜNG PHỤ & HÌNH KHÁC (STUDIO DỰNG HÌNH) */}
          {/* ========================================================================= */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 shadow-md text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Scissors className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                  Xưởng Dựng Thêm Đường Thẳng, Đoạn Phụ & Thiết Diện:
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddLinePanel(!showAddLinePanel)}
                  className="px-2.5 py-1 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Vẽ thêm đoạn thẳng</span>
                </button>
                {customLines.length > 0 && (
                  <button
                    onClick={() => setCustomLines([])}
                    className="px-2 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 text-[11px] font-bold cursor-pointer"
                  >
                    Xóa tất cả ({customLines.length})
                  </button>
                )}
              </div>
            </div>

            {/* Quick Add Presets Bar */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] text-slate-500 mr-1">Vẽ nhanh:</span>
              {shapeType === "SPHERE" && (
                <button
                  onClick={() => handleQuickAddDiagonal("sphereDiam")}
                  className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] cursor-pointer"
                >
                  + Đường kính xích đạo WE
                </button>
              )}
              {(shapeType === "PYRAMID_QUAD" || shapeType === "CUBOID") && (
                <>
                  <button
                    onClick={() => handleQuickAddDiagonal("baseAC")}
                    className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] cursor-pointer"
                  >
                    + Đường chéo AC
                  </button>
                  <button
                    onClick={() => handleQuickAddDiagonal("baseBD")}
                    className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] cursor-pointer"
                  >
                    + Đường chéo BD
                  </button>
                </>
              )}
              {shapeType === "CUBOID" && (
                <button
                  onClick={() => handleQuickAddDiagonal("bodyDiag")}
                  className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-900/40 text-[11px] cursor-pointer"
                >
                  + Đường chéo không gian A&apos;C
                </button>
              )}
            </div>

            {/* Custom Line Builder Modal / Panel */}
            {showAddLinePanel && (
              <div className="p-3.5 bg-slate-900 rounded-xl border border-amber-500/30 space-y-3">
                <span className="font-bold text-amber-300 block text-xs">
                  Thiết lập đoạn thẳng cần vẽ vào không gian 3D:
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Point 1 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-400 text-[11px]">Điểm đầu (P₁):</label>
                      <button
                        onClick={() => setUseCustomCoordP1(!useCustomCoordP1)}
                        className="text-[10px] text-cyan-400 hover:underline cursor-pointer"
                      >
                        {useCustomCoordP1 ? "Chọn từ đỉnh có sẵn" : "Tự nhập tọa độ (x,y,z)"}
                      </button>
                    </div>

                    {!useCustomCoordP1 ? (
                      <select
                        value={lineSourceP1}
                        onChange={(e) => setLineSourceP1(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-white font-mono text-xs"
                      >
                        {solid3DData.vertices.map((v) => (
                          <option key={`p1-${v.name}`} value={v.name}>
                            Đỉnh {v.name} ({v.x}, {v.y}, {v.z})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="grid grid-cols-3 gap-1.5">
                        <input
                          type="number"
                          placeholder="x"
                          value={customCoordP1.x}
                          onChange={(e) => setCustomCoordP1((c) => ({ ...c, x: parseFloat(e.target.value) || 0 }))}
                          className="bg-slate-950 border border-slate-700 rounded-lg p-1 text-center font-mono text-xs text-white"
                        />
                        <input
                          type="number"
                          placeholder="y"
                          value={customCoordP1.y}
                          onChange={(e) => setCustomCoordP1((c) => ({ ...c, y: parseFloat(e.target.value) || 0 }))}
                          className="bg-slate-950 border border-slate-700 rounded-lg p-1 text-center font-mono text-xs text-white"
                        />
                        <input
                          type="number"
                          placeholder="z"
                          value={customCoordP1.z}
                          onChange={(e) => setCustomCoordP1((c) => ({ ...c, z: parseFloat(e.target.value) || 0 }))}
                          className="bg-slate-950 border border-slate-700 rounded-lg p-1 text-center font-mono text-xs text-white"
                        />
                      </div>
                    )}
                  </div>

                  {/* Point 2 */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-400 text-[11px]">Điểm cuối (P₂):</label>
                      <button
                        onClick={() => setUseCustomCoordP2(!useCustomCoordP2)}
                        className="text-[10px] text-cyan-400 hover:underline cursor-pointer"
                      >
                        {useCustomCoordP2 ? "Chọn từ đỉnh có sẵn" : "Tự nhập tọa độ (x,y,z)"}
                      </button>
                    </div>

                    {!useCustomCoordP2 ? (
                      <select
                        value={lineSourceP2}
                        onChange={(e) => setLineSourceP2(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-1.5 text-white font-mono text-xs"
                      >
                        {solid3DData.vertices.map((v) => (
                          <option key={`p2-${v.name}`} value={v.name}>
                            Đỉnh {v.name} ({v.x}, {v.y}, {v.z})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="grid grid-cols-3 gap-1.5">
                        <input
                          type="number"
                          placeholder="x"
                          value={customCoordP2.x}
                          onChange={(e) => setCustomCoordP2((c) => ({ ...c, x: parseFloat(e.target.value) || 0 }))}
                          className="bg-slate-950 border border-slate-700 rounded-lg p-1 text-center font-mono text-xs text-white"
                        />
                        <input
                          type="number"
                          placeholder="y"
                          value={customCoordP2.y}
                          onChange={(e) => setCustomCoordP2((c) => ({ ...c, y: parseFloat(e.target.value) || 0 }))}
                          className="bg-slate-950 border border-slate-700 rounded-lg p-1 text-center font-mono text-xs text-white"
                        />
                        <input
                          type="number"
                          placeholder="z"
                          value={customCoordP2.z}
                          onChange={(e) => setCustomCoordP2((c) => ({ ...c, z: parseFloat(e.target.value) || 0 }))}
                          className="bg-slate-950 border border-slate-700 rounded-lg p-1 text-center font-mono text-xs text-white"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Color & Style Options */}
                <div className="flex items-center gap-4 flex-wrap pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-slate-400 text-[11px]">Màu sắc:</span>
                    {[
                      { color: "#f59e0b", name: "Vàng" },
                      { color: "#ec4899", name: "Hồng" },
                      { color: "#10b981", name: "Xanh lá" },
                      { color: "#a855f7", name: "Tím" },
                    ].map((c) => (
                      <button
                        key={c.color}
                        onClick={() => setNewLineColor(c.color)}
                        className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                          newLineColor === c.color ? "scale-125 border-white" : "border-transparent"
                        }`}
                        style={{ backgroundColor: c.color }}
                        title={c.name}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-slate-400 text-[11px] flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newLineDashed}
                        onChange={(e) => setNewLineDashed(e.target.checked)}
                        className="rounded accent-amber-500"
                      />
                      <span>Nét đứt (cạnh khuất / đường phụ)</span>
                    </label>
                  </div>

                  <button
                    onClick={handleAddCustomLine}
                    className="ml-auto px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
                  >
                    Xác nhận vẽ
                  </button>
                </div>
              </div>
            )}

            {/* Rendered Lines Badges List */}
            {customLines.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-slate-400 text-[10px] block">Các đường phụ đã dựng:</span>
                <div className="flex items-center gap-2 flex-wrap">
                  {customLines.map((line) => (
                    <div
                      key={line.id}
                      className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px]"
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: line.color }} />
                      <span className="font-semibold text-white">{line.name}</span>
                      <span className="font-mono text-cyan-300">d = {line.length.toFixed(2)}</span>
                      <button
                        onClick={() => removeCustomLine(line.id)}
                        className="text-slate-500 hover:text-rose-400 cursor-pointer p-0.5 ml-1"
                        title="Xóa đường này"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ANALYTIC OXYZ PLANES & DISTANCE */}
      {/* ========================================================================= */}
      {activeTab === "analytic" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Plane & Point Inputs */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 shadow-md">
            <span className="font-bold text-slate-300 block uppercase tracking-wider text-[11px]">
              Phương Trình Mặt Phẳng (P): Ax + By + Cz + D = 0
            </span>

            <div className="grid grid-cols-4 gap-2">
              <div>
                <label className="text-[10px] text-slate-400">Hệ số A:</label>
                <input
                  type="number"
                  value={planeA}
                  onChange={(e) => setPlaneA(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">Hệ số B:</label>
                <input
                  type="number"
                  value={planeB}
                  onChange={(e) => setPlaneB(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">Hệ số C:</label>
                <input
                  type="number"
                  value={planeC}
                  onChange={(e) => setPlaneC(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400">Hệ số D:</label>
                <input
                  type="number"
                  value={planeD}
                  onChange={(e) => setPlaneD(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <span className="font-bold text-slate-300 block mb-2 uppercase tracking-wider text-[11px]">
                Tọa Độ Điểm M(x0, y0, z0):
              </span>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400">x0:</label>
                  <input
                    type="number"
                    value={pointM.x}
                    onChange={(e) => setPointM((m) => ({ ...m, x: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">y0:</label>
                  <input
                    type="number"
                    value={pointM.y}
                    onChange={(e) => setPointM((m) => ({ ...m, y: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">z0:</label>
                  <input
                    type="number"
                    value={pointM.z}
                    onChange={(e) => setPointM((m) => ({ ...m, z: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Plane Q Inputs for angle computation */}
            <div className="pt-2 border-t border-slate-800">
              <span className="font-bold text-slate-300 block mb-2 uppercase tracking-wider text-[11px]">
                Mặt Phẳng (Q): A₂x + B₂y + C₂z + D₂ = 0
              </span>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="text-[10px] text-slate-400">A₂:</label>
                  <input
                    type="number"
                    value={planeQ.a}
                    onChange={(e) => setPlaneQ((q) => ({ ...q, a: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">B₂:</label>
                  <input
                    type="number"
                    value={planeQ.b}
                    onChange={(e) => setPlaneQ((q) => ({ ...q, b: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">C₂:</label>
                  <input
                    type="number"
                    value={planeQ.c}
                    onChange={(e) => setPlaneQ((q) => ({ ...q, c: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400">D₂:</label>
                  <input
                    type="number"
                    value={planeQ.d}
                    onChange={(e) => setPlaneQ((q) => ({ ...q, d: parseFloat(e.target.value) || 0 }))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-1.5 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results: Distance & Angles */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 font-mono shadow-md">
            <span className="font-bold text-slate-300 block uppercase tracking-wider text-[11px] font-sans">
              Kết Quả Tính Toán Giải Tích Oxyz:
            </span>

            <div className="space-y-2 text-slate-300">
              {/* Distance d(M, P) */}
              <div className="p-3 bg-cyan-950/40 border border-cyan-800/50 rounded-xl space-y-1">
                <span className="font-sans text-cyan-300 block font-bold">
                  Khoảng cách từ M đến Mặt phẳng (P):
                </span>
                <div className="text-lg font-bold text-cyan-200">
                  d(M, P) = {analyticMetrics.distM.toFixed(3)}
                </div>
                <div className="text-[10px] text-slate-400 font-sans">
                  Công thức: d(M, P) = |Ax0 + By0 + Cz0 + D| / √(A² + B² + C²)
                </div>
              </div>

              {/* Normal Vector */}
              <div className="p-2.5 bg-slate-900 rounded-xl flex justify-between items-center">
                <span className="font-sans">Vectơ pháp tuyến n_P:</span>
                <strong className="text-orange-400">({planeA}, {planeB}, {planeC})</strong>
              </div>

              {/* Angle with (Q) */}
              <div className="p-3 bg-purple-950/40 border border-purple-900/50 rounded-xl space-y-1">
                <span className="font-sans text-purple-300 block font-bold">
                  Góc giữa 2 Mặt phẳng (P) và (Q):
                </span>
                <div className="text-base font-bold text-purple-200">
                  φ = {analyticMetrics.angleDeg.toFixed(1)}° (cos φ = {analyticMetrics.cosAlpha.toFixed(3)})
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
