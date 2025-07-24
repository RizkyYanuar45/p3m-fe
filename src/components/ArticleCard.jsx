const ArticleCard = ({ image, title, author, date, excerpt, delay }) => {
  return (
    <div
      className="shadow-sm rounded-3 p-3 d-flex flex-column"
      style={{ height: "100%" }}
      data-aos="fade-up"
      data-aos-delay={delay}
      data-aos-duration="1000"
    >
      <img
        src={image}
        alt={title}
        className="rounded-3 mb-3 img-fluid"
        style={{ maxHeight: "200px", objectFit: "cover" }} // width: 100% sudah di-handle oleh img-fluid
      />
      <h5 className="fw-bold mb-2">{title}</h5>
      <p className="text-muted mb-3">
        {author} | {date}
      </p>
      <p>{excerpt}</p>

      <div className="d-grid mt-auto">
        <button className="btn btn-primary rounded-1">Baca Selengkapnya</button>
      </div>
    </div>
  );
};

export default ArticleCard;
