import React, { useState } from "react";
import "./App.css";

const initialMaterials = [
  { id: 1, title: "Introduction to React", type: "PDF" },
  { id: 2, title: "HTML and CSS for Beginners", type: "YouTube" },
  { id: 3, title: "JavaScript Fundamentals", type: "PDF" },
];

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyper Tool Multi Language",
    ],
    answer: 1,
  },
  {
    question: "Which language styles a webpage?",
    options: ["HTML", "Python", "CSS", "SQL"],
    answer: 2,
  },
  {
    question: "Which technology helps build reusable interfaces?",
    options: ["React", "Excel", "Paint", "Notepad"],
    answer: 0,
  },
];

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [materials, setMaterials] = useState(initialMaterials);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [message, setMessage] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState("");

  const addYouTube = (e) => {
    e.preventDefault();

    if (!youtubeUrl.trim()) {
      setMessage("Please enter a YouTube link.");
      return;
    }

    setMaterials([
      ...materials,
      {
        id: Date.now(),
        title: youtubeUrl,
        type: "YouTube",
      },
    ]);

    setYoutubeUrl("");
    setMessage("YouTube link added successfully.");
  };

  const uploadPDF = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage("Please select a PDF file.");
      return;
    }

    setMaterials([
      ...materials,
      {
        id: Date.now(),
        title: file.name,
        type: "PDF",
      },
    ]);

    setMessage(
      "PDF added to the list. Server upload is not connected yet."
    );
  };

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );

  const filteredMaterials = materials.filter((material) =>
    material.title.toLowerCase().includes(search.toLowerCase())
  );

  const restartQuiz = () => {
    setQuestionIndex(0);
    setAnswers({});
    setSubmitted(false);
  };

  const navigation = [
    "Dashboard",
    "My Materials",
    "AI Summaries",
    "Quizzes",
    "Progress",
  ];

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">
          LearnTrack <span>AI</span>
        </h2>

        <p className="nav-heading">MENU</p>

        {navigation.map((item) => (
          <button
            key={item}
            className={`nav-button ${page === item ? "active" : ""}`}
            onClick={() => {
              setPage(item);
              setMessage("");
            }}
          >
            {item}
          </button>
        ))}

        <div className="profile">
          <div className="avatar">S</div>
          <div>
            <strong>Student</strong>
            <small>Learning account</small>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <input
            type="search"
            placeholder="Search learning materials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{pointerEvents: 'auto'}}
          />
          <span className="topbar-label">Always on track</span>
        </header>

        {message && (
          <div className="message">
            {message}
            <button onClick={() => setMessage("")}>×</button>
          </div>
        )}

        {page === "Dashboard" && (
          <>
            <section className="welcome">
              <div>
                <p className="eyebrow">YOUR LEARNING JOURNEY</p>
                <h1>Welcome back! 👋</h1>
                <p>
                  Organise your learning and make progress every day.
                </p>
              </div>

              <button
                className="primary-button"
                onClick={() => setPage("My Materials")}
              >
                + Add Material
              </button>
            </section>

            <section className="stats">
              <Stat
                title="Total Materials"
                value={materials.length}
                color="blue"
              />
              <Stat
                title="Summaries Created"
                value="2"
                color="purple"
              />
              <Stat
                title="Quizzes Completed"
                value={submitted ? "1" : "0"}
                color="green"
              />
              <Stat
                title="Quiz Progress"
                value={
                  submitted
                    ? `${Math.round((score / questions.length) * 100)}%`
                    : "0%"
                }
                color="orange"
              />
            </section>

            <section className="section">
              <div className="section-header">
                <div>
                  <h2>Continue Learning</h2>
                  <p>Access your recent learning materials.</p>
                </div>

                <button
                  className="text-button"
                  onClick={() => setPage("My Materials")}
                >
                  View All →
                </button>
              </div>

              <div className="material-grid">
                {filteredMaterials.slice(0, 3).map((material) => (
                  <div className="material-card" key={material.id}>
                    <div className="material-icon">
                      {material.type === "PDF" ? "PDF" : "▶"}
                    </div>

                    <h3>{material.title}</h3>
                    <p>{material.type}</p>

                    <button
                      className="secondary-button"
                      onClick={() => setPage("AI Summaries")}
                    >
                      Open Material
                    </button>
                  </div>
                ))}

                {filteredMaterials.length === 0 && (
                  <p>No materials found.</p>
                )}
              </div>
            </section>

            <section className="panel">
              <h2>Your Learning Goal</h2>
              <p>
                Add learning materials, review summaries, and take quizzes
                to improve your knowledge.
              </p>
              <button
                className="primary-button"
                onClick={() => setPage("Quizzes")}
              >
                Start a Quiz
              </button>
            </section>
          </>
        )}

        {page === "My Materials" && (
          <>
            <PageHeading
              title="My Materials"
              subtitle="Add and organise your learning resources."
            />

            <section className="upload-grid">
              <div className="panel">
                <h2>Upload a PDF</h2>
                <p>Select a PDF document from your computer.</p>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={uploadPDF}
                />
              </div>

              <div className="panel">
                <h2>Add a YouTube Link</h2>
                <form onSubmit={addYouTube}>
                  <input
                    type="url"
                    placeholder="Paste YouTube URL here"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    required
                  />
                  <button className="primary-button" type="submit">
                    Add Link
                  </button>
                </form>
              </div>
            </section>

            <section className="panel">
              <h2>My Learning Library</h2>

              {filteredMaterials.map((material) => (
                <div className="library-item" key={material.id}>
                  <div>
                    <strong>{material.title}</strong>
                    <small>{material.type}</small>
                  </div>

                  <button
                    className="text-button"
                    onClick={() => setPage("AI Summaries")}
                  >
                    View Summary
                  </button>

                  <button
                    className="remove-button"
                    onClick={() =>
                      setMaterials(
                        materials.filter((item) => item.id !== material.id)
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}

              {filteredMaterials.length === 0 && (
                <p>No materials found. Add a resource to get started.</p>
              )}
            </section>
          </>
        )}

        {page === "AI Summaries" && (
          <>
            <PageHeading
              title="AI Summaries"
              subtitle="Review important ideas from your learning materials."
            />

            <section className="panel summary-panel">
              <p className="eyebrow">SAMPLE SUMMARY</p>
              <h2>Introduction to Web Development</h2>

              <p>
                Web development is the process of building websites and
                web applications. Three important technologies are HTML,
                CSS, and JavaScript.
              </p>

              <div className="summary-point">
                <h3>HTML — Structure</h3>
                <p>
                  HTML organises webpage content using headings, paragraphs,
                  links, images, and other elements.
                </p>
              </div>

              <div className="summary-point">
                <h3>CSS — Design</h3>
                <p>
                  CSS controls colours, spacing, fonts, and webpage layouts.
                </p>
              </div>

              <div className="summary-point">
                <h3>JavaScript — Interactivity</h3>
                <p>
                  JavaScript makes websites interactive and responsive to
                  user actions.
                </p>
              </div>

              <p className="notice">
                This is sample text. Real AI summaries require backend and
                AI service integration.
              </p>

              <button
                className="primary-button"
                onClick={() => setPage("Quizzes")}
              >
                Test Your Knowledge
              </button>
            </section>
          </>
        )}

        {page === "Quizzes" && (
          <>
            <PageHeading
              title="Practice Quizzes"
              subtitle="Test your knowledge and check your answers."
            />

            <section className="panel quiz-panel">
              {!submitted ? (
                <>
                  <div className="quiz-top">
                    <span>Web Development Basics</span>
                    <span>
                      Question {questionIndex + 1} of {questions.length}
                    </span>
                  </div>

                  <div className="progress-bar">
                    <div
                      style={{
                        width: `${
                          ((questionIndex + 1) / questions.length) * 100
                        }%`,
                      }}
                    />
                  </div>

                  <h2>{questions[questionIndex].question}</h2>

                  <div className="options">
                    {questions[questionIndex].options.map(
                      (option, index) => (
                        <label className="option" key={option}>
                          <input
                            type="radio"
                            name={`question-${questionIndex}`}
                            checked={answers[questionIndex] === index}
                            onChange={() =>
                              setAnswers({
                                ...answers,
                                [questionIndex]: index,
                              })
                            }
                          />
                          {option}
                        </label>
                      )
                    )}
                  </div>

                  <div className="quiz-actions">
                    <button
                      className="secondary-button"
                      disabled={questionIndex === 0}
                      onClick={() =>
                        setQuestionIndex(questionIndex - 1)
                      }
                    >
                      Previous
                    </button>

                    {questionIndex < questions.length - 1 ? (
                      <button
                        className="primary-button"
                        onClick={() =>
                          setQuestionIndex(questionIndex + 1)
                        }
                      >
                        Next Question
                      </button>
                    ) : (
                      <button
                        className="primary-button"
                        onClick={() => setSubmitted(true)}
                      >
                        Submit Quiz
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="result">
                  <h2>Quiz Completed!</h2>
                  <p>
                    Your score: {score} out of {questions.length}
                  </p>
                  <p>
                    Percentage:{" "}
                    {Math.round((score / questions.length) * 100)}%
                  </p>

                  <button
                    className="primary-button"
                    onClick={restartQuiz}
                  >
                    Try Again
                  </button>

                  <button
                    className="secondary-button"
                    onClick={() => setPage("AI Summaries")}
                  >
                    Review Summary
                  </button>
                </div>
              )}
            </section>
          </>
        )}

        {page === "Progress" && (
          <>
            <PageHeading
              title="Learning Progress"
              subtitle="Monitor your learning activities and quiz results."
            />

            <section className="stats">
              <Stat title="Materials" value={materials.length} color="blue" />
              <Stat
                title="Quizzes Completed"
                value={submitted ? "1" : "0"}
                color="green"
              />
              <Stat
                title="Quiz Score"
                value={
                  submitted
                    ? `${Math.round((score / questions.length) * 100)}%`
                    : "—"
                }
                color="purple"
              />
            </section>

            <section className="panel">
              <h2>Keep Learning!</h2>
              <p>
                Continue studying, reviewing summaries, and taking quizzes
                to improve your results.
              </p>

              <button
                className="primary-button"
                onClick={() => setPage("Quizzes")}
              >
                Take a Quiz
              </button>
            </section>
          </>
        )}

        <footer>
          <strong>LearnTrack AI</strong>
          <span>Smarter Learning. Better Results.</span>
        </footer>
      </main>
    </div>
  );
}

function Stat({ title, value, color }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>✦</div>
      <p>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

function PageHeading({ title, subtitle }) {
  return (
    <div className="page-heading">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  );
}

function restartQuiz() {
  window.location.reload();
}
