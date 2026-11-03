
import { Component } from '@angular/core';

type Screen = 'welcome' | 'message' | 'training' | 'delivery' | 'done';

interface Trick {
  name: string;
  emoji: string;
  command: string;
  meme: string;
  detail: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    @if (isLoading) {
      <div class="loading-screen" role="status" aria-live="polite">
        <div class="loading-paw">🐶</div>
        <h2>Luke is preparing your surprise...</h2>
        <p>Bitte einen kleinen Moment warten! 🐾</p>
        <div class="loading-spinner"></div>
      </div>
    }

    <main class="page-shell">
      <header class="topbar">
        <a class="brand" href="#" (click)="goHome($event)">
          <span class="brand-paw">🐾</span>
          <span>PASSI & LUKE <small>DELIVERY SERVICE</small></span>
        </a>
        <span class="top-tag">SPECIAL BIRTHDAY EDITION</span>
      </header>

      <section class="app-card">
        <div class="confetti confetti-one">✦</div>
        <div class="confetti confetti-two">✳</div>

        @if (screen === 'welcome') {
          <div class="hero">
            <div class="eyebrow">
              <span class="live-dot"></span>
              GEHEIME NACHRICHT · NUR FÜR DICH
            </div>

            <div class="luke-start-frame">
              <img
                  class="luke-photo luke-start-photo"
                  src="assets/luke-start.jpg"
                  alt="Luke mit seinem Geburtstagsgruß für Lena"
              />

              <div class="meme-glasses" aria-hidden="true">
                <span class="glasses-lens glasses-lens-left"></span>
                <span class="glasses-lens glasses-lens-right"></span>
              </div>
            </div>

            <p class="overline">WUFF WUFF. LENA, WIR HABEN ETWAS FÜR DICH!</p>

            <h1>Hey Lena,<br><em>heute ist dein Tag!</em></h1>

            <p class="lead">
              Wir zwei haben uns etwas ganz Besonderes für dich überlegt.
              Passi hat geplant, Luke hat geholfen (zumindest moralisch)
              und gemeinsam haben wir eine kleine Überraschung vorbereitet.
              Bist du bereit?
            </p>

            <div class="speech-bubble">
              „Lena, ich habe gehört, es gibt heute etwas zu feiern.
              Ich hoffe, es gibt auch Kuchen. Und Käse. Hauptsächlich Käse.“
              <small>— Luke 🐾</small>
            </div>

            <button class="primary-button" (click)="setScreen('message')">
              MISSION STARTEN <span>→</span>
            </button>

            <p class="tiny-note">
              Mit ganz viel Liebe geplant. Von uns beiden. ❤️
            </p>
          </div>
        }

        @if (screen === 'message') {
          <div class="content-screen">
            <div class="section-icon">💌</div>
            <p class="eyebrow">EINE NACHRICHT VON UNS BEIDEN</p>

            <h1>Für dich,<br><em>liebe Lena.</em></h1>

            <img
                class="luke-photo luke-text-photo"
                src="assets/luke-text.jpg"
                alt="Luke für Lena"
            />

            <div class="message-card">
              <p>Liebe Lena,</p>

              <p>
                heute ist dein 25. Geburtstag und wir möchten diesen Tag nutzen,
                um dir zu sagen, wie unglaublich froh wir sind, dich zu haben.
              </p>

              <p>
                Du bist für mich so viel mehr als nur meine Freundin.
                Du bist mein Lieblingsmensch, meine beste Vertraute,
                mein Zuhause und die Person, mit der ich am liebsten
                jeden noch so kleinen Moment teile.
              </p>

              <p>
                Ich liebe dein Lachen, deine Art, deine kleinen Eigenheiten
                und einfach alles, was dich zu dem Menschen macht,
                der du bist. Ich bin unglaublich dankbar für alles,
                was wir schon zusammen erlebt haben, und freue mich
                auf alles, was noch vor uns liegt.
              </p>

              <p>
                Und auch Luke könnte sich wohl keinen besseren Menschen
                an seiner Seite wünschen. Danke für all die Streicheleinheiten,
                die Kuschelstunden und natürlich dafür, dass du ihn so sehr liebst.
              </p>

              <p>
                Wir beide haben dich unglaublich lieb und hoffen,
                dass wir dir heute ein kleines Lächeln ins Gesicht zaubern können.
              </p>

              <p class="signature">In Liebe, dein Passi ❤️</p>
              <p class="signature">Und dein kleiner Luke 🐾</p>
            </div>

            <div class="meme-line">
              PASSI HAT DIESEN TEXT GESCHRIEBEN.
              LUKE HAT WÄHRENDESSEN GESCHLAFEN.
            </div>

            <button class="primary-button" (click)="setScreen('training')">
              WEITER ZUR GEHEIMMISSION <span>→</span>
            </button>
          </div>
        }

