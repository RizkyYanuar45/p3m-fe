
import { Col } from 'react-bootstrap';

const ArticleCard = ({ image, title, author, date, excerpt, delay }) => {
  return (
    <Col
      md={4} // 3 kolom untuk layar menengah dan besar
      lg={4} // (12 / 4 = 3)
      className="shadow-sm rounded-3 p-3 mb-4 mx-2"
      data-aos="fade-up"
      data-aos-delay={delay}
      data-aos-duration="1000"
    >
      <img
        src={image}
        alt={title}
        className="rounded-3 mb-3 img-fluid"
        style={{ maxHeight: "200px", objectFit: "cover", width: "100%" }}
      />
      <h5 className="fw-bold mb-2">{title}</h5>
      <p className="text-muted mb-3">
        {author} | {date}
      </p>
      <p className="mb-4">{excerpt}</p>
      <div className="d-grid">
        <button className="btn btn-primary rounded-1">
          Baca Selengkapnya
        </button>
      </div>
    </Col>
  );
};

export default ArticleCard;