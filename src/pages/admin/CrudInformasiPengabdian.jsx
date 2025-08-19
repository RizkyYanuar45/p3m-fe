import { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const api = import.meta.env.VITE_API_URL;
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const CrudInformasiPengabdian = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ title: "", author: "" });
  const [thumbnail, setThumbnail] = useState(null);
  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const quillEditorRef = useRef(null);
  const quillInstanceRef = useRef(null);

  useEffect(() => {
    if (quillEditorRef.current && !quillInstanceRef.current) {
      const quill = new Quill(quillEditorRef.current, {
        theme: "snow",
        placeholder: "Tulis konten artikel di sini...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            ["link", "image"],
          ],
        },
      });
      quillInstanceRef.current = quill;
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${api}/article/type/informasi_pengabdian_masyarakat`
        );
        if (!response.ok) throw new Error("Gagal mengambil data artikel.");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [api]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const content = quillInstanceRef.current.root.innerHTML;
    if (content === "<p><br></p>") {
      setError("Konten tidak boleh kosong.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", content);
    formData.append("author", form.author);

    // Hanya kirim thumbnail jika ada file baru yang dipilih
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    // Kategori tetap ditambahkan saat 'add', tapi tidak perlu saat 'update'
    if (!editId) {
      formData.append("category", "informasi_pengabdian_masyarakat");
    }

    try {
      let response;
      if (editId) {
        // --- LOGIKA UPDATE (PATCH) ---
        response = await fetch(`${api}/article/update/${editId}`, {
          method: "PATCH",
          body: formData,
          credentials: "include",
        });
        const updatedData = await response.json();
        if (!response.ok) {
          throw new Error(updatedData.message || "Gagal memperbarui artikel.");
        }
        setData((prev) =>
          prev.map((item) => (item.id === editId ? updatedData : item))
        );
        setEditId(null);
      } else {
        // --- LOGIKA TAMBAH (POST) ---
        response = await fetch(`${api}/article/add`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        const newData = await response.json();
        if (!response.ok) {
          throw new Error(newData.message || "Gagal menambahkan artikel.");
        }
        setData((prev) => [...prev, newData]);
      }

      // Reset form
      setForm({ title: "", author: "" });
      setThumbnail(null);
      quillInstanceRef.current.setText("");
      if (e.target.thumbnail) e.target.thumbnail.value = null;
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({ title: item.title, author: item.author });
    quillInstanceRef.current.root.innerHTML = item.content;
    setThumbnail(null); // Kosongkan state file
    document.querySelector('input[type="file"]').value = ""; // Reset input file di DOM
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus artikel ini?")) {
      setError("");
      try {
        const response = await fetch(`${api}/article/delete/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal menghapus artikel.");
        }
        setData(data.filter((item) => item.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setForm({ title: "", author: "" });
    setThumbnail(null);
    quillInstanceRef.current.setText("");
    document.querySelector('input[type="file"]').value = "";
  };

  return (
    <div>
      <h2>Informasi Pengabdian</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
          <label>Judul:</label>
          <br />
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Author:</label>
          <br />
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Thumbnail (Gambar):</label>
          <br />
          <small>
            {editId ? "Pilih file baru untuk mengganti thumbnail." : ""}
          </small>
          <br />
          <input
            type="file"
            name="thumbnail"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Konten:</label>
          <div
            ref={quillEditorRef}
            style={{ background: "#fff", minHeight: "200px" }}
          ></div>
        </div>
        <button type="submit">
          {editId ? "Update Artikel" : "Tambah Artikel"}
        </button>
        {editId && (
          <button type="button" onClick={handleCancelEdit}>
            Batal
          </button>
        )}
      </form>

      <h3>Daftar Artikel Penelitian</h3>
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Thumbnail</th>
              <th>Judul</th>
              <th>Author</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={`${backendUrl}${item.thumbnail}`}
                    alt={item.title}
                    width="100"
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CrudInformasiPengabdian;
