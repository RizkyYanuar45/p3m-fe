import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Button,
  ListGroup,
} from "react-bootstrap";
import Herosection from "../components/Herosection";
import Faqcomp from "../components/Faqcomp";

const api = import.meta.env.VITE_API_URL;

// Helper function untuk merender daftar dokumen
// Properti disesuaikan dengan respons API: file_name dan file_url
const renderDocumentList = (data) => (
  <ListGroup variant="flush">
    {data.map((doc) => (
      <ListGroup.Item
        key={doc.id}
        className="d-flex justify-content-between align-items-center"
      >
        <span>{doc.file_name}</span>
        <Button
          variant="danger"
          size="sm"
          href={doc.file_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: "#e85a0e", borderColor: "#e85a0e" }}
        >
          Lihat Dokumen
        </Button>
      </ListGroup.Item>
    ))}
  </ListGroup>
);

const DokumenPenelitian = () => {
  // State untuk data yang sudah dikelompokkan, loading, dan error
  const [groupedData, setGroupedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAndGroupData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${api}/dokumenpen/`);
        if (!response.ok) {
          throw new Error("Gagal memuat data dari server.");
        }
        const documents = await response.json();

        // Logika untuk mengelompokkan dokumen berdasarkan kategori
        const groups = documents.reduce((acc, doc) => {
          const categoryName = doc.kategori.name;
          if (!acc[categoryName]) {
            acc[categoryName] = {
              id: doc.kategori.id,
              name: categoryName,
              documents: [],
            };
          }
          acc[categoryName].documents.push(doc);
          return acc;
        }, {});

        // Ubah objek grup menjadi array dan simpan ke state
        setGroupedData(Object.values(groups));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAndGroupData();
  }, []); // Dependency array kosong agar hanya berjalan sekali

  const renderAccordion = () => {
    if (loading) {
      return <p className="text-center">Memuat dokumen...</p>;
    }
    if (error) {
      return <p className="text-center text-danger">{error}</p>;
    }
    if (groupedData.length === 0) {
      return <p className="text-center">Tidak ada dokumen yang ditemukan.</p>;
    }

    return (
      <Accordion alwaysOpen flush>
        {groupedData.map((category) => (
          <Accordion.Item eventKey={category.id.toString()} key={category.id}>
            <Accordion.Header>{category.name}</Accordion.Header>
            <Accordion.Body>
              {renderDocumentList(category.documents)}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    );
  };

  return (
    <div className="dokumen-page">
      <Herosection title={"Pusat Dokumen P3M"} />

      <div className="dokumen-content py-5">
        <Container>
          <Row className="mb-5">
            <Col className="text-center">
              <h1 className="fw-bold">Dokumen Penelitian & Pengabdian</h1>
              <p className="text-muted">
                Temukan semua dokumen, template, dan form penting di sini.
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* Panggil fungsi render dinamis */}
              {renderAccordion()}
            </Col>
          </Row>
        </Container>
      </div>

      <Faqcomp />
    </div>
  );
};

export default DokumenPenelitian;
