import { ChevronLeft, ChevronRight } from "lucide-react";
import { KeyboardIcon } from "@/components/ui/icons";
import styles from "./Calendar.module.css";

interface Props {
  nights: number;
  location: string;
  rangeLabel: string;
  checkIn: string; // ISO date
  checkOut: string; // ISO date
  /** ISO dates that render struck-through (unavailable). */
  unavailable: string[];
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function iso(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/**
 * Display-only two-month calendar (audit §7.8): the reference renders selected range and
 * unavailable days but no day is interactive; the month arrows and "Clear dates" are real
 * buttons that do nothing.
 */
export function Calendar({ nights, location, rangeLabel, checkIn, checkOut, unavailable }: Props) {
  const start = new Date(checkIn + "T00:00:00");
  const months = [0, 1].map((offset) => new Date(start.getFullYear(), start.getMonth() + offset, 1));
  const unavailableSet = new Set(unavailable);

  return (
    <div className={styles.block}>
      <h2 className={styles.title}>
        {nights} nights in {location}
      </h2>
      <div className={styles.subtitle}>{rangeLabel}</div>
      {/* The day grid is a display-only rendering of the selection (reference parity, including
          its #DDD unavailable dates), so it is decorative for assistive tech; this summary carries
          the same information as text. */}
      <p className="visually-hidden">Selected dates: {rangeLabel}. {unavailable.length} dates are unavailable in the two months shown.</p>
      <div className={styles.months}>
        <div className={styles.arrows}>
          <button type="button" className={styles.arrow} aria-label="Previous month">
            <ChevronLeft size={12} strokeWidth={2.5} aria-hidden focusable={false} />
          </button>
          <button type="button" className={styles.arrow} aria-label="Next month">
            <ChevronRight size={12} strokeWidth={2.5} aria-hidden focusable={false} />
          </button>
        </div>
        {months.map((month) => {
          const year = month.getFullYear();
          const m = month.getMonth();
          const daysInMonth = new Date(year, m + 1, 0).getDate();
          const leading = month.getDay();
          const cells = [...Array.from({ length: leading }, () => null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
          const label = month.toLocaleString("en-GB", { month: "long", year: "numeric" });
          return (
            <div key={label}>
              <div className={styles.monthTitle} aria-hidden>{label}</div>
              <div className={styles.weekdays} aria-hidden>
                {WEEKDAYS.map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>
              <div className={styles.days} aria-hidden>
                {cells.map((day, i) => {
                  if (day === null) return <div key={`blank-${i}`} className={styles.blank} aria-hidden />;
                  const date = iso(year, m, day);
                  const state =
                    date === checkIn ? "start" : date === checkOut ? "end" : date > checkIn && date < checkOut ? "range" : undefined;
                  return (
                    <div key={date} className={styles.day} data-state={state} data-unavailable={unavailableSet.has(date) || undefined}>
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.footer}>
        <span className={styles.keyboard} aria-hidden>
          <KeyboardIcon size={20} />
        </span>
        <button type="button" className={styles.clear}>
          Clear dates
        </button>
      </div>
    </div>
  );
}
