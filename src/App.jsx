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
  // Registration
  const [registered, setRegistered] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  // Dashboard
  const [page, setPage] = useState("Dashboard");
  const [materials, setMaterials] = useState(initialMaterials);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [message, setMessage] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState("");
const [sessions, setSessions] = useState([]);
const [sessionGoalId ,setSessionGoalId] = useState('');
const [sessionDuration, setSessionDuration] = useState('');
const [sessionStatus, setSessionStatus] = useState('Upcoming');


  // Handle registration
  const handleRegister = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setRegisterError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setRegisterError("Password must contain at least 6 characters.");
      return;
    }

    setRegisterError("");
    setRegistered(true);
  };
// My Goals feature
// My Goals feature
const [goals, setGoals] = useState(() => {
  return JSON.parse(localStorage.getItem("learntrack_goals") || "[]");
});

const [goalTitle, setGoalTitle] = useState("");
const [targetDate, setTargetDate] = useState("");

const addGoal = () => {
  if (!goalTitle.trim()) {
    alert("Please enter a learning goal.");
    return;
  }

  const newGoal = {
    id: Date.now(),
    title: goalTitle.trim(),
    targetDate: targetDate,
    completed: false,
  };

  const updatedGoals = [...goals, newGoal];

  setGoals(updatedGoals);
  localStorage.setItem(
    "learntrack_goals",
    JSON.stringify(updatedGoals)
  );

  setGoalTitle("");
  setTargetDate("");
};

const deleteGoal = (id) => {
  const updatedGoals = goals.filter((goal) => goal.id !== id);

  setGoals(updatedGoals);
  localStorage.setItem(
    "learntrack_goals",
    JSON.stringify(updatedGoals)
  );
};
// Add Study Session
  const addSession = (e) => {
    if (e) e.preventDefault();

    // Prevent blank entries
    if (!sessionGoalId.trim() || !sessionDuration.trim()) {
      setMessage("Please fill out all session fields.");
      return;
    }

    const newSession = {
      id: Date.now(),
      goalId: sessionGoalId,
      duration: sessionDuration,
      status: sessionStatus
    };

    setSessions([...sessions, newSession]);

    // Reset input fields
    setSessionGoalId('');
    setSessionDuration('');
    setSessionStatus('Upcoming');
  };
