import { useNavigate } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Row,
  Col,
  Card
} from "react-bootstrap";
import "../Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* Navbar */}
      <Navbar expand="lg" className="home-navbar">
        <Container>
          <Navbar.Brand className="home-brand">
            💰 Expense Tracker
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="expense-navbar" />

          <Navbar.Collapse id="expense-navbar">
            <Nav className="ms-auto align-items-lg-center gap-3 mt-3 mt-lg-0">
              <Button
                variant="success"
                onClick={() => navigate("/")}
              >
                Home
              </Button>

              <Button
                variant="outline-light"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>

              <Button
                variant="danger"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <Container className="home-hero">
        <Row className="align-items-center g-5">

          <Col lg={6}>
            <p className="home-tagline">
              MANAGE YOUR FINANCES
            </p>

            <h1 className="home-title">
              Personal Expense{" "}
              <span>Tracker</span>
            </h1>

            <p className="home-description">
              Take control of your money. Track your expenses,
              manage your budget and build a better financial future.
            </p>

            <Button
              variant="success"
              size="lg"
              className="me-3 mb-2 home-button"
              onClick={() => navigate("/register")}
            >
              Get Started →
            </Button>

            <Button
              variant="outline-light"
              size="lg"
              className="mb-2 home-button"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Col>

          {/* Expense Preview */}
          <Col lg={6}>
            <Card className="expense-preview">
              <Card.Body className="p-4 p-md-5">

                <div className="text-center">
                  <div className="money-icon">💵</div>

                  <h2 className="preview-title">
                    Track Every Rupee!
                  </h2>

                  <p className="preview-description">
                    Spend wisely. Save more.
                  </p>
                </div>

                <div className="expense-item">
                  <span>🍔 Food</span>
                  <strong>₹250</strong>
                </div>

                <div className="expense-item">
                  <span>🚌 Transport</span>
                  <strong>₹100</strong>
                </div>

                <div className="expense-item">
                  <span>🛍️ Shopping</span>
                  <strong>₹500</strong>
                </div>

                <div className="expense-item">
                  <span>🏠 Bills</span>
                  <strong>₹800</strong>
                </div>

              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>

      {/* Features Section */}
      <section className="home-features">
        <Container>

          <div className="text-center mb-5">
            <p className="home-tagline">FEATURES</p>

            <h2 className="features-title">
              Everything You Need to Manage Money
            </h2>

            <p className="features-description">
              Simple tools to help you build better financial habits.
            </p>
          </div>

          <Row className="g-4">

            <Col md={4}>
              <Card className="feature-card feature-green">
                <Card.Body>
                  <div className="feature-icon">📊</div>

                  <Card.Title>Track Expenses</Card.Title>

                  <Card.Text>
                    Record your daily spending and keep track of your money.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="feature-card feature-purple">
                <Card.Body>
                  <div className="feature-icon">🎯</div>

                  <Card.Title>Manage Budget</Card.Title>

                  <Card.Text>
                    Plan your budget and stay within your spending limits.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="feature-card feature-orange">
                <Card.Body>
                  <div className="feature-icon">📈</div>

                  <Card.Title>View Spending</Card.Title>

                  <Card.Text>
                    Understand your spending habits and make better decisions.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        💚 Better Habits <span>|</span> More Savings
        <span>|</span> A Brighter Future
      </footer>

    </div>
  );
}

export default Home;