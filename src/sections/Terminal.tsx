import { useEffect, useRef, useState, type ReactNode } from 'react'
import { experience, profile, projects, techCategories, techs } from '../data/content'

type Line = { kind: 'in' | 'out' | 'err'; body: ReactNode }

const HELP: ReactNode = (
  <>
    Available commands:{'\n'}
    {'  '}whoami        who is behind this site{'\n'}
    {'  '}projects      flagship projects{'\n'}
    {'  '}open {'<n>'}      open project n (1–{projects.length}){'\n'}
    {'  '}stack         technologies by category{'\n'}
    {'  '}experience    internships{'\n'}
    {'  '}contact       ways to reach me{'\n'}
    {'  '}clear         clear the screen
  </>
)

function run(cmdRaw: string): Line[] | 'clear' {
  const [cmd, ...args] = cmdRaw.trim().split(/\s+/)
  switch ((cmd || '').toLowerCase()) {
    case '':
      return []
    case 'help':
    case 'ls':
      return [{ kind: 'out', body: HELP }]
    case 'whoami':
      return [
        {
          kind: 'out',
          body: `${profile.name}\n${profile.roles.join(' · ')}\n${profile.education.degree} — ${profile.education.abbr}, ${profile.education.city}`,
        },
      ]
    case 'projects':
      return [
        {
          kind: 'out',
          body: projects.map((p, i) => `  [${i + 1}] ${p.name.padEnd(14)} ${p.kicker}`).join('\n') + '\n\nTip: `open 1`',
        },
      ]
    case 'open': {
      const n = Number(args[0])
      const p = projects[n - 1]
      if (!p) return [{ kind: 'err', body: `open: expected a number 1–${projects.length}` }]
      const url = p.live ?? p.github
      if (url) window.open(url, '_blank', 'noopener,noreferrer')
      return [{ kind: 'out', body: `Opening ${p.name} → ${url}` }]
    }
    case 'stack':
      return [
        {
          kind: 'out',
          body: techCategories
            .map((c) => `${c.id.padEnd(12)} ${techs.filter((t) => t.cat === c.id).map((t) => t.name).join(', ')}`)
            .join('\n'),
        },
      ]
    case 'experience':
      return [{ kind: 'out', body: experience.slice(0, 2).map((x) => `${x.period}  ${x.role} @ ${x.org}`).join('\n') }]
    case 'contact':
      return [
        {
          kind: 'out',
          body: (
            <>
              email     <a href={`mailto:${profile.email}`}>{profile.email}</a>
              {'\n'}github    <a href={profile.github} target="_blank" rel="noopener noreferrer">{profile.githubHandle}</a>
              {'\n'}linkedin  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">{profile.linkedinHandle}</a>
            </>
          ),
        },
      ]
    case 'sudo':
      return [{ kind: 'out', body: 'Permission granted. The best way to hire me is `contact`.' }]
    case 'clear':
      return 'clear'
    default:
      return [{ kind: 'err', body: `command not found: ${cmd}. Try \`help\`.` }]
  }
}

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', body: 'asif.os — interactive profile shell. Type `help` to begin.' },
  ])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [hIdx, setHIdx] = useState(-1)
  const screen = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (screen.current) screen.current.scrollTop = screen.current.scrollHeight
  }, [lines])

  const submit = (cmd: string) => {
    const res = run(cmd)
    if (res === 'clear') {
      setLines([])
    } else {
      setLines((l) => [...l, { kind: 'in', body: cmd }, ...res])
    }
    if (cmd.trim()) setHistory((h) => [cmd, ...h].slice(0, 30))
    setHIdx(-1)
    setValue('')
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const i = Math.min(history.length - 1, hIdx + 1)
      if (history[i] !== undefined) {
        setHIdx(i)
        setValue(history[i])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const i = hIdx - 1
      setHIdx(Math.max(-1, i))
      setValue(i >= 0 ? history[i] : '')
    }
  }

  return (
    <div className="term" onClick={() => input.current?.focus({ preventScroll: true })} data-cursor="text">
      <div className="term__bar mono">
        <i />
        <i />
        <i />
        <span>asif@frontier: ~</span>
      </div>
      <div className="term__screen mono" ref={screen} data-lenis-prevent role="log" aria-live="polite" aria-label="Terminal output">
        {lines.map((l, i) => (
          <pre key={i} className={`term__line term__line--${l.kind}`}>
            {l.kind === 'in' ? <span className="term__prompt">❯ </span> : null}
            {l.body}
          </pre>
        ))}
      </div>
      <form
        className="term__form mono"
        onSubmit={(e) => {
          e.preventDefault()
          submit(value)
        }}
      >
        <label htmlFor="term-input" className="term__prompt">
          ❯<span className="sr-only">Terminal command</span>
        </label>
        <input
          id="term-input"
          ref={input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="type help"
        />
      </form>
      <div className="term__quick">
        {['whoami', 'projects', 'stack', 'contact'].map((c) => (
          <button key={c} className="mono" onClick={(e) => (e.stopPropagation(), submit(c))}>
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