const handleLogout = () => {
  setRegistered(false);
  setName("");
setEmail("");
setPassword("");
setMessage("");
};
  // Add YouTube link
  const addYouTube = (e) => {
    e.preventDefault();

    if (!youtubeUrl.trim()) {
      setMessage("Please enter a YouTube link.");
      return;
    }

    setMaterials((previous) => [
      ...previous,
      {
        id: Date.now(),
        title: youtubeUrl,
        type: "YouTube",
      },
    ]);

    setYoutubeUrl("");
    setMessage("YouTube link added successfully.");
  };

  // Add PDF to the materials list
  const uploadPDF = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage("Please select a PDF file.");
      e.target.value = "";
      return;
    }

    setMaterials((previous) => [
      ...previous,
      {
        id: Date.now(),
        title: file.name,
        type: "PDF",
      },
    ]);

    setMessage(
      "PDF added to the list. Server upload is not connected yet."
    );

    e.target.value = "";
  };

  // Calculate quiz score
  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );

  // Search materials
  const filteredMaterials = materials.filter((material) =>
    material.title.toLowerCase().includes(search.toLowerCase())
  );

  // Restart quiz
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

  // REGISTRATION PAGE
  if (!registered) {
    return (
      <div className="register-page">
        <div className="register-card">
          <h1 className="register-logo">
            LearnTrack <span>AI</span>
          </h1>

          <p className="register-subtitle">
            Your journey to smarter learning starts here.
          </p>

          <h2>CREATE ACCOUNT</h2>
          <p>Join LearnTrack AI today.</p>

          {registerError && (
            <div className="register-error">{registerError}</div>
          )}

          <form onSubmit={handleRegister}>
            <label htmlFor="register-name">Full Name</label>
            <input
              id="register-name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="register-email">Email Address</label>
            <input
              id="register-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />

            <button type="submit" className="register-button">
              Create Account
            </button>
          </form>

          <p className="register-footer">
            LearnTrack AI — Smarter Learning. Better Results.
          </p>
        </div>
      </div>
    );
  }

  // NORMAL DASHBOARD
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
          <div className="avatar">
            {name.trim().charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{name}</strong>
            <small>{email}</small>
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
          />

          <span className="topbar-label">Learn smarter</span>
        </header>

        {message && (
          <div className="message">
            {message}
            <button onClick={() => setMessage("")}>×</button>
          </div>
        )}
        <button onClick={handleLogout}></button>

        {page === "Dashboard" && (
          <>
            <section className="welcome">
              <div>
                <p className="eyebrow">YOUR LEARNING JOURNEY</p>
                <h1>Welcome back, {name}! 👋</h1>
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
                    ? `${Math.round(
                        (score / questions.length) * 100
                      )}%`
                    : "0%"
                }
                color="orange"
              />
            </section>


      <button style={{
  backgroundColor: '#dc3545',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  cursor: 'pointer',
  float: 'right'
}}
   onClick={handleLogout}>
    Log Out</button>


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
{/* My Learning Goals */}
<section className="panel">
  <h2>My Learning Goals</h2>

  <form
    onSubmit={(e) => {
      e.preventDefault();
      addGoal();
    }}
  >
    <input
      type="text"
      placeholder="Enter your learning goal"
      value={goalTitle}
      onChange={(e) => setGoalTitle(e.target.value)}
    />

    <input
      type="date"
      value={targetDate}
      onChange={(e) => setTargetDate(e.target.value)}
    />

    <button className="button" type="submit">Add Goal</button>
  </form>

  {goals.length === 0 ? (
    <p>No learning goals yet. Add your first goal above.</p>
  ) : (
    goals.map((goal) => (
      <div key={goal.id}>
        <strong>{goal.title}</strong>

        {goal.targetDate && (
          <p>Target date: {goal.targetDate}</p>
        )}

        <button
          type="button"
          onClick={() => deleteGoal(goal.id)}
        >
          Delete
        </button>
      </div>
    ))
  )}
</section>
{/* Study Session Form */}
<section className="session-panel">
  <h2>Study Session</h2>
<form onSubmit={addSession} className="section-form">
  <input 
    type="text" 
    placeholder="Session Goal ID" 
    value={sessionGoalId} 
    onChange={(e) => setSessionGoalId(e.target.value)} 
  />
  <input 
    type="text" 
    placeholder="Duration (e.g., 45 mins)" 
    value={sessionDuration} 
    onChange={(e) => setSessionDuration(e.target.value)} 
  />
  
  {/* The button that triggers your new validation check */}
  <button onClick={addSession} type="submit" className="session-btn">Add Session</button>
  {message && <p style={{color: 'red', marginTop: '10px', className: 'error-message'}}>{message}</p>}
</form>
</section>
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
                      setMaterials((previous) =>
                        previous.filter((item) => item.id !== material.id)
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
                              setAnswers((previous) => ({
                                ...previous,
                                [questionIndex]: index,
                              }))
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
                        setQuestionIndex((previous) => previous - 1)
                      }
                    >
                      Previous
                    </button>

                    {questionIndex < questions.length - 1 ? (
                      <button
                        className="primary-button"
                        onClick={() =>
                          setQuestionIndex((previous) => previous + 1)
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
              <Stat
                title="Materials"
                value={materials.length}
                color="blue"
              />

              <Stat
                title="Quizzes Completed"
                value={submitted ? "1" : "0"}
                color="green"
              />

              <Stat
                title="Quiz Score"
                value={
                  submitted
                    ? `${Math.round(
                        (score / questions.length) * 100
                      )}%`
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