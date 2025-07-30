import { useState, useEffect, useRef } from "react";
import Quill from "quill"; // Impor Quill dari library
import "quill/dist/quill.snow.css"; // Impor tema CSS

const CrudInformasiPenelitian = () => {
  const [data, setData] = useState([
    {
      id: 1,
      judul: "Penelitian A",
      deskripsi: "<p>Deskripsi penelitian <strong>A</strong></p>",
    },
    {
      id: 2,
      judul: "Penelitian B",
      deskripsi: "<p>Deskripsi penelitian <em>B</em></p>",
    },
  ]);

  const [form, setForm] = useState({ judul: "" });
  const [editId, setEditId] = useState(null);

  // Ref untuk menampung elemen div yang akan menjadi editor Quill
  const quillEditorRef = useRef(null);
  // Ref untuk menyimpan instance Quill agar tidak hilang saat re-render
  const quillInstanceRef = useRef(null);

  // useEffect untuk menginisialisasi Quill saat komponen pertama kali render
  useEffect(() => {
    if (quillEditorRef.current && !quillInstanceRef.current) {
      const quill = new Quill(quillEditorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
          ],
        },
        placeholder: "Tulis deskripsi di sini...",
      });

      // Simpan instance Quill ke dalam ref
      quillInstanceRef.current = quill;
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ambil konten HTML terbaru dari editor Quill
    const deskripsi = quillInstanceRef.current.root.innerHTML;
    const finalForm = { ...form, deskripsi };

    if (editId) {
      setData(
        data.map((item) =>
          item.id === editId ? { ...item, ...finalForm } : item
        )
      );
      setEditId(null);
    } else {
      setData([...data, { id: Date.now(), ...finalForm }]);
    }

    // Reset form dan editor Quill
    setForm({ judul: "" });
    if (quillInstanceRef.current) {
      quillInstanceRef.current.setText(""); // Kosongkan editor
    }
  };

  const handleEdit = (item) => {
    setForm({ judul: item.judul });
    if (quillInstanceRef.current) {
      // Set konten editor Quill dengan data yang akan diedit
      quillInstanceRef.current.root.innerHTML = item.deskripsi;
    }
    setEditId(item.id);
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ judul: "" });
    if (quillInstanceRef.current) {
      quillInstanceRef.current.setText("");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setData(data.filter((item) => item.id !== id));
      if (editId === id) {
        handleCancelEdit();
      }
    }
  };

  return (
    <div>
      <h2>Informasi Penelitian</h2>
      <form
        onSubmit={handleSubmit}
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
            value={form.judul}
            onChange={handleChange}
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
          {/* Elemen div ini akan menjadi container untuk editor Quill */}
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
          {editId ? "Update" : "Tambah"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={handleCancelEdit}
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
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
        }}
      >
        <thead>
          <tr style={{ background: "#1976d2", color: "#fff" }}>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Judul</th>
            <th style={{ padding: 8, border: "1px solid #ddd" }}>Deskripsi</th>
            <th style={{ padding: 8, border: "1_px solid #ddd" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>
                {item.judul}
              </td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>
                <div dangerouslySetInnerHTML={{ __html: item.deskripsi }} />
              </td>
              <td style={{ padding: 8, border: "1px solid #ddd" }}>
                <button
                  onClick={() => handleEdit(item)}
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
                  onClick={() => handleDelete(item.id)}
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
    </div>
  );
};

export default CrudInformasiPenelitian;
