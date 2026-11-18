/**
 * Bespoke, code-drawn compositions for each flagship project.
 * They are illustrative interfaces (labelled as such), not screenshots.
 */

export function ScamShieldVisual() {
  const score = 87
  const circ = 2 * Math.PI * 70
  const arc = circ * 0.75
  return (
    <div className="pv pv--scam">
      <div className="pv__window">
        <div className="pv__bar mono">
          <i />
          <i />
          <i />
          <span>threat_report.json</span>
        </div>
        <div className="scam">
          <div className="scam__dial">
            <svg viewBox="0 0 180 180" aria-hidden="true">
              <circle cx="90" cy="90" r="70" className="scam__track" strokeDasharray={`${arc} ${circ}`} transform="rotate(135 90 90)" />
              <circle
                cx="90"
                cy="90"
                r="70"
                className="scam__value"
                strokeDasharray={`${(arc * score) / 98} ${circ}`}
                transform="rotate(135 90 90)"
              />
            </svg>
            <div className="scam__score">
              <span className="scam__num">{score}</span>
              <span className="mono">/ 98 · HIGH RISK</span>
            </div>
          </div>
          <ul className="scam__signals mono">
            <li>
              <b>URL</b> typosquat · <q>hbl-verify.co</q>
            </li>
            <li>
              <b>OTP</b> code request detected
            </li>
            <li>
              <b>URGENCY</b> <q>account band ho jayega</q>
            </li>
            <li>
              <b>BRAND</b> bank impersonation
            </li>
          </ul>
        </div>
        <p className="scam__ai">
          <span className="mono">AI · bound to evidence</span>
          Four independent signals agree. Do not share the code — reply safely below.
        </p>
      </div>
    </div>
  )
}

export function AgroShiftVisual() {
  const rows = Array.from({ length: 14 })
  return (
    <div className="pv pv--agro">
      <div className="agro__field" aria-hidden="true">
        {rows.map((_, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.12}s` }} />
        ))}
        <div className="agro__pin">
          <i />
          <span className="mono">Faisalabad · Punjab</span>
        </div>
      </div>
      <div className="agro__panel">
        <p className="mono agro__h">WHAT-IF SIMULATOR</p>
        <div className="agro__slider">
          <span className="mono">Temp</span>
          <div>
            <i style={{ width: '58%' }} />
          </div>
          <b className="mono">+2.0 °C</b>
        </div>
        <div className="agro__slider">
          <span className="mono">Rain</span>
          <div>
            <i style={{ width: '38%' }} />
          </div>
          <b className="mono">−20 %</b>
        </div>
        <div className="agro__cols">
          {[
            ['Existing', 54],
            ['Water-saving', 78],
            ['Soil-improving', 71],
          ].map(([l, v]) => (
            <div key={l as string} className="agro__col">
              <div className="agro__bar">
                <i style={{ height: `${v}%` }} />
              </div>
              <span className="mono">{l}</span>
            </div>
          ))}
        </div>
        <p className="agro__alert mono">
          <i /> HEAT · MODERATE — 20-yr pattern
        </p>
      </div>
    </div>
  )
}

export function FleetVisual() {
  const routes = [
    'M40 260 C 140 220, 160 120, 260 110 S 420 60, 520 90',
    'M60 60 C 160 90, 200 200, 320 210 S 470 260, 540 230',
    'M30 160 C 120 150, 220 170, 300 150 S 430 120, 560 160',
  ]
  return (
    <div className="pv pv--fleet">
      <svg viewBox="0 0 600 320" className="fleet__map" aria-hidden="true">
        <defs>
          <pattern id="fleetgrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30 0H0V30" fill="none" stroke="currentColor" strokeOpacity="0.08" />
          </pattern>
        </defs>
        <rect width="600" height="320" fill="url(#fleetgrid)" />
        <circle cx="330" cy="200" r="46" className="fleet__fence" />
        {routes.map((d, i) => (
          <g key={i}>
            <path d={d} className="fleet__route" />
            <circle r="5" className="fleet__car">
              <animateMotion dur={`${9 + i * 3}s`} repeatCount="indefinite" path={d} begin={`${i * -2}s`} />
            </circle>
          </g>
        ))}
      </svg>
      <div className="fleet__hud mono">
        <span>
          <i className="live" /> LIVE · fleet:update
        </span>
        <span>tick 4s · 5 routes</span>
      </div>
      <div className="fleet__alert mono">
        <b>GEOFENCE</b> KHI-03 exited zone
      </div>
    </div>
  )
}

export function PhoenixVisual() {
  const pings = [
    [22, 34, 0],
    [58, 22, 1.2],
    [70, 62, 0.5],
    [36, 70, 2],
    [48, 46, 1.6],
  ]
  return (
    <div className="pv pv--phoenix">
      <div className="phx__plane" aria-hidden="true">
        <div className="phx__grid" />
        {pings.map(([x, y, d], i) => (
          <span key={i} className={`phx__ping ${i === 4 ? 'is-hot' : ''}`} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }}>
            <i />
          </span>
        ))}
      </div>
      <div className="phx__log mono">
        <p>
          <b>INC-2041</b> flood · sector 7 · <span>dispatched</span>
        </p>
        <p>
          <b>INC-2042</b> fire · block C · <span className="hot">critical</span>
        </p>
        <p>
          <b>INC-2043</b> medical · <span>en route</span>
        </p>
      </div>
    </div>
  )
}
