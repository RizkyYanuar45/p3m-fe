import { useState, useEffect } from "react";

const api = import.meta.env.VITE_API_URL;
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const CrudPimpinanLembaga = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [altText, setAltText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GET: Mengambil data dengan fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${api}/profile/type?type=pimpinan_lembaga`
        );
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server.");
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [api]);

  // POST: Mengunggah file baru dengan fetch
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Silakan pilih file untuk diunggah.");
      return;
    }
    setError("");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("alt", altText || "Struktur Pimpinan Lembaga");
    formData.append("type", "pimpinan_lembaga");

    try {
      const response = await fetch(`${api}/profile/add`, {
        method: "POST",
        body: formData,
        credentials: "include", // Untuk mengirim cookie otentikasi
      });

      const newData = await response.json();
      if (!response.ok) {
        throw new Error(newData.message || "Gagal mengunggah file.");
      }

      setImages((prev) => [...prev, newData]);
      setFile(null);
      setAltText("");
      e.target.reset();
    } catch (err) {
      setError(err.message);
    }
  };

  // DELETE: Menghapus file dengan fetch
  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus gambar ini?")) {
      setError("");
      try {
        const response = await fetch(`${api}/profile/delete/${id}`, {
          method: "DELETE",
          credentials: "include", // Untuk mengirim cookie otentikasi
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal menghapus gambar.");
        }

        setImages(images.filter((img) => img.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div>
      <h3>Struktur Organisasi - Upload Foto</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form
        onSubmit={handleUpload}
        style={{
          marginBottom: 16,
          background: "#f9f9f9",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <input
          type="text"
          placeholder="Teks Alternatif (Alt Text)"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          style={{ marginLeft: 8, marginRight: 8 }}
        />
        <button type="submit">Upload</button>
      </form>

      {loading ? (
        <p>Memuat gambar...</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {images.map((img) => (
            <div
              key={img.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 8,
                textAlign: "center",
              }}
            >
              <img
                src={`${backendUrl}/${img.image}`}
                alt={img.alt}
                style={{
                  maxWidth: 180,
                  maxHeight: 180,
                  display: "block",
                  marginBottom: 8,
                }}
              />
              <div style={{ fontSize: 14, wordBreak: "break-word" }}>
                {img.alt}
              </div>
              <button
                onClick={() => handleDelete(img.id)}
                style={{
                  marginTop: 8,
                  background: "#e53935",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "4px 12px",
                  cursor: "pointer",
                }}
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CrudPimpinanLembaga;
