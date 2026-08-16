import { useEffect, useState } from "react";

/**
 * True only when the visitor has a precise pointer (mouse/trackpad) and has
 * not asked for reduced motion — i.e. when pointer-driven decoration is
 * appropriate. Re-evaluates if either preference changes mid-session.
 */
export function usePointerFine() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();

    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return enabled;
}
