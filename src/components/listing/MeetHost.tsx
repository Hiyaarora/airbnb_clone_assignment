import Image from "next/image";
import { Check } from "lucide-react";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import type { Listing } from "@/types/listing";
import styles from "./MeetHost.module.css";

/** "Meet your host" (audit §9): host card + facts on the left, co-hosts + details on the right. */
export function MeetHost({ host }: { host: Listing["host"] }) {
  return (
    <section className={styles.section} aria-labelledby="host-heading">
      <h2 id="host-heading" className={styles.heading}>
        Meet your host
      </h2>
      <div className={styles.grid}>
        <div>
          <div className={styles.card}>
            <div className={styles.identity}>
              <div className={styles.avatarWrap}>
                <Image src={host.avatar} alt="" width={88} height={88} className={styles.avatar} />
                <span className={styles.badge} aria-hidden>
                  <Check size={16} strokeWidth={3} />
                </span>
              </div>
              <div className={styles.hostName}>{host.name}</div>
              <div className={styles.hostRole}>Host</div>
            </div>
            <dl className={styles.statsList}>
              <div className={styles.statItem}>
                <dt className={styles.statLabel}>Reviews</dt>
                <dd className={styles.statValue}>{host.reviews}</dd>
              </div>
              <div className={styles.statItem}>
                <dt className={styles.statLabel}>Rating</dt>
                <dd className={styles.statValue}>{host.rating}★</dd>
              </div>
              <div className={styles.statItem}>
                <dt className={styles.statLabel}>Years hosting</dt>
                <dd className={styles.statValue}>{host.yearsHosting}</dd>
              </div>
            </dl>
          </div>
          <ul className={styles.facts}>
            {host.facts.map((fact) => (
              <li key={fact.text} className={styles.fact}>
                <FeatureIcon name={fact.icon} size={24} />
                {fact.text}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={styles.subheading}>Co-Hosts</h3>
          <ul className={styles.coHosts}>
            {host.coHosts.map((co) => (
              <li key={co.name} className={styles.coHost}>
                {co.avatar ? (
                  <Image src={co.avatar} alt="" width={34} height={34} className={styles.coAvatar} />
                ) : (
                  <span className={styles.coInitial} style={{ color: co.initialColors?.fg, background: co.initialColors?.bg }} aria-hidden>
                    {co.name[0]}
                  </span>
                )}
                <span>{co.name}</span>
              </li>
            ))}
          </ul>
          <h3 className={styles.subheading}>Host details</h3>
          <p className={styles.details}>
            {host.responseRate}
            <br />
            {host.responseTime}
          </p>
          <button type="button" className={styles.message}>
            Message host
          </button>
          <div className={styles.safety}>
            <FeatureIcon name="lock" size={24} />
            <span>To help protect your payment, always use Airbnb to send money and communicate with hosts.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
