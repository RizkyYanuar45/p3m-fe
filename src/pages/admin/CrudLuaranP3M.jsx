import { useState, useEffect } from "react";

const initialForm = { title: "", link: "" };
const api = import.meta.env.VITE_API_URL;

// Helper function untuk mengubah URL YouTube menjadi URL embed
const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";
  let videoId = "";
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.slice(1);
    } else if (
      urlObj.hostname === "www.youtube.com" ||
      urlObj.hostname === "youtube.com"
    ) {
      videoId = urlObj.searchParams.get("v");
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url; // Kembalikan URL asli jika ID tidak ditemukan
  } catch (error) {
    return url; // Kembalikan URL asli jika format tidak valid
  }
};

const CrudLuaranP3M = () => {
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${api}/youtube/`);
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server.");
        }
        const data = await response.json();
        setYoutubeLinks(data);
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

    // Ubah link menjadi format embed sebelum mengirim ke backend
    const embedUrl = getYouTubeEmbedUrl(form.link);
    const dataToSend = { title: form.title, link: embedUrl };

    const isEditMode = !!editId;
    const url = isEditMode
      ? `${api}/youtube/update/${editId}`
      : `${api}/youtube/add`;
    const method = isEditMode ? "PATCH" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
        credentials: "include",
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Gagal menyimpan data.");
      }

      if (isEditMode) {
        setYoutubeLinks((prev) =>
          prev.map((item) => (item.id === editId ? responseData : item))
        );
        setEditId(null);
      } else {
        setYoutubeLinks((prev) => [...prev, responseData]);
      }
      setForm(initialForm);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      link: item.link,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      // ... (logika hapus tidak berubah)
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setForm(initialForm);
  };

  return (
    <div>
      <h3>Kelola Link YouTube</h3>
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
          name="title"
          placeholder="Judul Video"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="link"
          type="url"
          placeholder="Paste URL Video YouTube (misal: https://www.youtube.com/watch?v=...)"
          value={form.link}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editId ? "Simpan Perubahan" : "Tambah Link"}
        </button>
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
              <th>Judul Video</th>
              <th>Preview Video</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {youtubeLinks.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.title}</td>
                <td>
                  {/* Tampilkan video dalam iframe */}
                  <iframe
                    width="280"
                    height="157"
                    src={item.link} // Gunakan link embed dari database
                    title={item.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
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
    </div>
  );
};

export default CrudLuaranP3M;
