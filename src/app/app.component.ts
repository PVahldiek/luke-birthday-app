
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

            <div class="dog-stamp" aria-label="Hund mit Sonnenbrille">
              🐶<span class="sunglasses">🕶️</span>
            </div>

            <p class="overline">WUFF WUFF. WIR HABEN ETWAS FÜR DICH!</p>

            <h1>Wir haben eine<br><em>kleine Überraschung</em><br>für dich.</h1>

            <p class="lead">
              Hier sind Passi und Luke! Wir haben uns etwas ganz Besonderes
              für deinen Geburtstag überlegt. Eine kleine Mission wartet auf dich –
              und wir hoffen, du hast genauso viel Spaß dabei wie wir.
            </p>

            <div class="speech-bubble">
              „Ich durfte sogar bei der Planung helfen. Na gut, Passi hat die Arbeit
              gemacht. Ich war für die Qualitätskontrolle zuständig.“
              <small>— Luke 🐾</small>
            </div>

            <button class="primary-button" (click)="setScreen('message')">
              MISSION STARTEN <span>→</span>
            </button>

            <p class="tiny-note">Mit ganz viel Liebe geplant. Von uns beiden. ❤️</p>
          </div>
        }

        @if (screen === 'message') {
          <div class="content-screen">
            <div class="section-icon">💌</div>
            <p class="eyebrow">EINE NACHRICHT VON UNS BEIDEN</p>

            <h1>Hey, <em>Lieblingsmensch.</em></h1>

            <div class="message-card">
              <p>
                Heute ist dein Tag und wir möchten dir einfach sagen,
                wie unglaublich froh wir sind, dich zu haben.
              </p>

              <p>
                Du machst unser Leben schöner, wärmer und jeden Tag ein
                kleines bisschen besonderer. Mit dir wird selbst aus den
                ganz normalen Momenten etwas Wunderschönes.
              </p>

              <p>
                Danke für all die Liebe, die du uns schenkst, für deine
                Geduld, dein Lachen, die gemeinsamen Erinnerungen und
                natürlich für all die Streicheleinheiten und Kuscheleinheiten.
              </p>

              <p>
                Wir sind unglaublich glücklich, dich an unserer Seite zu haben.
                Du bist für uns etwas ganz Besonderes und wir hoffen,
                dass wir dir heute ein kleines Stück von all dem zurückgeben können.
              </p>

              <p class="signature">In Liebe, dein Passi ❤️</p>
              <p class="signature">Und natürlich dein Luke 🐾</p>
            </div>

            <div class="meme-line">
              PASSI HAT DIE ÜBERRASCHUNG GEPLANT. LUKE HAT SIE GENEHMIGT.
            </div>

            <button class="primary-button" (click)="setScreen('training')">
              WEITER ZUR GEHEIMMISSION <span>→</span>
            </button>
          </div>
        }

        @if (screen === 'training') {
          <div class="content-screen">
            <div class="section-icon">🎓</div>
            <p class="eyebrow">UNSERE GEHEIME PRÜFUNG</p>

            <h1>Vier Aufgaben.<br><em>Ein Geburtstagsprofi.</em></h1>

            <p class="lead compact">
              Wir haben vier kleine Aufgaben für dich vorbereitet.
              Luke hat seine besten Tricks ausgesucht und wartet schon
              ganz gespannt darauf, dich zu beeindrucken. 😉
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
                🏆 BESTANDEN! Wir sind stolz auf dich!
                Luke verlangt jetzt allerdings eine angemessene Belohnung.
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

              <p class="eyebrow">EINE KLEINE BITTE VON UNS BEIDEN</p>

              <h1>Bitte kurz<br><em>die Augen schließen.</em></h1>

              <div class="final-illustration">🐶❤️🐾</div>

              <div class="message-card">
                <p>
                  So, unsere Lieblingsperson. Deine Mission hast du erfolgreich
                  gemeistert!
                </p>

                <p>
                  Wir haben noch eine Kleinigkeit für dich vorbereitet.
                  Und jetzt kommt der wichtigste Teil:
                </p>

                <p>
                  Schließe bitte kurz deine Augen und lass dich überraschen.
                  Wir versprechen, es lohnt sich. ❤️
                </p>

                <p class="signature">
                  Passi & Luke
                </p>
              </div>

              <div class="meme-line">
                PASSI IST AUFGEREGT. LUKE IST AUFGEREGT.
                (HAUPTSÄCHLICH WEGEN DER SNACKS.)
              </div>

              <button class="primary-button" (click)="showDelivery()">
                ICH BIN BEREIT <span>→</span>
              </button>
            }

            @if (deliveryStarted) {
              <div class="section-icon">📦</div>

              <p class="eyebrow">PASSI & LUKE'S DELIVERY SERVICE</p>

              <h1>Deine Überraschung<br><em>ist unterwegs!</em></h1>

              <p class="lead compact">
                Wir haben etwas ganz Besonderes für dich vorbereitet.
                Die Vorbereitungen sind abgeschlossen und deine persönliche
                Lieferung ist fast am Ziel.
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

                <h2>Wir haben etwas für dich!</h2>

                <p>
                  Wir hoffen, du freust dich über unsere kleine Überraschung.
                  Sie kommt von Herzen und wurde mit ganz viel Liebe vorbereitet.
                </p>

                <p>
                  Leg dein Handy jetzt kurz zur Seite und komm zu uns.
                  Wir warten schon auf dich!
                </p>

                <p class="tiny-note">
                  Persönliche Übergabe durch Passi & Luke.
                  Kuscheleinheiten inklusive. ❤️
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

            <h1>Happy 25th<br><em>Birthday!</em></h1>

            <div class="final-illustration">🐶🎁🐾</div>

            <div class="message-card">
              <p>
                25 Jahre – und noch so viele wunderschöne Abenteuer,
                Erinnerungen und besondere Momente vor dir!
              </p>

              <p>
                Wir hoffen, du hast dich über deine Überraschung gefreut.
                Du bist ein ganz besonderer Mensch und wir sind unglaublich
                glücklich, dich in unserem Leben zu haben.
              </p>

              <p>
                Für dein neues Lebensjahr wünschen wir dir ganz viel
                Glück, Gesundheit, Liebe und unzählige Gründe zum Lachen.
                Bleib genauso wundervoll, wie du bist!
              </p>

              <p>
                Auf die nächsten gemeinsamen Jahre, viele Abenteuer,
                Kuschelstunden und jede Menge schöne Erinnerungen.
              </p>

              <p class="signature">In Liebe, dein Passi ❤️</p>
              <p class="signature">Und dein kleiner Luke 🐾</p>
            </div>

            <div class="meme-line">
              25 JAHRE ALT, ABER FÜR LUKE IMMER NOCH DIE BESTE
              LECKERLI-LIEFERANTIN. ❤️
            </div>

            <div class="meme-line">
              PS: LUKE SAGT, DU DARFST IHN JETZT AUSGIEBIG KNUDDELN.
              PASSI ÜBRIGENS AUCH. ❤️
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
  styleUrl: '../styles.css'
})
export class AppComponent {
  screen: Screen = 'welcome';

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
      name: 'Peng!',
      emoji: '🔫',
      command: 'Einmal hinlegen und sich ganz tot stellen.',
      meme: 'Dramatisches Talent. Oscar-reif. Wo ist mein Käse?',
      detail: ''
    },
    {
      name: 'Schäm dich!',
      emoji: '🙈',
      command: 'Pfote über die Schnauze – wie unschuldig!',
      meme: 'Ich? Etwas angestellt? Ich weiß von nichts!',
      detail: ''
    },
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
