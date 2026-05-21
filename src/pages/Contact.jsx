import ContactForm from '../ContactForm';
import ContactImage from '../assets/poza.png';

function Contact() {
    return (
        <section
            className="page-card contact-page"
            style={{
                backgroundImage: `linear-gradient(
          90deg,
          rgba(7, 7, 12, 0.98) 0%,
          rgba(7, 7, 12, 0.96) 42%,
          rgba(7, 7, 12, 0.85) 58%,
          rgba(7, 7, 12, 0.28) 100%
        ), url(${ContactImage})`,
            }}
        >
            <div className="contact-content">
                <div className="page-heading">
                    <p className="eyebrow">Formular controlat</p>
                    <h2>Contact</h2>
                    <p>
                        Completează formularul de mai jos. Datele sunt controlate prin state în React.
                    </p>
                </div>

                <ContactForm />
            </div>
        </section>
    );
}

export default Contact;