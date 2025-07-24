import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

// Anda bisa mengganti data ini dengan data dari API atau props
const articleData = {
  title: "Menguasai React Bootstrap dalam Satu Jam",
  author: "Budi Sanjaya",
  publishedDate: "24 Juli 2025",
  thumbnailUrl: "https://picsum.photos/seed/picsum/1200/600", // URL gambar placeholder
  content: `
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et dapibus leo, et varius sem. 
      Phasellus vitae consequat nisi. Proin ut lorem nunc. Curabitur maximus, turpis quis vehicula 
      fringilla, velit justo blandit purus, ac suscipit odio elit vitae sapien. Duis non massa et 
      nibh commodo maximus.
    </p>
    <p>
      Nullam ac urna et felis ultricies fermentum. Sed nec enim non odio faucibus tristique. 
      Vivamus ut justo id elit feugiat consequat. Integer eget elit in elit scelerisque tincidunt 
      vel eu sem. Cras egestas, dolor eu viverra vehicula, felis magna faucibus mi, et mattis 
      massa erat a est.
    </p>
    <p>
      Donec facilisis, risus et sollicitudin egestas, magna magna sollicitudin arcu, at vehicula 
      nisl sem eu orci. In hac habitasse platea dictumst. Curabitur ac tincidunt velit, vel 
      elementum arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada 
      fames ac turpis egestas.
    </p>
  `,
};

const ArticlePage = () => {
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          {/* Judul Artikel */}
          <h1 className="text-center mb-3 fw-bold">{articleData.title}</h1>

          {/* Meta Info: Penulis dan Tanggal Terbit */}
          <div className="text-center text-muted mb-4">
            <span>
              Oleh: <strong>{articleData.author}</strong>
            </span>
            <span className="mx-2">|</span>
            <span>Diterbitkan pada: {articleData.publishedDate}</span>
          </div>

          {/* Thumbnail Artikel */}
          <Image
            src={articleData.thumbnailUrl}
            alt="Article Thumbnail"
            fluid
            rounded
            className="mb-4 shadow-sm"
          />

          {/* Konten Artikel */}
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: articleData.content }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ArticlePage;
