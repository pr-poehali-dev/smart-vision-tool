import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"

const QUESTIONS = [
  {
    question: "Какой пароль наиболее надёжный?",
    options: [
      "qwerty123",
      "Дата рождения + имя",
      "Случайная фраза: «ЛимонКот42#Синий»",
      "Один пароль для всех сайтов",
    ],
    correct: 2,
    explanation: "Длинная фраза из случайных слов с символами — самый надёжный вариант. Её легко запомнить, но сложно взломать.",
  },
  {
    question: "Что такое двухфакторная аутентификация (2FA)?",
    options: [
      "Два разных пароля на одном сайте",
      "Подтверждение входа через код из SMS или приложения",
      "Вход с двух устройств одновременно",
      "Секретный вопрос при регистрации",
    ],
    correct: 1,
    explanation: "2FA — это второй уровень защиты: даже если пароль украли, без кода из телефона войти не получится.",
  },
  {
    question: "Вам пришло письмо от «банка» с просьбой срочно обновить данные. Что делать?",
    options: [
      "Перейти по ссылке и ввести данные",
      "Ответить на письмо и уточнить",
      "Позвонить в банк по официальному номеру с карты",
      "Переслать письмо друзьям",
    ],
    correct: 2,
    explanation: "Фишинговые письма имитируют настоящие организации. Всегда проверяйте через официальные каналы — не по ссылкам из письма.",
  },
  {
    question: "Какой из этих параметров профиля в соцсети наиболее опасно делать публичным?",
    options: [
      "Имя и фамилия",
      "Любимые фильмы",
      "Домашний адрес и телефон",
      "Фото аватара",
    ],
    correct: 2,
    explanation: "Домашний адрес и телефон в открытом доступе — прямой риск. Мошенники используют эти данные для звонков и физической слежки.",
  },
  {
    question: "Вы подключились к бесплатному Wi-Fi в кафе. Что безопасно делать?",
    options: [
      "Входить в интернет-банк",
      "Совершать покупки онлайн",
      "Читать новости и смотреть видео",
      "Отправлять пароли в мессенджерах",
    ],
    correct: 2,
    explanation: "В публичных сетях трафик может перехватываться. Для чтения новостей это не страшно, но банки и пароли — только через VPN или мобильный интернет.",
  },
]

const SCORE_LABELS = [
  { min: 0, max: 1, label: "Начинающий", desc: "Самое время разобраться с основами — начни с нашего чек-листа!", color: "text-red-300" },
  { min: 2, max: 3, label: "Осведомлённый", desc: "Хорошая база! Есть пробелы — изучи раздел с инструментами.", color: "text-yellow-300" },
  { min: 4, max: 5, label: "Эксперт", desc: "Отлично! Ты знаешь, как защитить себя в сети. Поделись с друзьями!", color: "text-green-300" },
]

export function QuizSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.2)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answered, setAnswered] = useState(false)

  const q = QUESTIONS[current]

  const handleAnswer = (idx: number) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    if (idx === q.correct) setScore((s) => s + 1)
  }

  const handleNext = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setFinished(true)
    }
  }

  const handleRestart = () => {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
    setAnswered(false)
  }

  const scoreLabel = SCORE_LABELS.find((s) => score >= s.min && score <= s.max)!

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-3xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Тест
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ 5 вопросов о вашей безопасности</p>
        </div>

        {!finished ? (
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Progress */}
            <div className="mb-6 flex items-center gap-3">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    i < current ? "bg-foreground/70" : i === current ? "bg-foreground" : "bg-foreground/20"
                  }`}
                />
              ))}
              <span className="ml-2 font-mono text-xs text-foreground/50">{current + 1}/5</span>
            </div>

            {/* Question */}
            <p className="mb-6 text-lg font-light leading-snug text-foreground md:text-2xl">{q.question}</p>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {q.options.map((opt, i) => {
                let cls = "border border-foreground/20 bg-foreground/5 text-foreground/80 hover:bg-foreground/10 hover:border-foreground/40"
                if (answered) {
                  if (i === q.correct) cls = "border border-green-400/60 bg-green-400/10 text-foreground"
                  else if (i === selected && i !== q.correct) cls = "border border-red-400/50 bg-red-400/10 text-foreground/60"
                  else cls = "border border-foreground/10 bg-foreground/3 text-foreground/40"
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className={`w-full rounded-xl px-4 py-3 text-left text-sm transition-all duration-200 backdrop-blur-sm md:text-base ${cls}`}
                  >
                    <span className="mr-3 font-mono text-xs text-foreground/40">{String.fromCharCode(65 + i)}</span>
                    {opt}
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {answered && (
              <div className="mb-6 rounded-xl border border-foreground/15 bg-foreground/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-sm leading-relaxed text-foreground/80 md:text-base">
                  <span className="mr-2 font-mono text-xs text-foreground/50">💡</span>
                  {q.explanation}
                </p>
              </div>
            )}

            {answered && (
              <MagneticButton variant="primary" size="lg" onClick={handleNext}>
                {current < QUESTIONS.length - 1 ? "Следующий вопрос" : "Узнать результат"}
              </MagneticButton>
            )}
          </div>
        ) : (
          <div
            className={`transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-sans text-8xl font-light text-foreground md:text-9xl">{score}</span>
              <span className="font-mono text-lg text-foreground/40">/ 5</span>
            </div>
            <p className={`mb-2 text-2xl font-light md:text-3xl ${scoreLabel.color}`}>{scoreLabel.label}</p>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-foreground/70 md:text-base">{scoreLabel.desc}</p>
            <div className="flex flex-wrap gap-3">
              <MagneticButton variant="primary" size="lg" onClick={() => scrollToSection?.(2)}>
                <Icon name="ShieldCheck" size={16} />
                Пройти чек-лист
              </MagneticButton>
              <MagneticButton variant="secondary" size="lg" onClick={handleRestart}>
                <Icon name="RotateCcw" size={16} />
                Пройти снова
              </MagneticButton>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
