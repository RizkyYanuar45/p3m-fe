import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const initialForm = { file_name: "", file_description: "", file_url: "" };
const api = import.meta.env.VITE_API_URL;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CrudProgramPanduan = () => {
  const [panduanPenelitian, setPanduanPenelitian] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [dataArtikel, setDataArtikel] = useState([]);
  const [formArtikel, setFormArtikel] = useState({ title: "", author: "" });
  const [thumbnailArtikel, setThumbnailArtikel] = useState(null);
  const [editIdArtikel, setEditIdArtikel] = useState(null);

  const [loadingArtikel, setLoadingArtikel] = useState(true);
  const [errorArtikel, setErrorArtikel] = useState("");

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
    const fetchDataArtikel = async () => {
      setLoadingArtikel(true);
      setErrorArtikel("");
      try {
        const response = await fetch(
          `${api}/article/type/informasi_pengabdian_masyarakat_mandiri`
        );
        if (!response.ok)
          throw new Error("Gagal mengambil dataArtikel artikel.");
        const result = await response.json();
        setDataArtikel(result);
      } catch (err) {
        setErrorArtikel(err.message);
      } finally {
        setLoadingArtikel(false);
      }
    };
    fetchDataArtikel();
  }, [api]);

  const handleChangeArticle = (e) => {
    setFormArtikel({ ...formArtikel, [e.target.name]: e.target.value });
  };

  const handleFileChangeArticle = (e) => {
    setThumbnailArtikel(e.target.files[0]);
  };

  const handleSubmitArticle = async (e) => {
    e.preventDefault();
    setErrorArtikel("");

    const content = quillInstanceRef.current.root.innerHTML;
    if (content === "<p><br></p>") {
      setErrorArtikel("Konten tidak boleh kosong.");
      return;
    }

    const formData = new FormData();
    formData.append("title", formArtikel.title);
    formData.append("content", content);
    formData.append("author", formArtikel.author);

    // Hanya kirim thumbnail jika ada file baru yang dipilih
    if (thumbnailArtikel) {
      formData.append("thumbnail", thumbnailArtikel);
    }

    // Kategori tetap ditambahkan saat 'add', tapi tidak perlu saat 'update'
    if (!editIdArtikel) {
      formData.append("category", "informasi_pengabdian_masyarakat_mandiri");
    }

    try {
      let response;
      if (editIdArtikel) {
        // --- LOGIKA UPDATE (PATCH) ---
        response = await fetch(`${api}/article/update/${editIdArtikel}`, {
          method: "PATCH",
          body: formData,
          credentials: "include",
        });
        const updatedData = await response.json();
        if (!response.ok) {
          throw new Error(updatedData.message || "Gagal memperbarui artikel.");
        }
        setDataArtikel((prev) =>
          prev.map((item) => (item.id === editIdArtikel ? updatedData : item))
        );
        setEditIdArtikel(null);
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
        setDataArtikel((prev) => [...prev, newData]);
      }

      // Reset formArtikel
      setFormArtikel({ title: "", author: "" });
      setThumbnailArtikel(null);
      quillInstanceRef.current.setText("");
      if (e.target.thumbnailArtikel) e.target.thumbnailArtikel.value = null;
    } catch (err) {
      setErrorArtikel(err.message);
    }
  };

  const handleEditArticle = (item) => {
    setEditIdArtikel(item.id);
    setFormArtikel({ title: item.title, author: item.author });
    quillInstanceRef.current.root.innerHTML = item.content;
    setThumbnailArtikel(null); // Kosongkan state file
    document.querySelector('input[type="file"]').value = ""; // Reset input file di DOM
  };

  const handleDeleteArticle = async (id) => {
    if (window.confirm("Yakin ingin menghapus artikel ini?")) {
      setErrorArtikel("");
      try {
        const response = await fetch(`${api}/article/delete/${id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal menghapus artikel.");
        }
        setDataArtikel(dataArtikel.filter((item) => item.id !== id));
      } catch (err) {
        setErrorArtikel(err.message);
      }
    }
  };

  const handleCancelEditArticle = () => {
    setEditIdArtikel(null);
    setFormArtikel({ title: "", author: "" });
    setThumbnailArtikel(null);
    quillInstanceRef.current.setText("");
    document.querySelector('input[type="file"]').value = "";
  };

  // GET: Mengambil data dengan fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${api}/files/type?type=dokumen_pengabdian_masyarakat_mandiri`
        );
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server.");
        }
        const data = await response.json();
        setPanduanPenelitian(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (editId) {
      // Logika UPDATE (PATCH) dengan fetch
      try {
        const response = await fetch(`${api}/files/update/${editId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
          credentials: "include",
        });
        const updatedData = await response.json();
        if (!response.ok) {
          throw new Error(updatedData.message || "Gagal memperbarui data.");
        }
        setPanduanPenelitian((prev) =>
          prev.map((item) => (item.id === editId ? updatedData : item))
        );
        setEditId(null);
        setForm(initialForm);
      } catch (err) {
        setError(err.message);
      }
    } else {
      // Logika TAMBAH (POST) dengan fetch
      const dataToSend = {
        ...form,
        file_type: "dokumen_pengabdian_masyarakat_mandiri",
      };
      try {
        const response = await fetch(`${api}/files/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
          credentials: "include",
        });
        const newData = await response.json();
        if (!response.ok) {
          throw new Error(newData.message || "Gagal menambahkan data.");
        }
        setPanduanPenelitian((prev) => [...prev, newData]);
        setForm(initialForm);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      file_name: item.file_name,
      file_description: item.file_description,
      file_url: item.file_url,
    });
  };

  // --- FUNGSI DELETE YANG DIPERBARUI ---
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      setError("");
      try {
        const response = await fetch(`${api}/files/delete/${id}`, {
          method: "DELETE",
          credentials: "include", // Kirim cookie untuk otentikasi
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal menghapus data.");
        }

        // Jika berhasil, hapus data dari state lokal agar UI terupdate
        setPanduanPenelitian((prev) => prev.filter((item) => item.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };
  // ------------------------------------

  const handleCancel = () => {
    setEditId(null);
    setForm(initialForm);
  };

  return (
    <div>
      <h3>Data Panduan Pengabdian Masyarakat</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: 16,
          background: "#f9f9f9",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <input
          name="file_name"
          placeholder="Judul"
          value={form.file_name}
          onChange={handleChange}
          required
        />
        <input
          name="file_description"
          placeholder="Deskripsi"
          value={form.file_description}
          onChange={handleChange}
          required
        />
        <input
          name="file_url"
          type="url"
          placeholder="URL File (Google Drive)"
          value={form.file_url}
          onChange={handleChange}
          required
        />

        <button type="submit">{editId ? "Simpan Perubahan" : "Tambah"}</button>
        {editId && (
          <button type="button" onClick={handleCancel}>
            Batal
          </button>
        )}
      </form>

      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Judul</th>
              <th>Deskripsi</th>
              <th>URL</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {panduanPenelitian.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.file_name}</td>
                <td>{item.file_description}</td>
                <td>
                  <a
                    href={item.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                </td>
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                  <button onClick={() => handleDelete(item.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <hr className=" mt-5" />
      <h2 className=" mt-5">Informasi Penelitian</h2>
      {errorArtikel && <p style={{ color: "red" }}>{errorArtikel}</p>}
      <form
        onSubmit={handleSubmitArticle}
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
            value={formArtikel.title}
            onChange={handleChangeArticle}
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
            value={formArtikel.author}
            onChange={handleChangeArticle}
            required
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Thumbnail (Gambar):</label>
          <br />
          <small>
            {editIdArtikel ? "Pilih file baru untuk mengganti thumbnail." : ""}
          </small>
          <br />
          <input
            type="file"
            name="thumbnail"
            onChange={handleFileChangeArticle}
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
          {editIdArtikel ? "Update Artikel" : "Tambah Artikel"}
        </button>
        {editIdArtikel && (
          <button type="button" onClick={handleCancelEditArticle}>
            Batal
          </button>
        )}
      </form>

      <h3>Daftar Artikel Penelitian</h3>
      {loadingArtikel ? (
        <p>Memuat dataArtikel...</p>
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
            {dataArtikel.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>
                  <img
                    src={`${backendUrl}/${item.thumbnail}`}
                    alt={item.title}
                    width="100"
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <button onClick={() => handleEditArticle(item)}>Edit</button>
                  <button onClick={() => handleDeleteArticle(item.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CrudProgramPanduan;
