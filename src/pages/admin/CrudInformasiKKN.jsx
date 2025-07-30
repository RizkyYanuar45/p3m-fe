import { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const initialForm = {
  judul: "",
  deskripsi: "",
  tanggal: "",
  link: "",
  namaDosen: "",
};

const CrudInformasiKKN = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editIndex, setEditIndex] = useState(null);

  // Ref untuk DOM element dan instance Quill
  const quillEditorRef = useRef(null);
  const quillInstanceRef = useRef(null);

  // Inisialisasi Quill hanya sekali saat komponen dimuat
  useEffect(() => {
    if (quillEditorRef.current && !quillInstanceRef.current) {
      const quill = new Quill(quillEditorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [["bold", "italic", "underline"], ["link"]],
        },
        placeholder: "Tulis deskripsi KKN di sini...",
      });
      quillInstanceRef.current = quill;
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ambil konten deskripsi langsung dari instance Quill
    const deskripsi = quillInstanceRef.current.root.innerHTML;
    const finalForm = { ...form, deskripsi };

    if (editIndex !== null) {
      setData((prev) =>
        prev.map((item, idx) => (idx === editIndex ? finalForm : item))
      );
      setEditIndex(null);
    } else {
      setData((prev) => [...prev, { ...finalForm, id: Date.now() }]);
    }

    // Reset form dan editor Quill
    setForm(initialForm);
    quillInstanceRef.current.setText("");
  };

  const handleEdit = (idx) => {
    const itemToEdit = data[idx];
    setForm(itemToEdit);
    setEditIndex(idx);
    // Masukkan konten deskripsi ke dalam editor Quill
    quillInstanceRef.current.root.innerHTML = itemToEdit.deskripsi;
  };

  const handleDelete = (idx) => {
    if (window.confirm("Hapus data ini?")) {
      setData((prev) => prev.filter((_, i) => i !== idx));
      if (editIndex === idx) {
        setForm(initialForm);
        setEditIndex(null);
        quillInstanceRef.current.setText("");
      }
    }
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditIndex(null);
    quillInstanceRef.current.setText("");
  };

  return (
    <div>
      <h2>Kelola Informasi KKN UNIM</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#f5f5f5",
          padding: 16,
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <div style={{ marginBottom: 12 }}>
          <label>
            Judul:
            <br />
            <input
              type="text"
              name="judul"
              value={form.judul}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            Nama Dosen:
            <br />
            <input
              type="text"
              name="namaDosen"
              value={form.namaDosen}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
              required
            />
          </label>
        </div>

        {/* Editor Quill untuk Deskripsi */}
        <div style={{ marginBottom: 12 }}>
          <label>
            Deskripsi:
            <br />
          </label>
          <div
            ref={quillEditorRef}
            style={{ background: "#fff", minHeight: "150px" }}
          ></div>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Tanggal:
            <br />
            <input
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            Link (URL):
            <br />
            <input
              type="url"
              name="link"
              value={form.link}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
              placeholder="https://contoh-link.com"
              required
            />
          </label>
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
          {editIndex !== null ? "Simpan Perubahan" : "Tambah Informasi"}
        </button>
        {editIndex !== null && (
          <button
            type="button"
            onClick={handleCancel}
            style={{
              marginLeft: 12,
              background: "#e53935",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              padding: "8px 20px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Batal
          </button>
        )}
      </form>
      <div>
        <h3>Daftar Informasi KKN UNIM</h3>
        {data.length === 0 ? (
          <div style={{ color: "#888" }}>Belum ada data.</div>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
            }}
          >
            <thead>
              <tr style={{ background: "#f0f0f0" }}>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Judul</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>
                  Nama Dosen
                </th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>
                  Deskripsi
                </th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>
                  Tanggal
                </th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Link</th>
                <th style={{ border: "1px solid #ddd", padding: 8 }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {item.judul}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {item.namaDosen}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {/* Tampilkan deskripsi sebagai HTML */}
                    <div dangerouslySetInnerHTML={{ __html: item.deskripsi }} />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {item.tanggal}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat
                    </a>
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    <button
                      onClick={() => handleEdit(idx)}
                      style={{
                        marginRight: 8,
                        background: "#ffb300",
                        color: "#222d32",
                        border: "none",
                        borderRadius: 4,
                        padding: "4px 12px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(idx)}
                      style={{
                        background: "#e53935",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "4px 12px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CrudInformasiKKN;
