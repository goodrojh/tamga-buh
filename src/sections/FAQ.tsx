const questions = [
  {
    question: 'Можете принять учёт от нашего бухгалтера?',
    answer: 'Да. Согласуем дату перехода, список документов и доступов. Проверим текущие данные и определим ближайшие сроки по налогам, зарплате и отчётности.',
  },
  {
    question: 'Как определяется ежемесячная стоимость?',
    answer: 'Уточняем налоговый режим, количество сотрудников и объём операций. Перечень работ и стоимость закрепляем в договоре.',
  },
  {
    question: 'Можно работать с вами из другого региона?',
    answer: 'Да, ведём бухгалтерию удалённо по всей России. На старте договоримся, как передавать документы и связываться с бухгалтером.',
  },
  {
    question: 'Что делать, если меняется штат?',
    answer: 'Сообщайте бухгалтеру о приёме и увольнении сотрудников, отпусках и больничных. Согласуем, какие кадровые документы понадобятся и к какому сроку их передать.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="bg-white px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-8 font-display text-3xl font-semibold leading-tight text-night md:text-5xl">
          Вопросы о сопровождении
        </h2>
        {questions.map(({ question, answer }) => (
          <details key={question} className="border-b border-gray-200 py-5">
            <summary className="cursor-pointer font-semibold text-night">{question}</summary>
            <p className="mt-3 leading-relaxed text-gray-600">{answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
