import { interests, principles, profile } from '../data/content'
import SectionHead from '../components/SectionHead'
import SplitWords from '../components/SplitWords'

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead
          index="02"
          label="The mind behind the code"
          title={
            <span id="about-title">
              <SplitWords text="Curious by default." /> <em className="serif"><SplitWords text="Rigorous by design." /></em>
            </span>
          }
        />

        <div className="about__grid">
          <figure className="about__portrait" data-parallax="-0.08">
            <div className="about__frame" data-clip-reveal>
              <img src={profile.photo} alt={`Portrait of ${profile.name}`} width="520" height="650" loading="lazy" decoding="async" />
              <div className="about__scan" aria-hidden="true" />
            </div>
            <figcaption className="mono">
              <span>FIG. 01</span>
              <span>
                {profile.education.abbr} · {profile.education.city}
              </span>
            </figcaption>
          </figure>

          <div className="about__copy">
            <p className="about__lead" data-reveal>
              I’m a Software Engineering undergraduate at <strong>{profile.education.school}</strong>. I started with small CLI tools and a calculator in JavaScript — today I ship deployed, tested AI products.
            </p>
            <p className="about__body" data-reveal>
              My work sits where machine learning meets real users: a scam detector that shows its evidence, a climate engine that turns NASA data into crop decisions, a fleet system that updates the moment a vehicle moves. I care about the whole stack — the model, the API, the database, and the interface a person actually touches.
            </p>

            <dl className="about__facts" data-reveal>
              <div>
                <dt className="mono">Studying</dt>
                <dd>{profile.education.degree}</dd>
              </div>
              <div>
                <dt className="mono">Based in</dt>
                <dd>Karachi, Pakistan</dd>
              </div>
              <div>
                <dt className="mono">Experience</dt>
                <dd>SafeX · FlyRank.ai</dd>
              </div>
              <div>
                <dt className="mono">Focus</dt>
                <dd>Applied AI · Full-stack · Real-time</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="principles">
          <p className="mono principles__label" data-reveal>
            How I work
          </p>
          <ol className="principles__list">
            {principles.map((p) => (
              <li key={p.k} className="principle" data-reveal>
                <span className="mono principle__k">{p.k}</span>
                <h3 className="principle__title">{p.title}</h3>
                <p className="principle__body">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="ticker" aria-label="Areas of interest">
        <div className="ticker__track">
          {[0, 1].map((dup) => (
            <ul key={dup} aria-hidden={dup === 1}>
              {interests.map((i) => (
                <li key={i}>
                  {i}
                  <span className="ticker__star" aria-hidden="true">
                    ✦
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