        @if (screen === 'training') {
          <div class="content-screen">
            <div class="section-icon">🎓</div>
            <p class="eyebrow">LUKES GEHEIME GEBURTSTAGSPRÜFUNG</p>

            <h1>Na Lena,<br><em>bereit für die Prüfung?</em></h1>

            <p class="lead compact">
              25 Jahre alt und hoffentlich noch fit genug für Lukes
              kleine Tricks! Wir haben vier Aufgaben für dich vorbereitet.
              Luke freut sich schon darauf, dir seine Talente zu zeigen.
              Ob du wohl alle schaffst? 😉
            </p>

            <div class="progress-wrap">
              <div class="progress-label">
                <span>MISSION-FORTSCHRITT</span>
                <strong>{{ completedCount }} / 4</strong>
              </div>

              <div class="progress-track">
                <div
                    class="progress-fill"
                    [style.width.%]="completedCount * 25">
                </div>
              </div>
            </div>

            <div class="trick-list">
              @for (trick of tricks; track trick.name; let i = $index) {
                <button
                    class="trick-row"
                    [class.completed]="completed[i]"
                    (click)="completeTrick(i)">

                  <span class="trick-emoji">{{ trick.emoji }}</span>

                  <span class="trick-copy">
                    <strong>{{ trick.name }}</strong>
                    <small>{{ trick.command }}</small>
                  </span>

                  <span class="trick-status">
                    {{ completed[i] ? '✓' : '＋' }}
                  </span>
                </button>

                @if (activeMeme === i) {
                  <div class="meme-reply">
                    „{{ trick.meme }}“
                    <small>— Luke, vermutlich</small>
                  </div>
                }
              }
            </div>

            @if (completedCount === 4) {
              <div class="success-note">
                🏆 GESCHAFFT, LENA! 4 VON 4!
                Wir sind stolz auf dich. Luke ist begeistert und erwartet
                jetzt selbstverständlich seine Belohnung.
              </div>

              <button class="primary-button" (click)="startDelivery()">
                ZUR ÜBERRASCHUNG <span>→</span>
              </button>
            } @else {
              <p class="hint">
                Kleiner Tipp: Luke nimmt Bestechung in Form von Snacks entgegen.
              </p>
            }
          </div>
        }

