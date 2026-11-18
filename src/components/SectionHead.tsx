import type { ReactNode } from 'react'

export default function SectionHead({ index, label, title, aside }: { index: string; label: string; title: ReactNode; aside?: ReactNode }) {
  return (
    <header className="shead">
      <div className="shead__meta" data-reveal>
        <span className="mono shead__index">§ {index}</span>
        <span className="shead__rule" />
        <span className="mono shead__label">{label}</span>
      </div>
      <h2 className="shead__title" data-split>
        {title}
      </h2>
      {aside ? (
        <div className="shead__aside" data-reveal>
          {aside}
        </div>
      ) : null}
    </header>
  )
}
