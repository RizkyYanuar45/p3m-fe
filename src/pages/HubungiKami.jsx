import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";

export default function HubungiKami() {
  return (
    <div className="hubungi-kami py-5">
      <Container>
        {/* Judul Halaman */}
        <Row className="mb-4">
          <Col className="text-center">
            <h2>Lokasi & Kontak Kami</h2>
            <p className="lead">
              Kami siap membantu Anda. Kunjungi lokasi kami atau hubungi kami
              melalui kontak di bawah ini.
            </p>
          </Col>
        </Row>

        {/* Google Maps Iframe */}
        <Row className="justify-content-center mb-5">
          <Col md={10} lg={8}>
            {/* CATATAN: URL Peta ini hanya contoh, ganti dengan URL "Embed a map" dari Google Maps Anda */}
            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1110.043413880104!2d112.46293391089424!3d-7.493376773956718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e780d0a536939db%3A0xc5f96b1753d7b9e1!2sGedung%20Al%20Hambra%20FKIP%20UNIM!5e0!3m2!1sid!2sid!4v1753805545446!5m2!1sid!2sid"
                title="Lokasi Kami"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>

        {/* Tabel Kontak */}
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th className="w-25">Hubungi Via</th>
                  <th>Kontak / Keterangan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>📍 Alamat</td>
                  <td>
                    Tambak Rejo, Gayaman, Kec. Mojoanyar, Kabupaten Mojokerto,
                    Jawa Timur 61364
                  </td>
                </tr>
                <tr>
                  <td>📞 Telepon</td>
                  <td>(031) 123-4567</td>
                </tr>
                <tr>
                  <td>📧 Email</td>
                  <td>kontak.kami@example.com</td>
                </tr>
                <tr>
                  <td>🕒 Jam Kerja</td>
                  <td>Senin - Jumat (08:00 - 16:00 WIB)</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