        @if (screen === 'delivery') {
          <div class="content-screen delivery-screen">

            @if (!deliveryStarted) {
              <div class="section-icon">🙈</div>

              <p class="eyebrow">EINE KLEINE BITTE AN DICH, LENA</p>

              <h1>Jetzt wird's<br><em>spannend!</em></h1>

              <div class="final-illustration">🐶❤️🐾</div>

              <div class="message-card">
                <p>
                  So Lena, deine Mission hast du erfolgreich gemeistert!
                  Wir hoffen, du hattest ein bisschen Spaß mit unserem kleinen Spiel.
                </p>

                <p>
                  Aber natürlich haben wir uns nicht nur deswegen so viel Mühe gemacht.
                  Wir haben noch eine kleine Überraschung für dich vorbereitet.
                </p>

                <p>
                  Deshalb haben wir jetzt nur noch eine Bitte:
                  Schließe kurz deine Augen und lass dich überraschen.
                </p>

                <p>
                  Du bist heute unser Geburtstagskind und hast es mehr als verdient,
                  verwöhnt zu werden. ❤️
                </p>

                <p class="signature">Dein Passi & dein Luke ❤️</p>
              </div>

              <div class="meme-line">
                LENA, NICHT SCHUMMELN! LUKE HAT EIN AUGE AUF DICH.
              </div>

              <button class="primary-button" (click)="showDelivery()">
                ICH BIN BEREIT <span>→</span>
              </button>
            }

            @if (deliveryStarted) {
              <div class="section-icon">📦</div>

              <p class="eyebrow">PASSI & LUKE'S DELIVERY SERVICE</p>

              <h1>Lena, deine Überraschung<br><em>ist unterwegs!</em></h1>

              <p class="lead compact">
                Wir haben etwas für dich vorbereitet und können es kaum erwarten,
                dir deine Überraschung zu überreichen.
                Die letzten Vorbereitungen laufen bereits.
              </p>

              <div class="tracking-card">
                <div class="tracking-head">
                  <span>LIVE SENDUNGSVERFOLGUNG</span>
                  <span class="tracking-pill">GEHEIM</span>
                </div>

                <div class="tracking-banner">
                  <div class="tracking-animation">
                    @for (step of deliverySteps; track $index) {
                      <span class="tracking-item">
                        {{ step.icon }} {{ step.label }}
                        <span class="tracking-separator">✦</span>
                      </span>
                    }

                    @for (step of deliverySteps; track $index) {
                      <span class="tracking-item">
                        {{ step.icon }} {{ step.label }}
                        <span class="tracking-separator">✦</span>
                      </span>
                    }
                  </div>
                </div>

                <div class="tracking-live">
                  <span class="live-dot"></span>
                  PASSI & LUKE SIND UNTERWEGS ...
                </div>
              </div>

              <div class="delivery-note">
                <div class="big-paw">🐾</div>

                <h2>Dein Geschenk wartet!</h2>

                <p>
                  Liebe Lena, wir hoffen, dass du dich freust.
                  Wir haben uns Gedanken gemacht, weil du uns so viel bedeutest.
                  Und jetzt ist es endlich so weit!
                </p>

                <p>
                  Leg dein Handy kurz zur Seite und komm zu uns.
                  Passi und Luke warten schon ganz gespannt auf dich.
                </p>

                <p class="tiny-note">
                  Persönliche Übergabe durch deine zwei Lieblingsjungs. ❤️
                </p>
              </div>

              <button class="primary-button" (click)="setScreen('done')">
                ÜBERRASCHUNG ANNEHMEN <span>♥</span>
              </button>
            }
          </div>
        }

        @if (screen === 'done') {
          <div class="content-screen final-screen">
            <div class="section-icon">❤️</div>

            <p class="eyebrow">MISSION ERFOLGREICH ABGESCHLOSSEN</p>

            <h1>Happy 25th<br><em>Birthday, Lena!</em></h1>

            <img
                class="luke-photo luke-end-photo"
                src="assets/luke-end.jpg"
                alt="Luke gratuliert Lena zum Geburtstag"
            />

            <div class="message-card">
              <p>Liebe Lena,</p>

              <p>
                25 Jahre voller Erlebnisse,
                Erfahrungen, schöner Momente und ganz vieler Erinnerungen.
                Und das Beste kommt hoffentlich noch!
              </p>

              <p>
                Ich wünsche dir von ganzem Herzen, dass du dir deine
                wundervolle Art bewahrst, weiterhin so viel lachst und
                jeden Tag Gründe findest, glücklich zu sein.
              </p>

              <p>
                Ich bin unglaublich froh, dich an meiner Seite zu haben.
                Danke, dass du mein Leben so viel schöner machst.
                Ich freue mich auf jedes weitere Abenteuer mit dir,
                auf all die kleinen Alltagsmomente und auf unsere gemeinsame Zukunft.
              </p>

              <p>
                Und natürlich wünschen wir dir auch ganz viele Kuschelstunden,
                schöne Spaziergänge und jede Menge Leckerlis (zumindest Luke).
              </p>

              <p>
                Auf dich, auf deinen Geburtstag und auf alles, was noch kommt!
              </p>

              <p class="signature">Ich liebe dich. Dein Passi ❤️</p>
              <p class="signature">Und ganz viele feuchte Hundeküsschen von Luke 🐾</p>
            </div>

            <div class="meme-line">
              25 JAHRE LENA. FÜR PASSI DIE NUMMER 1,
              FÜR LUKE DIE NUMMER 1 BEIM KUSCHELN. ❤️
            </div>

            <button class="secondary-button" (click)="goHome()">
              MISSION NOCHMAL ANSEHEN ↺
            </button>
          </div>
        }
      </section>

