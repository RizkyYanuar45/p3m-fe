import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { panduanPengabdianKepadaMasyarakat as initialData } from "../../data/panduanPengabdianKepadaMasyarakat";

const CrudProgramPanduan = () => {
  // --- STATE DAN LOGIKA UNTUK PANDUAN PENGABDIAN MASYARAKAT ---
  const [panduanData, setPanduanData] = useState(initialData || []);
  const [panduanForm, setPanduanForm] = useState({
    title: "",
    description: "",
    date: "",
    urlDrive: "",
  });
  const [panduanEditIndex, setPanduanEditIndex] = useState(null);

  const handlePanduanChange = (e) => {
    setPanduanForm({ ...panduanForm, [e.target.name]: e.target.value });
  };

  const handlePanduanSubmit = (e) => {
    e.preventDefault();
    if (panduanEditIndex !== null) {
      const updated = [...panduanData];
      updated[panduanEditIndex] = {
        ...panduanForm,
        id: updated[panduanEditIndex].id,
      };
      setPanduanData(updated);
      setPanduanEditIndex(null);
    } else {
      setPanduanData([...panduanData, { ...panduanForm, id: Date.now() }]);
    }
    setPanduanForm({ title: "", description: "", date: "", urlDrive: "" });
  };

  const handlePanduanEdit = (item, index) => {
    setPanduanForm(item);
    setPanduanEditIndex(index);
  };

  const handlePanduanDelete = (index) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setPanduanData(panduanData.filter((_, i) => i !== index));
      if (panduanEditIndex === index) {
        setPanduanEditIndex(null);
        setPanduanForm({ title: "", description: "", date: "", urlDrive: "" });
      }
    }
  };

  // --- STATE DAN LOGIKA UNTUK INFORMASI PENELITIAN (DENGAN QUILL) ---
  const [penelitianData, setPenelitianData] = useState([
    {
      id: 1,
      judul: "Penelitian A",
      deskripsi: "<p>Deskripsi <strong>Penelitian A</strong></p>",
    },
    {
      id: 2,
      judul: "Penelitian B",
      deskripsi: "<p>Deskripsi <em>Penelitian B</em></p>",
    },
  ]);
  const [penelitianForm, setPenelitianForm] = useState({ judul: "" });
  const [penelitianEditId, setPenelitianEditId] = useState(null);

  const quillEditorRef = useRef(null);
  const quillInstanceRef = useRef(null);

  useEffect(() => {
    if (quillEditorRef.current && !quillInstanceRef.current) {
      const quill = new Quill(quillEditorRef.current, {
        theme: "snow",
        modules: { toolbar: [["bold", "italic", "underline"], ["link"]] },
        placeholder: "Tulis deskripsi penelitian di sini...",
      });
      quillInstanceRef.current = quill;
    }
  }, []);

  const handlePenelitianChange = (e) => {
    setPenelitianForm({ ...penelitianForm, [e.target.name]: e.target.value });
  };

  const handlePenelitianSubmit = (e) => {
    e.preventDefault();
    const deskripsi = quillInstanceRef.current.root.innerHTML;
    const finalForm = { ...penelitianForm, deskripsi };

    if (penelitianEditId) {
      setPenelitianData(
        penelitianData.map((item) =>
          item.id === penelitianEditId ? { ...item, ...finalForm } : item
        )
      );
      setPenelitianEditId(null);
    } else {
      setPenelitianData([...penelitianData, { id: Date.now(), ...finalForm }]);
    }

    setPenelitianForm({ judul: "" });
    quillInstanceRef.current.setText("");
  };

  const handlePenelitianEdit = (item) => {
    setPenelitianForm({ judul: item.judul });
    quillInstanceRef.current.root.innerHTML = item.deskripsi;
    setPenelitianEditId(item.id);
  };

  const handlePenelitianDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setPenelitianData(penelitianData.filter((item) => item.id !== id));
      if (penelitianEditId === id) {
        setPenelitianEditId(null);
        setPenelitianForm({ judul: "" });
        quillInstanceRef.current.setText("");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* --- BAGIAN CRUD PANDUAN --- */}
      <div style={{ marginBottom: "40px" }}>
        <h3>Program Pengabdian Kepada Masyarakat Mandiri</h3>
        <form
          onSubmit={handlePanduanSubmit}
          style={{
            marginBottom: 16,
            background: "#f9f9f9",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <input
            name="title"
            placeholder="Judul"
            value={panduanForm.title}
            onChange={handlePanduanChange}
            required
          />
          <input
            name="description"
            placeholder="Deskripsi"
            value={panduanForm.description}
            onChange={handlePanduanChange}
            required
          />
          <input
            name="date"
            placeholder="Tanggal"
            value={panduanForm.date}
            onChange={handlePanduanChange}
            required
          />
          <input
            name="urlDrive"
            placeholder="URL Drive"
            value={panduanForm.urlDrive}
            onChange={handlePanduanChange}
            required
          />
          <button type="submit">
            {panduanEditIndex !== null ? "Simpan" : "Tambah"}
          </button>
          {panduanEditIndex !== null && (
            <button
              type="button"
              onClick={() => {
                setPanduanEditIndex(null);
                setPanduanForm({
                  title: "",
                  description: "",
                  date: "",
                  urlDrive: "",
                });
              }}
            >
              Batal
            </button>
          )}
        </form>
        <table border="1" cellPadding="8" style={{ width: "100%" }}>
          {/* ... Tabel Panduan ... */}
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Tanggal</th>
              <th>URL</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {panduanData.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.date}</td>
                <td>
                  <a
                    href={item.urlDrive}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                </td>
                <td>
                  <button onClick={() => handlePanduanEdit(item, idx)}>
                    Edit
                  </button>
                  <button onClick={() => handlePanduanDelete(idx)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr />

      {/* --- BAGIAN CRUD PENELITIAN DENGAN QUILL --- */}
      <div style={{ marginTop: "40px" }}>
        <h3>Informasi Penelitian</h3>
        <form
          onSubmit={handlePenelitianSubmit}
          style={{
            marginBottom: 24,
            background: "#f5f5f5",
            padding: 16,
            borderRadius: 8,
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 4 }}>Judul:</label>
            <input
              type="text"
              name="judul"
              value={penelitianForm.judul}
              onChange={handlePenelitianChange}
              required
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 4 }}>
              Deskripsi:
            </label>
            <div
              ref={quillEditorRef}
              style={{ background: "#fff", minHeight: "150px" }}
            ></div>
          </div>
          <button
            type="submit"
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "8px 20px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {penelitianEditId ? "Update" : "Tambah"}
          </button>
          {/* ... Tombol Batal untuk Penelitian ... */}
        </form>
        <table border="1" cellPadding="8" style={{ width: "100%" }}>
          {/* ... Tabel Penelitian ... */}
          <thead>
            <tr>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {penelitianData.map((item) => (
              <tr key={item.id}>
                <td>{item.judul}</td>
                <td>
                  <div dangerouslySetInnerHTML={{ __html: item.deskripsi }} />
                </td>
                <td>
                  <button onClick={() => handlePenelitianEdit(item)}>
                    Edit
                  </button>
                  <button onClick={() => handlePenelitianDelete(item.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrudProgramPanduan;
