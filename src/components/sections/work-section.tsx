import { useReveal } from "@/hooks/use-reveal"

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-full shrink-0 items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Угрозы
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Актуальные риски в соцсетях</p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {[
            {
              number: "01",
              title: "Взлом аккаунта",
              category: "Фишинг, подбор паролей, утечки данных",
              desc: "Злоумышленники рассылают поддельные страницы входа или используют слитые базы паролей. Ваш аккаунт могут угнать за минуты.",
              year: "Риск #1",
              direction: "left",
            },
            {
              number: "02",
              title: "Кража личности",
              category: "Сбор персональных данных из открытых профилей",
              desc: "Имя, дата рождения, город, фото — всё это в открытом профиле позволяет мошенникам создать поддельную личность или взять кредит.",
              year: "Риск #2",
              direction: "right",
            },
            {
              number: "03",
              title: "Слежка и доксинг",
              category: "Геолокация, деанонимизация, сталкинг",
              desc: "Геотеги на фото, чекины и отметки друзей могут раскрыть ваш адрес. Доксинг — публичное раскрытие личных данных — стал инструментом давления.",
              year: "Риск #3",
              direction: "left",
            },
          ].map((project, i) => (
            <ProjectCard key={i} project={project} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: { number: string; title: string; category: string; desc: string; year: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group border-b border-foreground/10 py-5 transition-all duration-700 hover:border-foreground/20 md:py-6 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "85%" : "90%",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-baseline gap-4 md:gap-8">
          <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base shrink-0">
            {project.number}
          </span>
          <div>
            <h3 className="mb-1 font-sans text-xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-2xl lg:text-3xl">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-foreground/50 md:text-sm mb-2">{project.category}</p>
            <p className="max-w-lg text-sm leading-relaxed text-foreground/60">{project.desc}</p>
          </div>
        </div>
        <span className="font-mono text-xs text-foreground/30 shrink-0 md:text-sm">{project.year}</span>
      </div>
    </div>
  )
}