      <footer class="footer">
        <span>🐾 PASSI & LUKE'S DELIVERY SERVICE</span>
        <span>MADE WITH LOVE (AND A LITTLE FELL) · © {{ year }}</span>
      </footer>
    </main>
  `,
  styles: [`
    .loading-screen {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 24px;
      background: #fff8f2;
      text-align: center;
      opacity: 1;
      visibility: visible;
      transition: opacity .5s ease, visibility .5s ease;
    }

    .loading-paw {
      font-size: 76px;
      margin-bottom: 18px;
      animation: loading-bounce 1.2s ease-in-out infinite;
    }

    .loading-screen h2 {
      color: #69433e;
      font-size: 1.5rem;
      margin: 0 0 10px;
    }

    .loading-screen p {
      color: #876b64;
      margin: 0;
    }

    .loading-spinner {
      width: 35px;
      height: 35px;
      margin-top: 24px;
      border: 4px solid #ead8d0;
      border-top-color: #a96f62;
      border-radius: 50%;
      animation: loading-spin .8s linear infinite;
    }

    @keyframes loading-spin {
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes loading-bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-9px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .loading-spinner,
      .loading-paw {
        animation: none;
      }
    }
  `],
  styleUrl: '../styles.css'
})
export class AppComponent {
  screen: Screen = 'welcome';

  isLoading = true;

  private readonly imagesToPreload = [
    'assets/luke-start.jpg',
    'assets/luke-text.jpg',
    'assets/luke-end.jpg'
  ];

  completed = [false, false, false, false];
  activeMeme: number | null = null;

  deliveryStarted = false;

  readonly year = new Date().getFullYear();

  readonly tricks: Trick[] = [
    {
      name: 'Pfötchen geben',
      emoji: '🐾',
      command: 'Der Klassiker – eine Pfote für dich.',
      meme: 'Eine Pfote? Für dich immer. Für Fremde nur gegen Bezahlung.',
      detail: ''
    },
    {
      name: 'High Five',
      emoji: '✋',
      command: 'Teamwork makes the dream work.',
      meme: 'Ich bin nicht nur süß. Ich bin auch sportlich.',
      detail: ''
    },
    {
      name: 'Schäm dich!',
      emoji: '🙈',
      command: 'Pfote über die Schnauze – wie unschuldig!',
      meme: 'Ich? Etwas angestellt? Ich weiß von nichts!',
      detail: ''
    },
    {
      name: 'Peng!',
      emoji: '💥',
      command: 'Einmal hinlegen und sich ganz tot stellen.',
      meme: 'Dramatisches Talent. Oscar-reif. Wo ist mein Käse?',
      detail: ''
    }
  ];

  readonly deliverySteps = [
    {
      icon: '💌',
      label: 'Überraschung liebevoll geplant'
    },
    {
      icon: '🐶',
      label: 'Luke als Helfer engagiert'
    },
    {
      icon: '❤️',
      label: 'Mit ganz viel Liebe verpackt'
    },
    {
      icon: '🚚',
      label: 'Persönliche Zustellung unterwegs'
    }
  ];

  ngOnInit(): void {
    void this.preloadImages();
  }

  private async preloadImages(): Promise<void> {
    await Promise.all(
        this.imagesToPreload.map(async (src) => {
          const img = new Image();
          img.src = src;

          try {
            await img.decode();
          } catch {
            // Don't block the page if an image cannot be loaded.
          }
        })
    );

    this.isLoading = false;
  }

  get completedCount(): number {
    return this.completed.filter(Boolean).length;
  }

  setScreen(screen: Screen): void {
    this.screen = screen;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  completeTrick(index: number): void {
    if (this.completed[index]) {
      return;
    }

    this.completed[index] = true;
    this.activeMeme = index;
  }

  startDelivery(): void {
    this.deliveryStarted = false;
    this.setScreen('delivery');
  }

  showDelivery(): void {
    this.deliveryStarted = true;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  goHome(event?: Event): void {
    event?.preventDefault();

    this.completed = [false, false, false, false];
    this.activeMeme = null;
    this.deliveryStarted = false;

    this.setScreen('welcome');
  }
}
