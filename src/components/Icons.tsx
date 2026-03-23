import React from 'react';

export const ArrowBack = () => <span className="material-symbols-outlined">arrow_back</span>;
export const ArrowForward = () => <span className="material-symbols-outlined">arrow_forward</span>;
export const Lightbulb = ({ filled = false }: { filled?: boolean }) => (
  <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}` }}>
    lightbulb
  </span>
);
export const CheckCircle = ({ filled = false }: { filled?: boolean }) => (
  <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}` }}>
    check_circle
  </span>
);
export const Insights = ({ filled = false }: { filled?: boolean }) => (
  <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}` }}>
    insights
  </span>
);
export const Bolt = ({ filled = false }: { filled?: boolean }) => (
  <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}` }}>
    bolt
  </span>
);
export const Notifications = () => <span className="material-symbols-outlined">notifications</span>;
export const LightMode = () => <span className="material-symbols-outlined">light_mode</span>;
export const Bedtime = () => <span className="material-symbols-outlined">bedtime</span>;
export const Tune = () => <span className="material-symbols-outlined">tune</span>;
export const LocalFireDepartment = ({ filled = false }: { filled?: boolean }) => (
  <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${filled ? 1 : 0}` }}>
    local_fire_department
  </span>
);
export const AutoAwesome = () => <span className="material-symbols-outlined">auto_awesome</span>;
export const Check = () => <span className="material-symbols-outlined" style={{ fontVariationSettings: "'wght' 700" }}>check</span>;
